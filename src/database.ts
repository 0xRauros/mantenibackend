const sql = require('mssql');

sql.connect('mssql://ruben:Windows2018@10.73.80.4/Mantenimiento?encrypt=true');
console.log('DB is connected');

export default sql;