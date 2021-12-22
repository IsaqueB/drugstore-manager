// import { PoolConnection } from "mariadb";
// import {getConnection} from "../database/index";

// let conn: PoolConnection;
// getConnection().then(result => {conn = result})
import { conn } from "../database"

async function create(ddd: number, number: number){
    const query = `
        INSERT INTO 
        phone 
        (ddd, number) 
        VALUES
        (${ddd}, ${number})
    ;`
    return conn.query(query);
}

export {
    create
}