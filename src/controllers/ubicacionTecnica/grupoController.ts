import { Request, Response } from 'express';
import sql from '../../database';

class GrupoController{
    public async selectAllGrupos(req:Request, res:Response){
        const grupos = await sql.query(`select * from grupo`);
        res.json(grupos.recordset);
    }
    public async selectGrupos(req:Request, res:Response){
        const grupos = await sql.query(`select * from grupo where codigoid = '${req.params.codigoid}'`);
        res.json(grupos.recordset);
    }
    public async selectOne(req:Request, res:Response){
        const grupo = await sql.query(`select * from grupo where codigoid = '${req.params.codigoid}' and grupoid='${req.params.grupoid}'`);
        res.json(grupo.recordset);
    }
    public async addGrupo(req:Request, res:Response){
        await sql.query(`insert into grupo(Denominacion, Descripcion, CodigoId) values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.CodigoId}')`);
        res.json({message:"Grupo introducido correctamente"});
    }
    public async updateGrupo(req:Request, res:Response){
        await sql.query(`update grupo set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', CodigoId = '${req.body.CodigoId}'
        where codigoid = '${req.params.codigoid}' and grupoid='${req.params.grupoid}'`);
        res.json({message:"Grupo modificado correctamente"});
    }
    public async deleteGrupo(req:Request, res:Response){
        await sql.query(`delete from grupo where codigoid = '${req.params.codigoid}' and grupoid='${req.params.grupoid}'`);
        res.json({message:"Grupo eliminado correctamente"});
    }
}
const grupoController = new GrupoController();
export default grupoController;