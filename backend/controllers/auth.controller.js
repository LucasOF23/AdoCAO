import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import ContactInfo from "../models/contactinfo.model.js"
import UserWorksAtONG from "../models/userworksatong.js"

const secret = process.env["AUTHSECRET"];

function getToken(uid, isSuperAdmin = false, isOngManager = false, isOngWorker = false) {
    const payload = {
        sub: uid,
        isSuperAdmin,
        isOngManager,
        isOngWorker
    };
    const token = jwt.sign(payload, secret, { expiresIn: "7d", });
    return { token, payload };
}

async function register(request, response) {
    if (!request.body.password || !request.body.email || !request.body.name) {
        return response.status(400).send("Email, nome ou senha não especificados.");
    }

    let user = await User.findOne({ where: { email: request.body.email } });
    if (user) {
        return response.status(400).send("Email já cadastrado.");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(request.body.password, salt);

    const emptyContactInfo = await ContactInfo.create();
    if (emptyContactInfo === null) {
        return response.status(500).send('Erro inesperado.');
    }

    User.create({
        name: request.body.name,
        email: request.body.email,
        passwordHash: hashedPassword,
        ContactInfoId: emptyContactInfo.id
    }).then((result) => {
        const token = getToken(result.dataValues.id);
        response.status(201).send({ token: token });
    }).catch((erro) => {
        console.log(erro);
        response.status(500).send(erro);
    });
}

async function login(request, response) {
    if (!request.body.password || !request.body.email) {
        return response.status(400).send("Email ou senha não especificados.");
    }

    const user = await User.findOne({
        where: { email: request.body.email },
    });
    if (!user) {
        return response.status(404).send("Usuário não cadastrado.");
    }

    const isEqual = bcrypt.compareSync(request.body.password, user.passwordHash);
    if (!isEqual) {
        return response.status(401).send("Usuário e senha inválidos!");
    }

    const anyManagedOng = await UserWorksAtONG.findOne({ where: { UserId: user.id, isManager: true } });
    const anyWorkOng = anyManagedOng || await UserWorksAtONG.findOne({ where: { UserId: user.id } });

    const token = getToken(user.id, user.isSuperAdmin, anyManagedOng !== null, anyWorkOng !== null);
    response.status(200).json({ token: token });
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization;
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length);
            const decodedToken = jwt.verify(token, secret);

            response.locals.userId = decodedToken.sub;
            response.locals.isSuperAdmin = decodedToken.isSuperAdmin;
            response.locals.isOngManager = decodedToken.isOngManager;
            response.locals.isOngWorker = decodedToken.isOngWorker;
            next();
        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" });
    }
}

// ==================
// === NEEDS AUTH ===
// ==================

async function changePassword(request, response) {
    if (!request.body.oldPassword || !request.body.newPassword) {
        return response.status(400).send('Senha nova ou antiga não especificada.');
    }

    const user = await User.findByPk(response.locals.userId);
    if (!user) {
        return response.status(500).send('Usuário não encontrado.');
    }

    const isEqual = bcrypt.compareSync(request.body.oldPassword, user.passwordHash);
    if (!isEqual) {
        return response.status(401).send("Senha antiga inválida.");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(request.body.newPassword, salt);

    User.update(
        { passwordHash: hashedPassword },
        { where: { id: user.id } }
    ).then(function (res) {
        response.status(200).send();
    }).catch(function (res) {
        response.status(500).json(err);
    })
}

const authController = { register, login, validateToken, changePassword };
export default authController;
