import { Request, Response } from 'express';
import sql from '../../database';


class PreventivoController{

    public async selectAllPreventivos(req:Request, res:Response){
        const preventivos = await sql.query(`select * from preventivo`);
        res.json(preventivos.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const area = await sql.query(`select * from preventivo where preventivoid = '${req.params.preventivoid}'`);
        res.json(area.recordset);
    }
    public async addPreventivo(req:Request, res:Response){
        await sql.query(`insert into preventivo(Descripcion, PeriodicidadId) values('${req.body.Descripcion}','${req.body.PeriodicidadId}')`);
        res.json({message:"Preventivo introducida correctamente"});
    }
    public async updatePreventivo(req:Request, res:Response){
        await sql.query(`update preventivo set Descripcion = '${req.body.Descripcion}', PeriodicidadId = '${req.body.PeriodicidadId}' where PreventivoId = '${req.params.preventivoid}'`);
        res.json({message:"Preventivo modificado correctamente"});
    }
    public async deletePreventivo(req:Request, res:Response){
        await sql.query(`delete from preventivo where PreventivoId = '${req.params.preventivoid}'`);
        res.json({message:"Preventivo eliminado correctamente"});
    }
}
const preventivoController = new PreventivoController();
export default preventivoController;