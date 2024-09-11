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

            // Handle connection errors
            this.connection.on('error', (err) => {
                console.error('Database error: ', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.log('Reconnecting to the database...');
                    this.connection = mysql.createConnection(this.connection.config);
                    this.connection.connect();
                } else {
                    throw err;
                }
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
