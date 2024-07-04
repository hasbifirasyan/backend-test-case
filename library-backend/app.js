if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./routes");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swaggerDefinition');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
router.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
