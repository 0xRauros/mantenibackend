import { Request, Response } from 'express';
import sql from '../../database';

const consulta = `select utp.utprevid,
case when utp.Area is null then p.Descripcion 
     when utp.Zona is null then concat(p.Denominacion, '/', a.Descripcion) 
     when utp.Seccion is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Descripcion)
     when utp.Codigo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Descripcion) 
     when utp.Grupo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Descripcion ) 
     when utp.Equipo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Denominacion, '/', g.Descripcion ) 
     else concat(p.Denominacion,'/', a.Denominacion,'/' ,z.Denominacion ,'/', s.Denominacion,'/', c.Denominacion,'/', g.Denominacion, '/', e.Denominacion) 
end as 'Ubicación Técnica', 
pre.Descripcion as 'Preventivo', per.Descripcion as 'Periodicidad', per.Dias as 'Días', utp.fechainicio as 'Fecha Inicio'
from UT_Preventivo utp
left join Planta p on p.PlantaId = utp.Planta 
left join Area a on a.AreaId = utp.Area
left join Zona z on z.ZonaId = utp.Zona
left join Seccion s on s.SeccionId = utp.Seccion
left join Codigo c on c.CodigoId = utp.Codigo
left join Grupo g on g.GrupoId = utp.Grupo
left join Equipo e on e.EquipoId = utp.Equipo
inner join Preventivo pre on pre.PreventivoId=utp.Preventivo
inner join Periodicidad per on per.PeriodicidadId = pre.periodicidadid`

class SeccionController{

    public async selectAllUtPreventivos(req:Request, res:Response){
        const preventivos = await sql.query(consulta);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorPlanta(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorArea(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorZona(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}' and utp.zona='${req.params.zona}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorSeccion(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}' and utp.zona='${req.params.zona}' 
        and utp.seccion='${req.params.seccion}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorCodigo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}' and utp.zona='${req.params.zona}' 
        and utp.seccion='${req.params.seccion}' and utp.codigo='${req.params.codigo}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorGrupo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}' and utp.zona='${req.params.zona}' 
        and utp.seccion='${req.params.seccion}' and utp.codigo='${req.params.codigo}' and utp.grupo='${req.params.grupo}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorEquipo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.planta = '${req.params.planta}' and utp.area='${req.params.area}' and utp.zona='${req.params.zona}' 
        and utp.seccion='${req.params.seccion}' and utp.codigo='${req.params.codigo}' and utp.grupo='${req.params.grupo}' and utp.equipo='${req.params.equipo}'`);
        res.json(preventivos.recordset);
    }
    public async selectUtPreventivosPorPreventivo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where utp.preventivo = '${req.params.preventivoid}'`);
        res.json(preventivos.recordset);
    }
    public async addUtPreventivo(req:Request, res:Response){
        let area, zona, seccion, codigo, grupo, equipo, fecha;
        if (req.body.Area == null) { area = req.body.Area }
        else { area = "'" + req.body.Area + "'" }
        if (req.body.Zona == null) { zona = req.body.Zona }
        else { zona = "'" + req.body.Zona + "'" }
        if (req.body.Seccion == null) { seccion = req.body.Seccion }
        else { seccion = "'" + req.body.Seccion + "'" }
        if (req.body.Codigo == null) { codigo = req.body.Codigo }
        else { codigo = "'" + req.body.Codigo + "'" }
        if (req.body.Grupo == null) { grupo = req.body.Grupo }
        else { grupo = "'" + req.body.Grupo + "'" }
        if (req.body.Equipo == null) { equipo = req.body.Equipo }
        else { equipo = "'" + req.body.Equipo + "'" }
        if (req.body.FechaInicio == null) { fecha = req.body.FechaInicio }
        else { fecha = "'" + req.body.FechaInicio + "'" }

        await sql.query(`INSERT INTO UT_Preventivo(Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, Preventivo, FechaInicio)
        VALUES ('${req.body.Planta}',${area},${zona},${seccion},${codigo},${grupo},${equipo},'${req.body.Preventivo}',${fecha})`);
        res.json({message:"Preventivo introducido correctamente"});
    }
    public async updatePreventivo(req:Request, res:Response){
        await sql.query(`update UT_Preventivo set FechaInicio = '${req.body.FechaInicio}'
        where UtPrevId = '${req.params.utprevid}'`);
        res.json({message:"Preventivo modificado correctamente"});
    }
    public async deleteUtPreventivo(req:Request, res:Response){
        await sql.query(`delete from UT_Preventivo where UtPrevId= '${req.params.utprevid}'`);
        res.json({message:"Preventivo eliminado correctamente"});
    }
}
const seccionController = new SeccionController();
export default seccionController;