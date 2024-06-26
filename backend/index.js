import express from "express";
import apirouter from "./routes/api.routes.js";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDocument = yaml.load('./openapi.yaml');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apirouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 8080;
app.listen(port, function () {
  console.log("Serviço executanto na porta " + port);
});
