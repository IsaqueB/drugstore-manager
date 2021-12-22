import express from "express";

import * as Pharmacy from "../controllers/pharmacy";

const routes = express.Router();

routes.post("/", Pharmacy.create);

export default routes;