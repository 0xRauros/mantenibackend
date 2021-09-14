import { Request, Response } from 'express';
import sql from '../../database';

class ZonaController{
    public async selectAllZonas(req:Request, res:Response){
        const zonas = await sql.query(`select * from Zona'`);
        res.json(zonas.recordset);
    }
    public async selectZonas(req:Request, res:Response){
        const zonas = await sql.query(`select * from Zona where areaid='${req.params.areaid}'`);
        res.json(zonas.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const zona = await sql.query(`select * from zona where areaid = '${req.params.areaid}' and zonaid = '${req.params.zonaid}'`);
        res.json(zona.recordset);
    }
    public async addZona(req:Request, res:Response){
        await sql.query(`insert into Zona(Denominacion, Descripcion, AreaId) 
        values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.AreaId}')`);
        res.json({message:"Zona introducida correctamente"});
    }
    public async updateZona(req:Request, res:Response){
        await sql.query(`update zona set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', ZonaId = '${req.body.ZonaId}'
        where AreaId ='${req.params.areaid}' and ZonaId = '${req.params.zonaid}'`);
        res.json({message:"Zona modificada correctamente"});
    }
    public async deleteZona(req:Request, res:Response){
        await sql.query(`delete from zona where AreaId ='${req.params.areaid}' and ZonaId = '${req.params.zonaid}'`);
        res.json({message:"Zona eliminada correctamente"});
    }
}
const zonaController = new ZonaController();
export default zonaController;