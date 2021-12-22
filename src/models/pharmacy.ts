// import { PoolConnection } from "mariadb";
// import {getConnection} from "../database/index";
import { conn } from "../database/index";
import * as Address from "./address";
import * as Phone from "./phone";
import * as WorkingHour from "./working_hour";

// let conn: PoolConnection;
// getConnection().then(result => {conn = result})

interface Address_Interface {
    street: string, 
    number: number, 
    zipcode: string
}
interface Phone_Interface{
    ddd: number, 
    number: number
}
interface WorkingHour_Interface{
    open_time: Date, 
    close_time: Date
}

async function create(logo: string, name: string, cnpj: string, address: Address_Interface, working_hour: WorkingHour_Interface, responsable: string, phone: Phone_Interface, other: string){
    const {street, number, zipcode} = address;
    if(!street || !number || !zipcode){
        throw new Error("MISSING");
    }
    const {insertId: address_id} = await Address.create(street, number, zipcode);
    const {ddd, number: phone_number} = phone;
    if(!ddd || !phone_number){
        throw new Error("MISSING");
    }
    const {insertId: phone_id} = await Phone.create(ddd, phone_number);
    const {open_time, close_time} = working_hour;
    if(!open_time || !close_time){
        throw new Error("MISSING");
    }
    const {insertId: working_hour_id} = await WorkingHour.create(open_time, close_time);
    
    const query = `
        INSERT INTO 
        pharmacy 
        (logo, name, cnpj, address_id, working_hour_id, responsable, phone_id, other) 
        VALUES
        ('${logo}', '${name}', '${cnpj}', ${address_id}, ${working_hour_id}, '${responsable}', ${phone_id}, '${other}')
;`
    return conn.query(query);
}

export {
    create
}