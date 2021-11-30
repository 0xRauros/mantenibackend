import { Request, Response } from 'express';
import sql from '../../database';


class MaterialController{

    //Obtiene todos los materiales de la bbdd
    public async selectMateriales(req:Request, res:Response){
        const material = await sql.query(`SELECT * FROM Material`);
        res.status(200).json(material.recordset);
    }
    //Actualiza la descripcion y el material de un material pasado por parámetro
    public async updateMaterial(req:Request, res:Response){
        try{
            console.log(req.body)
            await sql.query(`UPDATE Material SET Material='${req.body.Material}', Descripcion='${req.body.Descripcion}' WHERE MatId=${req.params.matid}`)
            res.status(200).json({message: "Se ha actualizado el material correctamente"})
        }
        catch(e){
            console.log(e)
            res.status(404).json({message:"No se ha actualizado el material"})
        }
        await sql.query(``)
        res.status
    }

    public async addMaterial(req:Request, res:Response){
        try{       
            await sql.query(`INSERT INTO Material(Material, Descripcion) VALUES('${req.body.Material}','${req.body.Descripcion}')`)
            res.status(200).json({message: "Se ha introducido el material correctamente"})
        }catch(e){
            console.log(e)
            res.status(404).json({message:"No se ha introducido el material"})
        }
    }

    public async deleteMaterial(req:Request, res:Response){
        try{
            await sql.query(`DELETE FROM Material WHERE MatId=${req.params.matid}`)
            res.status(200).json({message: "Se ha eliminado el material correctamente"})
        }catch(e){
            console.log(e)
            res.status(404).json({message:"No se ha eliminado el material"})
        }
    }

    public async deleteMaterialDeOrden(req:Request, res:Response){
        try {
            await sql.query(`DELETE FROM GastoMaterial WHERE GastoId=${req.params.gastoid}`)
            res.status(200).json({message: 'Gasto eliminado correctamente'})

        } catch(error){
            console.log(error)
        }
    }

    public async addMaterialAOT(req:Request, res:Response){
        try{
            await sql.query(`INSERT INTO GastoMaterial(OrdenId, MatId, Cantidad, FechaYHora, OperarioId, Descontado) VALUES(${req.params.ordenid}, ${req.body.matid}, ${req.body.cantidad}, GETDATE(), ${req.body.operarioid}, 0)`)
            res.status(200).json({ message: 'Se ha introducido el gasto de material' })
        } catch (error) {
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
}
const materialController = new MaterialController();
export default materialController;