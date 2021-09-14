import { Request, Response } from 'express';
import sql from '../../database';

class SeccionController{
    public async selectAllSecciones(req:Request, res:Response){
        const secciones = await sql.query(`select * from seccion`);
        res.json(secciones.recordset);
    }
    public async selectSecciones(req:Request, res:Response){
        const secciones = await sql.query(`select * from seccion where zonaid = '${req.params.zonaid}'`);
        res.json(secciones.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const seccion = await sql.query(`select * from seccion where zonaid = '${req.params.zonaid}' and seccionid = '${req.params.seccionid}'`);
        res.json(seccion.recordset);
    }
    public async addSeccion(req:Request, res:Response){
        await sql.query(`insert into seccion(Denominacion, Descripcion, ZonaId) values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.ZonaId}')`);
        res.json({message:"Seccion introducida correctamente"});
    }
    public async updateSeccion(req:Request, res:Response){
        await sql.query(`update seccion set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', ZonaId = ${req.body.ZonaId} 
        where ZonaId='${req.params.zonaid}' and SeccionId='${req.params.seccionid}'`);
        res.json({message:"Seccion modificada correctamente"});
    }
    public async deleteSeccion(req:Request, res:Response){
        await sql.query(`delete from seccion where ZonaId = '${req.params.zonaid}' and seccionid = '${req.params.seccionid}'`);
        res.json({message:"Seccion eliminada correctamente"});
    }
}
const seccionController = new SeccionController();
export default seccionController;