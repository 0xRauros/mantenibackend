import { Request, Response } from 'express';
import sql from '../../database';

class UbicacionController{

    public async selectUbicaciones(req:Request, res:Response):Promise<any>{
    try{
        const ubicaciones = await sql.query(`select p.Denominacion as 'Planta',
        ISNULL(a.Descripcion,'-') as 'Area',
        ISNULL(z.Descripcion,'-') as 'Zona',
        ISNULL(s.Descripcion,'-') as 'Seccion', 
        ISNULL(c.Descripcion,'-') as 'Codigo', 
        ISNULL(g.Descripcion,'-') as 'Grupo',
        ISNULL(e.Denominacion,'-') as 'Equipo'
        from planta p
        left join Area a on p.PlantaId = a.PlantaId
        left join Zona z on a.AreaId = z.AreaId
        left join Seccion s on z.ZonaId = s.ZonaId
        left join Codigo c on s.SeccionId = c.SeccionId
        left join Grupo g on c.CodigoId = g.CodigoId
        left join Equipo e on g.GrupoId = e.GrupoId
        where (p.PlantaId like '%${req.body.PlantaId}%') 
        and (a.AreaId like '%${req.body.AreaId}%' OR a.AreaId IS NULL)
        and (z.ZonaId like '%${req.body.ZonaId}%' OR z.ZonaId IS NULL)
        and (s.SeccionId like '%${req.body.SeccionId}%' OR s.SeccionId IS NULL)
        and (c.CodigoId like'%${req.body.CodigoId}%' OR c.CodigoId IS NULL)
        and (g.GrupoId like '%${req.body.GrupoId}%' OR g.GrupoId IS NULL)
        and (e.EquipoId like '%${req.body.EquipoId}%' OR e.EquipoId IS NULL)`);

        if(ubicaciones.recordset.length>0){
            res.status(200).json(ubicaciones.recordset)
        }else{
            res.status(404).json({message:"No se han encontrado ubicaciones técnicas"})
        }
    }catch(error){
        res.json(error)
        console.log(error)
    }
    }

    
}
const ubicacionController = new UbicacionController();
export default ubicacionController;