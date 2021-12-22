import { createPool, PoolConnection } from "mariadb";

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PWD,
    database: process.env.DB_DB
})

pool.getConnection()
    .then(async conn => {
        console.log("Connected successfully");
        await setupDatabase(conn);
        return conn
    })
    .catch(err => {
        console.log(`Connected failed with: ${err.message}`)
    })
    .then(conn => {
        if(conn){
            console.log("Connected released")
            conn.release();
        }
    })

export default pool;

function setupDatabase(conn: PoolConnection){
    return new Promise(async (resolve, reject) => {
        try{
            const dev = true;
            if(dev){
                await conn.query("DROP DATABASE IF EXISTS ms_pharmacy")
            }
            //Create database
            await conn.query("CREATE DATABASE IF NOT EXISTS ms_pharmacy");
            await conn.query("USE ms_pharmacy");
            //Create Address Table
            await conn.query(`CREATE TABLE IF NOT EXISTS address (
                id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                street CHAR(40) NOT NULL, 
                number INT NOT NULL, 
                zipcode CHAR(7) NOT NULL
                );`);
            //Create Working Hour Table
            await conn.query(`CREATE TABLE IF NOT EXISTS working_hour (
                id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                open_time DATE NOT NULL,
                close_time DATE NOT NULL
                );`);
            await conn.query(`CREATE TABLE IF NOT EXISTS phone (
                id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                ddd TINYINT NOT NULL,
                number TINYINT NOT NULL
                );`);
            //Create Pharmacy Table
            await conn.query(`CREATE TABLE IF NOT EXISTS pharmacy (
                id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                logo MEDIUMBLOB NOT NULL, 
                name CHAR(20) NOT NULL, 
                cnpj CHAR(14) NOT NULL, 
                address_id SMALLINT UNSIGNED NOT NULL, 
                working_hour_id SMALLINT UNSIGNED NOT NULL, 
                responsable CHAR(100) NOT NULL, 
                phone_id SMALLINT UNSIGNED NOT NULL, 
                other CHAR(100),
                CONSTRAINT fk_address
                    FOREIGN KEY (address_id) 
                    REFERENCES address(id)
                    ON DELETE CASCADE ON UPDATE RESTRICT,
                CONSTRAINT fk_working_hour
                    FOREIGN KEY (working_hour_id) 
                    REFERENCES working_hour(id)
                    ON DELETE CASCADE ON UPDATE RESTRICT,
                CONSTRAINT fk_phone
                    FOREIGN KEY (phone_id) 
                    REFERENCES phone(id)
                    ON DELETE CASCADE ON UPDATE RESTRICT
                );`);
            resolve(null);
        }
        catch(err){
            reject(err);
        }
    })
}