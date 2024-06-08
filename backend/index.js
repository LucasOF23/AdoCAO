import express from "express";
import apirouter from "./routes/api.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apirouter);

const port = 3001;
app.listen(port, function () {
  console.log("Serviço executanto na porta " + port);
});
