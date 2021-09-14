import { Request, Response } from 'express';
import sql from '../../database'

class PlantaController{

    public async selectAll(req:Request, res:Response){
        const plantas = await sql.query("select * from planta");
        res.json(plantas.recordset)
    }
}
const plantaController = new PlantaController();
export default plantaController;