require('dotenv').config();

const oracledb = require('oracledb');
oracledb.autoCommit = true;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

module.exports = runQuery = async (query, params) => {
    
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING,
        })

        const result = await connection.execute(query, params);

        return result;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}