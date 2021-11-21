const express = require("express");
const Router = express.Router();
const {
  serviceHome,
  topService,
  servicePerUser,
  serviceCategoryPerUser,
} = require("../controllers/service_home_controller");

Router.get("/service/bycategory", serviceHome);
Router.get("/topService", topService);
Router.get("/service/servicePerUser", servicePerUser);
Router.get("/service/serviceCategoryPerUser", serviceCategoryPerUser);

module.exports = Router;
