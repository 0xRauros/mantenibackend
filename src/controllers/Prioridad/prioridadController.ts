import { Request, Response } from 'express';
import sql from '../../database';


class PrioridadController{

    public async selectPrioridad(req:Request, res:Response){
        const prioridad = await sql.query(`SELECT * FROM Prioridad`);
        res.status(200).json(prioridad.recordset);
    }

}
const prioridadController = new PrioridadController();
export default prioridadController;