import express from "express";
import * as Pharmacy from "../models/pharmacy";

async function create(req: express.Request, res: express.Response):Promise<Object>{
    try{
        const {logo, name, cnpj, address, working_hour, responsable, phone, other} = req.body;
        if(!logo || !name || !cnpj || !address || !working_hour || !responsable || !phone || !other){
            throw new Error("MISSING");
        }
        const result = await Pharmacy.create(logo, name, cnpj, address, working_hour, responsable, phone, other);
        return res.status(400).json(result);
    }
    catch(e: any){
        return res.status(400).json(e.message);
    }
}

export {
    create
}