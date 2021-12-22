// import { PoolConnection } from "mariadb";
// import {getConnection} from "../database/index";

// let conn: PoolConnection;
// getConnection().then(result => {conn = result})
import { conn } from "../database"

async function create(open_time: Date, close_time: Date){
    const query = `
        INSERT INTO 
        working_hour 
        (open_time, close_time) 
        VALUES
        ('${open_time}', '${close_time}')
    ;`
    return conn.query(query);
}

export {
    create
}