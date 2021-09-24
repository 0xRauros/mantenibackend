const db = require('mssql')
try{
  db.connect('mssql://ruben:Windows2018@10.73.80.4/DATOS7QB_ISRI_SPAIN?encrypt=true')
  console.log('DB2 is connected');
}catch(err){
    console.log(err)
}
export default db;