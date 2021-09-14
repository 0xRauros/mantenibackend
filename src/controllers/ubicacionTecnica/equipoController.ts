import { Request, Response } from 'express';
import sql from '../../database';

class EquipoController{
    public async selectAllEquipos(req:Request, res:Response){
        const equipos = await sql.query(`select * from equipo`);
        res.json(equipos.recordset);
    }
    public async selectEquipos(req:Request, res:Response){
        const equipos = await sql.query(`select * from equipo where grupoid = '${req.params.grupoid}'`);
        res.json(equipos.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const equipo = await sql.query(`select * from equipo where grupoid = '${req.params.grupoid}' and equipoid='${req.params.equipoid}'`);
        res.json(equipo.recordset);
    }
    public async addEquipo(req:Request, res:Response){
        await sql.query(`insert into equipo(Denominacion, GrupoId) values('${req.body.Denominacion}', '${req.body.GrupoId}')`);
        res.json({message:"Equipo introducido correctamente"});
    }
    public async updateEquipo(req:Request, res:Response){
        await sql.query(`update equipo set Denominacion = '${req.body.Denominacion}', GrupoId = '${req.body.GrupoId}'
        where grupoid = '${req.params.grupoid}' and equipoid='${req.params.equipoid}'`);
        res.json({message:"Equipo modificado correctamente"});
    }
    public async deleteEquipo(req:Request, res:Response){
        await sql.query(`delete from equipo where grupoid = '${req.params.grupoid}' and equipoid='${req.params.equipoid}'`);
        res.json({message:"Equipo eliminado correctamente"});
    }
}
const equipoController = new EquipoController();
export default equipoController;