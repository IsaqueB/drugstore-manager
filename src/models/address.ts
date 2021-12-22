import { conn } from "../database/index";

async function create(street: string, number: number, zipcode: string){
    const query = `
        INSERT INTO 
        address 
        (street, number, zipcode) 
        VALUES
        ('${street}', ${number}, '${zipcode}')
    ;`
    return conn.query(query);
}

export {
    create
}