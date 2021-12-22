import pool from "../database/index";

async function create(open_time: Date, close_time: Date){
    const query = `
        INSERT INTO 
        working_hour 
        (open_time, close_time) 
        VALUES
        (${open_time}, ${close_time}')
    ;`
    return pool.query(query);
}

export {
    create
}