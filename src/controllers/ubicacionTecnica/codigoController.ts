import { Request, Response } from 'express';
import sql from '../../database';

class CodigoController {
    public async selectCodigos(req: Request, res: Response):Promise<void>{
        try {
            const codigo = await sql.query(`select * from codigo where seccionid = '${req.params.seccionid}'`);
            if (codigo.recordset.length>0) {
                res.status(200).json(codigo.recordset)
            } else {
                res.status(404).json({ message: "No existen códigos para esta sección" })
            }
        } catch (error) {
            res.json(error)
        }
    }
    public async addCodigo(req: Request, res: Response):Promise<void>{
        try{
            await sql.query(`insert into codigo(Denominacion, Descripcion, SeccionId) values('${req.body.Denominacion}', '${req.body.Descripcion}', '${req.body.SeccionId}')`);
            res.status(200).json({ message: "Codigo introducido correctamente" })

        }catch(error){
            res.json(error)
            console.log(error)
        }
    }
    public async updateCodigo(req: Request, res: Response):Promise<void>{
        try{
        await sql.query(`update codigo set Denominacion = '${req.body.Denominacion}', Descripcion = '${req.body.Descripcion}' where CodigoId='${req.params.codigoid}'`);
        res.status(201).json({ message: "Código modificado correctamente" });
        }catch(error){
            res.json(error)
        }
    }
    public async deleteCodigo(req: Request, res: Response):Promise<void>{
        try{
        await sql.query(`DELETE FROM codigo WHERE CodigoId='${req.params.codigoid}'`);
        res.status(201).json({ message: "Código eliminado correctamente" });            
        }catch(error){
            res.json(error)
        }
    }
}
const codigoController = new CodigoController();
export default codigoController;