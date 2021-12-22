import pool from "../database/index";
import * as Address from "./address";
import * as Phone from "./phone";
import * as WorkingHour from "./working_hour";

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
    const address_id = await Address.create(street, number, zipcode);
    const {ddd, number: phone_number} = phone;
    const phone_id = await Phone.create(ddd, phone_number);
    const {open_time, close_time} = working_hour;
    const working_hour_id = await WorkingHour.create(open_time, close_time);
    console.log(address_id)
    console.log(phone_id)
    console.log(working_hour_id)
    return new Promise(resolve => resolve("Oi"));
    const query = `
        INSERT INTO 
        pharmacy 
        (logo, name, cnpj, address_id, working_hour_id, responsable, phone_id, other) 
        VALUES
        (${[logo, name, cnpj, address, working_hour, responsable, phone, other].map(entry => "'"+entry+"'").join(",")})
    ;`
    return pool.query(query);
}

export {
    create
}