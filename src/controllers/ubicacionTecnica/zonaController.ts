import { Request, Response } from 'express';
import sql from '../../database';

class ZonaController {
    public async selectZonas(req: Request, res: Response): Promise<void> {
        try {
            const zonas = await sql.query(`select * from Zona where areaid='${req.params.areaid}'`);
            if (zonas.recordset.length > 0) {
                res.json(zonas.recordset);
            } else {
                res.status(404).json({ message: "No hay zonas para este area" })
            }
        } catch (error) {
            res.json(error)
            console.log(error)
        }
    }
    public async addZona(req: Request, res: Response): Promise<void> {
        try {
            await sql.query(`insert into Zona(Denominacion, Descripcion, AreaId) 
            values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.AreaId}')`);
            res.status(200).json({ message: "Zona introducida correctamente" });
        } catch (error) {
            res.json(error)
            console.log(error)
        }
    }
    public async updateZona(req: Request, res: Response): Promise<void> {
        try {
            await sql.query(`UPDATE zona SET Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}' WHERE ZonaId = '${req.params.zonaid}'`);
            res.status(201).json({ message: "Zona modificada correctamente" });
        } catch (error) {
            res.json(error)
        }
    }
    public async deleteZona(req: Request, res: Response): Promise<void> {
        try {
            await sql.query(`DELETE FROM zona WHERE ZonaId ='${req.params.zonaid}'`);
            res.status(201).json({ message: "Zona eliminada correctamente" });
        } catch (error) {
            res.json(error)
        }
    }
}
const zonaController = new ZonaController();
export default zonaController;