import { Request, Response } from 'express';
import sql from '../../database';

const consulta = `SELECT ot.OrdenId, 
case when ot.Area is null then p.Descripcion 
	 when ot.Zona is null then concat(p.Denominacion, '/', a.Descripcion) 
	 when ot.Seccion is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Descripcion)
	 when ot.Codigo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Descripcion) 
	 when ot.Grupo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Descripcion ) 
	 when ot.Equipo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Denominacion, '/', g.Descripcion ) 
	 else concat(p.Denominacion,'/', a.Denominacion,'/' ,z.Denominacion ,'/', s.Denominacion,'/', c.Denominacion,'/', g.Denominacion, '/', eq.Denominacion) 
    end as 'Ubicación Técnica',
    ot.FechaCreacion,
    ot.fechaPendiente,
    ot.fechaTerminado,
    ot.Plazo,
    concat(o.Nombre, ' ' , o.Apellido) as 'Operario' 
    , e.Descripcion as 'Estado', 
    t.Descripcion as 'Tipo' 
    , pre.Descripcion as 'Preventivo'
    ,ot.PersonaResponsable
    FROM OrdenDeTrabajo ot 
    inner join EstadoOt e on e.EstadoId=ot.EstadoId
    inner join TipoDeOrden t on t.TipoId = ot.TipoId
    inner join Preventivo pre on pre.PreventivoId = ot.Preventivo
    left join Operario o on o.OperarioId = ot.OperarioId
    inner join Planta p on p.plantaid = ot.Planta
    left join Area a on a.areaid = ot.area
    left join Zona z on Z.ZonaId = ot.Zona
    left join Seccion s on s.SeccionId = ot.Seccion
    left join Codigo c on c.CodigoId = ot.Codigo
    left join Grupo g on g.GrupoId = ot.Grupo
    left join Equipo eq on eq.equipoid = ot.Equipo`

class OrdenDeTrabajoController{

    public async selectAllOrdenDeTrabajo(req:Request, res:Response){
        const ordendetrabajo = await sql.query(consulta);
        res.json(ordendetrabajo.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorPlanta(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.TipoId=1`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorArea(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorZona(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorSeccion(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
        and ot.seccion='${req.params.seccion}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorCodigo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
        and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorGrupo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
        and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}' and ot.grupo='${req.params.grupo}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPreventivaPorEquipo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
        and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}' and ot.grupo='${req.params.grupo}' and ot.equipo='${req.params.equipo}'`);
        res.json(preventivos.recordset);
    }
    public async selectOrdenDeTrabajoPorPreventivo(req:Request, res:Response){
        const preventivos = await sql.query(consulta + ` where ot.preventivo = '${req.params.preventivoid}'`);
        res.json(preventivos.recordset);
    }
    public async addOrdenDeTrabajoPreventiva(req:Request, res:Response){

        await sql.query(`INSERT INTO OrdenDeTrabajo (FechaCreacion, EstadoId, TipoId, Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, Preventivo)
                        SELECT CAST(GETDATE() AS date), 1,1,
                        utp.Planta, utp.Area, utp.Zona, utp.Seccion, utp.Codigo, utp.Grupo, utp.Equipo, utp.Preventivo
                        from UT_Preventivo utp
                        WHERE CAST(utp.FechaInicio AS DATE) = CAST(GETDATE() AS DATE)`);

        const ordenid = await sql.query(`select ordenid from OrdenDeTrabajo
                        where fechacreacion = CAST(GETDATE() AS DATE) and tipoid=1`)
        const ordenid1:any[] = ordenid['recordset']

        if(ordenid1.length==0){
            res.json({message:"No hay ordenes de trabajo "})
        }else{
            for (let i=0; i<ordenid1.length; i++)
            {
                 await sql.query(`INSERT INTO TareaDeOT(Descripcion, Estado, OrdenId)
                 SELECT T.Descripcion, 0, ${ordenid1[i]['ordenid']}
                 FROM Tarea T
                 INNER JOIN Tarea_Preventivo TP ON T.TareaId=TP.TareaId
                 INNER JOIN Preventivo P ON P.PreventivoId=TP.PreventivoId
                 where p.PreventivoId = ( select x.Preventivo from ordendetrabajo x  where x.OrdenId = ${ordenid1[i]['ordenid']})`)
             }
            res.json({message:"Ordenes de trabajo preventiva introducidas correctamente"});
        }
    }
    public async addOrdenDeTrabajoCorrectiva(req:Request, res:Response){
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

        await sql.query(`INSERT INTO OrdenDeTrabajo(FechaCreacion, EstadoId, TipoId,Preventivo, Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, TituloCorrectivo, DescripcionCorrectivo)
        VALUES (CAST(GETDATE() AS DATE), 1, 2, 0, '${req.body.Planta}',${area},${zona},${seccion},${codigo},${grupo},${equipo}, '${req.body.Titulo}', '${req.body.Descripcion}')`);
        res.json({message:"Correctivo introducido correctamente"});
    }
    public async updateOrdenDeTrabajoAPendiente(req:Request, res:Response){
        await sql.query(`update OrdenDeTrabajo set Plazo = '${req.body.Plazo}', PrioridadId='${req.body.PrioridadId}', OperarioId='${req.body.OperarioId}', EstadoId='2', PersonaResponsable='${req.body.PersonaResponsable}',
        fechaPendiente = CAST(GETDATE() AS DATE)
        where OrdenId = '${req.params.ordenid}'`);
        res.json({message:"Orden de trabajo puesta a pendiente correctamente"});
    }

    public async updateOrdenDeTrabajoATerminada(req:Request, res:Response){
        await sql.query(`update OrdenDeTrabajo set EstadoId='3', fechaTerminado= CAST(GETDATE() AS DATE)'
        where OrdenId = '${req.params.ordenid}'`);
        res.json({message:"Preventivo modificado correctamente"});
    }
    public async deleteOrdenDeTrabajo(req:Request, res:Response){
        await sql.query(`delete from UT_Preventivo where UtPrevId= '${req.params.utprevid}'`);
        res.json({message:"Preventivo eliminado correctamente"});
    }
}
const ordendetrabajoController = new OrdenDeTrabajoController();
export default ordendetrabajoController;