// models/BaseModel.js
class BaseModel {
    constructor(tableName) {
      this.tableName = tableName;
    }
  
    findAll() {
      const sql = `SELECT * FROM ${this.tableName}`;
      return new Promise((resolve, reject) => {
        getConnection().query(sql, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    }
  
    findById(id) {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      return new Promise((resolve, reject) => {
        getConnection().query(sql, [id], (err, result) => {
          if (err) return reject(err);
          resolve(result[0]);
        });
      });
    }
  
    delete(id) {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
      return new Promise((resolve, reject) => {
        getConnection().query(sql, [id], (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    }
  }
  
  module.exports = BaseModel;
  






  