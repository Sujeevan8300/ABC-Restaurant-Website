const mysql = require('mysql');

class DBConnection {
    constructor() {
        if (!DBConnection.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'the_abc_restaurant'
            });
            this.connection.connect(err => {
                if (err) {
                    console.error('Database connection error: ', err);
                    throw err;
                }
                console.log('Database connected successfully');
            });
            DBConnection.instance = this;
        }
        return DBConnection.instance;
    }

    getConnection() {
        return this.connection;
    }
}

const instance = new DBConnection();
Object.freeze(instance);

module.exports = instance;







