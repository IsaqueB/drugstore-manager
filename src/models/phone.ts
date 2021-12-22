import pool from "../database/index";

async function create(ddd: number, number: number){
    const query = `
        INSERT INTO 
        phone 
        (ddd, number) 
        VALUES
        (${ddd}, ${number}')
    ;`
    return pool.query(query);
}

export {
    create
}