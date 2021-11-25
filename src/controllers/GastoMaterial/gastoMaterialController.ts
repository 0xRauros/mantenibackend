import { Request, Response } from 'express';
import sql from '../../database';


class GastoMaterialController{

    //Obtiene todos los materiales de la bbdd
    public async getGastoMaterialDeOrden(req:Request, res:Response){
        const gasto = await sql.query(`SELECT gm.GastoId, ma.Material, ma.Descripcion, gm.Cantidad, convert(varchar,gm.FechaYHora, 20) as Fecha, usu.Nombre FROM GastoMaterial gm
        INNER JOIN OrdenDeTrabajo ot on ot.OrdenId = gm.OrdenId
        INNER JOIN Material ma on ma.MatId = gm.MatId
        INNER JOIN DATOS7QB_ISRI_SPAIN.dbo.usuario usu on usu.Codigo= gm.OperarioId
        WHERE ot.OrdenId = ${req.params.ordenid}`)

        res.status(200).json(gasto.recordset)
    }

    //Elimina un gasto 
    public async deleteGastoMaterial(req:Request, res:Response){
        try {
            await sql.query(`DELETE FROM GastoMaterial WHERE GastoId=${req.params.gastoid}`)
            res.status(200).json({message: 'Gasto eliminado correctamente'})

        } catch(error){
            console.log(error)
        }
    }
    //Añadir Gasto
    public async addGastoMaterial(req:Request, res:Response){
        try{
            console.log(req.body, req.params)
            await sql.query(`INSERT INTO GastoMaterial(OrdenId, MatId, Cantidad, FechaYHora, OperarioId, Descontado) VALUES(${req.params.ordenid}, ${req.body.matid}, ${req.body.cantidad}, GETDATE(), ${req.body.operarioid}, 0)`)
            res.status(200).json({ message: 'Se ha introducido el gasto de material' })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

    
    //Obtiene el gasto general de todas las OT
    public async getGastoMaterial(req:Request, res:Response){
        try{
            const gastomaterial = await sql.query(`SELECT gm.GastoId, ma.Material, ma.Descripcion, gm.Cantidad, gm.OrdenId, convert(varchar,gm.FechaYHora, 20) as Fecha, usu.Nombre FROM GastoMaterial gm
            INNER JOIN OrdenDeTrabajo ot on ot.OrdenId = gm.OrdenId
            INNER JOIN Material ma on ma.MatId = gm.MatId
            INNER JOIN DATOS7QB_ISRI_SPAIN.dbo.usuario usu on usu.Codigo= gm.OperarioId
            WHERE gm.Descontado=0`)
            res.status(200).json(gastomaterial.recordset)

        } catch(error){
            res.status(400).json(error)
        }
    }

        
    //Dar por descontado el gasto
    public async updateGastoMaterial(req:Request, res:Response){
        try{
            await sql.query(`UPDATE GastoMaterial SET Descontado=1 WHERE Descontado=0`)
            res.status(200).json({message:"Se ha dado por descontado correctamente"})
        }catch(e)
        {
           console.log(e) 
        }
    }
}
const gastoMaterialController = new GastoMaterialController();
export default gastoMaterialController;