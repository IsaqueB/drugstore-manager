import express from "express";
import Pharmacy from "./pharmacy";

const routes = express.Router();

routes.use("/pharmacy", Pharmacy)

export default routes;