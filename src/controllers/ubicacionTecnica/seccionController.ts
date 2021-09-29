import { Request, Response } from 'express';
import sql from '../../database';

class SeccionController{
    public async selectSecciones(req: Request, res: Response):Promise<any>{
        try {
            const secciones = await sql.query(`select * from seccion where zonaid = '${req.params.zonaid}'`);
            if (secciones.recordset.length>0) {
                res.json(secciones.recordset);
            } else {
                res.status(404).json({ message: "No existen secciones para esta zona" })
            }
        } catch (error) {
            res.json(error)
        }
    }
     public async addSeccion(req:Request, res:Response):Promise<void>{
        try{
            await sql.query(`insert into seccion(Denominacion, Descripcion, ZonaId) values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.ZonaId}')`);
            res.status(200).json({message:"Sección introducida correctamente"});
        }catch(error){
            res.json(error)
        }
    }
    public async updateSeccion(req:Request, res:Response):Promise<void>{
        await sql.query(`update seccion set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}', ZonaId = ${req.body.ZonaId} 
        where ZonaId='${req.params.zonaid}' and SeccionId='${req.params.seccionid}'`);
        res.json({message:"Seccion modificada correctamente"});
    }
    public async deleteSeccion(req:Request, res:Response):Promise<void>{
        try{
        await sql.query(`DELETE FROM seccion WHERE SeccionId = '${req.params.seccionid}'`);
        res.status(201).json({message:"Sección eliminada correctamente"});
        }catch(error){
            res.json(error)
        }
    }
}
const seccionController = new SeccionController();
export default seccionController;