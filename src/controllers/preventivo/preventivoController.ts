import { Request, Response } from 'express';
import sql from '../../database';


class PreventivoController{

    /** Obtener todos los preventivos */
    public async selectAllPreventivos(req:Request, res:Response){
        const preventivos = await sql.query(`SELECT pre.*, per.Descripcion as 'Periodicidad' FROM Preventivo pre 
        INNER JOIN Periodicidad per on pre.PeriodicidadId = per.PeriodicidadId`);
        res.json(preventivos.recordset);
    }
    /** Obtiene un preventivo en concreto */
    public async selectLastPreventivo(req:Request, res:Response){
        const area = await sql.query(`SELECT MAX(PreventivoId) AS id FROM Preventivo`);
        res.json(area.recordset[0].id);
    }
    /** Añade un nuevo preventivo */
    public async addPreventivo(req: Request, res: Response) {
        try {
            await sql.query(`INSERT INTO Preventivo(Descripcion, PeriodicidadId) VALUES('${req.body.nombre}','${req.body.periodicidad}')`);
            res.status(200).json({ message: "Preventivo creado correctamente" });
        } catch (error) {
            res.status(400).json(error)
        }
    }
    /** Actualiza un preventivo en concreto */
    public async updatePreventivo(req:Request, res:Response){
       await sql.query(`update preventivo set Descripcion = '${req.body.Descripcion}', PeriodicidadId = ${req.body.PeriodicidadId} where PreventivoId = ${req.params.preventivoid}`);
        res.json({message:"Preventivo modificado correctamente"});
    }
    /** Elimina un preventivo en concreto */
    public async deletePreventivo(req:Request, res:Response){
        await sql.query(`delete from preventivo where PreventivoId = '${req.params.preventivoid}'`);
        res.json({message:"Preventivo eliminado correctamente"});
    }
    /**Periodicidades */
    public async selectPeriodicidad(req:Request, res:Response){
        const periodicidades = await sql.query(`SELECT * FROM Periodicidad`)
        res.json(periodicidades.recordset)
    }
}
const preventivoController = new PreventivoController();
export default preventivoController;