import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const secret = process.env["AUTHSECRET"];

function getToken(uid) {
    return jwt.sign({ sub: uid }, secret, { expiresIn: "7d", });
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

    User.create({
		name: request.body.name,
        email: request.body.email,
        passwordHash: hashedPassword,
    }).then((result) => {
        const token = getToken(
            result.dataValues.id
        );
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
        return response.status(400).send("Usuário não cadastrado.");
    }

    const isEqual = bcrypt.compareSync(request.body.password, user.passwordHash);
    if (!isEqual) {
        return response.status(401).send("Usuário e senha inválidos!");
    }

    const token = getToken(user.id);
    response.status(200).json({ token: token });
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization;
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length);
            const decodedToken = jwt.verify(token, secret);
            next();
        } else {
            return response.status(401).send({ message: "Unauthorized" });
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" });
    }
}

function findAll(request, response) {
    User.findAll()
        .then(function (res) {
            response.json(res).status(200);
        })
        .catch(function (err) {
            response.json(err).status(500);
        });
}

export default { register, login, validateToken, findAll };
