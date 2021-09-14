import { Request, Response } from 'express';
import sql from '../../database';

class CodigoController{
    public async selectAllCodigos(req:Request, res:Response){
        const codigos = await sql.query(`select * from codigo`);
        res.json(codigos.recordset);
    }
    public async selectCodigos(req:Request, res:Response){
        const codigo = await sql.query(`select * from codigo where seccionid = '${req.params.seccionid}'`);
        res.json(codigo.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const codigo = await sql.query(`select * from codigo where seccionid = '${req.params.seccionid}' and codigoid = '${req.params.codigoid}'`);
        res.json(codigo.recordset);
    }
    public async addSeccion(req:Request, res:Response){
        await sql.query(`insert into codigo(Denominacion, Descripcion, SeccionId) values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.SeccionId}')`);
        res.json({message:"Seccion introducida correctamente"});
    }
    public async updateSeccion(req:Request, res:Response){
        await sql.query(`update codigo set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', SeccionId = ${req.body.SeccionId} 
        where seccionId='${req.params.seccionid}' and codigoId='${req.params.codigoid}'`);
        res.json({message:"Seccion modificada correctamente"});
    }
    public async deleteSeccion(req:Request, res:Response){
        await sql.query(`delete from codigo where seccionId='${req.params.seccionid}' and codigoId='${req.params.codigoid}'`);
        res.json({message:"Seccion eliminada correctamente"});
    }
}
const codigoController = new CodigoController();
export default codigoController;