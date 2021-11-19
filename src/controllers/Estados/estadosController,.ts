import { Request, Response } from 'express';
import sql from '../../database';


class EstadosController{

    /** Obtener todos los estados de la tabla  */
    public async selectEstados(req:Request, res:Response){
        const estados = await sql.query(`SELECT * FROM EstadoOt`);
        res.json(estados.recordset);
    }

}
const estadosController = new EstadosController();
export default estadosController;