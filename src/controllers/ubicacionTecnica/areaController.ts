import { Request, Response } from 'express';
import sql from '../../database';

class AreaController{

    public async selectAllAreas(req:Request, res:Response){
        const areas = await sql.query(`select * from area`);
        res.json(areas.recordset);
    }
    public async selectAreas(req:Request, res:Response){
        const areas = await sql.query(`select * from area where PlantaId = '${req.params.plantaid}'`);
        res.json(areas.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const area = await sql.query(`select * from area where areaid = '${req.params.areaid}' and plantaid = '${req.params.plantaid}'`);
        res.json(area.recordset);
    }
    public async addArea(req:Request, res:Response){
        await sql.query(`insert into area(Denominacion, Descripcion, PlantaId) values('${req.body.Denominacion}', '${req.body.Descripcion}','${req.body.PlantaId}')`);
        res.json({message:"Area introducida correctamente"});
    }
    public async updateArea(req:Request, res:Response){
        await sql.query(`update area set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', PlantaId = '${req.body.PlantaId}' where AreaId = '${req.params.areaid}' and PlantaId = '${req.params.plantaid}'`);
        res.json({message:"area modificada correctamente"});
    }
    public async deleteArea(req:Request, res:Response){
        await sql.query(`delete from area where areaid = '${req.params.areaid}' and plantaid = '${req.params.plantaid}'`);
        res.json({message:"area eliminada correctamente"});
    }
}
const areaController = new AreaController();
export default areaController;