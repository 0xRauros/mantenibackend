import { Request, Response } from 'express';
import sql from '../../database';

const consulta = `SELECT ot.OrdenId, 
pre.Descripcion as 'Preventivo', 
case when ot.Area is null then p.Descripcion 
	 when ot.Zona is null then concat(p.Denominacion, '/', a.Descripcion) 
	 when ot.Seccion is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Descripcion)
	 when ot.Codigo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Descripcion) 
	 when ot.Grupo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Descripcion ) 
	 when ot.Equipo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Denominacion, '/', g.Descripcion ) 
	 else concat(p.Denominacion,'/', a.Denominacion,'/' ,z.Denominacion ,'/', s.Denominacion,'/', c.Denominacion,'/', g.Denominacion, '/', eq.Denominacion) 
    end as 'UbicacionTecnica',
    eq.Denominacion as 'Equipo',
    a.Descripcion as 'Localizacion',
    ot.PersonaResponsable,
	e.Descripcion as 'Estado',
	t.Descripcion as 'Tipo',
    ot.ComentarioResponsable,
    ot.ComentarioPreventivo,
    ot.tiempoEmpleado,
    ot.FechaCreacion,
    ot.FechaPendiente,
    ot.FechaTerminado,
    ot.FechaValidado,
    ot.OperarioId,
    da.Nombre as 'Operario',
    pri.Descripcion as 'Prioridad',
    per.Dias,
    ot.PrioridadId
    FROM OrdenDeTrabajo ot 
    inner join EstadoOt e on e.EstadoId=ot.EstadoId
    inner join TipoDeOrden t on t.TipoId = ot.TipoId
    inner join Preventivo pre on pre.PreventivoId = ot.Preventivo
    inner join Periodicidad per on per.PeriodicidadId = pre.PeriodicidadId
    left join DATOS7QB_ISRI_SPAIN.dbo.usuario da on da.Codigo = ot.OperarioId
    inner join Prioridad pri on pri.PrioridadId = ot.PrioridadId
    inner join Planta p on p.plantaid = ot.Planta
    left join Area a on a.areaid = ot.area
    left join Zona z on Z.ZonaId = ot.Zona
    left join Seccion s on s.SeccionId = ot.Seccion
    left join Codigo c on c.CodigoId = ot.Codigo
    left join Grupo g on g.GrupoId = ot.Grupo
    left join Equipo eq on eq.equipoid = ot.Equipo`

class OrdenDeTrabajoController{

    public async selectOrdenPreventiva(req:Request, res:Response){
        const orden = await sql.query(consulta + ` WHERE OrdenId='${req.params.ordenid}'`)
        res.status(200).json(orden.recordset[0])
    }

    //Obtiene las OT de los preventivos planificados
    public async selectPreventivoPlanificada(req:Request, res:Response){
        const ordendetrabajo = await sql.query(consulta +  ` where ot.estadoid=1 and ot.tipoid=1`);
        res.json(ordendetrabajo.recordset);
    }
    //Actualiza los datos cuando pasa de estado planificada a pendiente
    public async updatePlanificada(req:Request, res:Response){

         let comentarioResponsable = ''
        if(req.body.comentarioResponsable==null){ comentarioResponsable=''} 
        else {comentarioResponsable = req.body.comentarioResponsable }

        await sql.query(`UPDATE OrdenDeTrabajo SET OperarioId='${req.body.trabajador}', PrioridadId='${req.body.prioridad}', FechaPendiente = CAST(GETDATE() AS date), ComentarioResponsable='${comentarioResponsable}' , EstadoId=2,
        ComentarioPreventivo=NULL, TiempoEmpleado=0, FechaTerminado=NULL
        WHERE OrdenId='${req.params.ordenid}'`);
        res.json({ message: `Orden de trabajo actualizada de planificada a pendiente` });
    }
    //Obtiene las OT de los preventivos pendiente
    public async selectPreventivoPendiente(req: Request, res: Response) {
        let where = ' where ot.estadoid=2 and ot.tipoid=1'
        const ordendetrabajo = await sql.query(consulta + where);
        res.json(ordendetrabajo.recordset);
    }

    //Actualiza los datos cuando pasa de estado planificada a pendiente
    public async updatePendiente(req: Request, res: Response) {

        let comentario = ''
       if(req.body.comentario== null) {comentario = ''}
       else {comentario = req.body.comentario}

        await sql.query(`UPDATE OrdenDeTrabajo SET ComentarioPreventivo='${comentario}', tiempoEmpleado=${req.body.tiempoEmpleado} ,  FechaTerminado = CAST(GETDATE() AS date) , EstadoId=3
        WHERE OrdenId='${req.params.ordenid}'`);
        res.json({ message: `Orden de trabajo actualizada de pendiente a terminada` });

    }
    //Obtiene las OT de los preventivos terminados
    public async selectPreventivoTerminada(req: Request, res: Response) {
        let where = ' where ot.estadoid=3 and ot.tipoid=1'
        const ordendetrabajo = await sql.query(consulta + where);
        res.json(ordendetrabajo.recordset);
    }
    //Actualiza el estado de la orde a 4 = validada
    public async updateTerminada(req: Request, res: Response) {
        await sql.query(`UPDATE OrdenDeTrabajo SET FechaValidado = CAST(GETDATE() AS date) , EstadoId=4
        WHERE OrdenId='${req.params.ordenid}'`);
        res.json({ message: `Orden de trabajo actualizada de pendiente a terminada` });
    }

    //Obtiene las OT de los preventivos validados
    public async selectPreventivoValidada(req: Request, res: Response) {
        let where = ' WHERE ot.estadoid=4 and ot.tipoid=1'
        const ordendetrabajo = await sql.query(consulta + where);
        res.json(ordendetrabajo.recordset);
    }

    //Actualiza la OT sin cambiar de estado
    public async updateOrden(req: Request, res: Response) {
        let comentario = ''
       if(req.body.comentario== null) {comentario = ''}
       else {comentario = req.body.comentario}

       let comentarioResponsable = ''
       if(req.body.comentarioResponsable== null) {comentarioResponsable = ''}
       else {comentarioResponsable = req.body.comentarioResponsable}

        await sql.query(`UPDATE OrdenDeTrabajo SET ComentarioPreventivo='${comentario}', tiempoEmpleado=${req.body.tiempoEmpleado}, ComentarioResponsable='${comentarioResponsable}'
        WHERE OrdenId='${req.params.ordenid}'`);
        res.json({ message: `Orden de trabajo actualizada de pendiente a terminada` });
    }
    // public async selectOrdenDeTrabajoPreventivaPorSeccion(req:Request, res:Response){
    //     const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
    //     and ot.seccion='${req.params.seccion}'`);
    //     res.json(preventivos.recordset);
    // }
    // public async selectOrdenDeTrabajoPreventivaPorCodigo(req:Request, res:Response){
    //     const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
    //     and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}'`);
    //     res.json(preventivos.recordset);
    // }
    // public async selectOrdenDeTrabajoPreventivaPorGrupo(req:Request, res:Response){
    //     const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
    //     and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}' and ot.grupo='${req.params.grupo}'`);
    //     res.json(preventivos.recordset);
    // }
    // public async selectOrdenDeTrabajoPreventivaPorEquipo(req:Request, res:Response){
    //     const preventivos = await sql.query(consulta + ` where ot.planta = '${req.params.planta}' and ot.area='${req.params.area}' and ot.zona='${req.params.zona}' 
    //     and ot.seccion='${req.params.seccion}' and ot.codigo='${req.params.codigo}' and ot.grupo='${req.params.grupo}' and ot.equipo='${req.params.equipo}'`);
    //     res.json(preventivos.recordset);
    // }
    // public async selectOrdenDeTrabajoPorPreventivo(req:Request, res:Response){
    //     const preventivos = await sql.query(consulta + ` where ot.preventivo = '${req.params.preventivoid}'`);
    //     res.json(preventivos.recordset);
    // }
    // public async addOrdenDeTrabajoPreventiva(req:Request, res:Response){

    //     await sql.query(`INSERT INTO OrdenDeTrabajo (FechaCreacion, EstadoId, TipoId, Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, Preventivo)
    //                     SELECT CAST(GETDATE() AS date), 1,1,
    //                     utp.Planta, utp.Area, utp.Zona, utp.Seccion, utp.Codigo, utp.Grupo, utp.Equipo, utp.Preventivo
    //                     from UT_Preventivo utp
    //                     WHERE CAST(utp.FechaInicio AS DATE) = CAST(GETDATE() AS DATE)`);

    //     const ordenid = await sql.query(`select ordenid from OrdenDeTrabajo
    //                     where fechacreacion = CAST(GETDATE() AS DATE) and tipoid=1`)
    //     const ordenid1:any[] = ordenid['recordset']

    //     if(ordenid1.length==0){
    //         res.json({message:"No hay ordenes de trabajo "})
    //     }else{
    //         for (let i=0; i<ordenid1.length; i++)
    //         {
    //              await sql.query(`INSERT INTO TareaDeOT(Descripcion, Estado, OrdenId)
    //              SELECT T.Descripcion, 0, ${ordenid1[i]['ordenid']}
    //              FROM Tarea T
    //              INNER JOIN Tarea_Preventivo TP ON T.TareaId=TP.TareaId
    //              INNER JOIN Preventivo P ON P.PreventivoId=TP.PreventivoId
    //              where p.PreventivoId = ( select x.Preventivo from ordendetrabajo x  where x.OrdenId = ${ordenid1[i]['ordenid']})`)
    //          }
    //         res.json({message:"Ordenes de trabajo preventiva introducidas correctamente"});
    //     }
    // }
    // public async addOrdenDeTrabajoCorrectiva(req:Request, res:Response){
    //     let area, zona, seccion, codigo, grupo, equipo, fecha;
    //     if (req.body.Area == null) { area = req.body.Area }
    //     else { area = "'" + req.body.Area + "'" }
    //     if (req.body.Zona == null) { zona = req.body.Zona }
    //     else { zona = "'" + req.body.Zona + "'" }
    //     if (req.body.Seccion == null) { seccion = req.body.Seccion }
    //     else { seccion = "'" + req.body.Seccion + "'" }
    //     if (req.body.Codigo == null) { codigo = req.body.Codigo }
    //     else { codigo = "'" + req.body.Codigo + "'" }
    //     if (req.body.Grupo == null) { grupo = req.body.Grupo }
    //     else { grupo = "'" + req.body.Grupo + "'" }
    //     if (req.body.Equipo == null) { equipo = req.body.Equipo }
    //     else { equipo = "'" + req.body.Equipo + "'" }

    //     await sql.query(`INSERT INTO OrdenDeTrabajo(FechaCreacion, EstadoId, TipoId,Preventivo, Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, TituloCorrectivo, DescripcionCorrectivo)
    //     VALUES (CAST(GETDATE() AS DATE), 1, 2, 0, '${req.body.Planta}',${area},${zona},${seccion},${codigo},${grupo},${equipo}, '${req.body.Titulo}', '${req.body.Descripcion}')`);
    //     res.json({message:"Correctivo introducido correctamente"});
    // }
    // public async updateOrdenDeTrabajoAPendiente(req:Request, res:Response){
    //     await sql.query(`update OrdenDeTrabajo set Plazo = '${req.body.Plazo}', PrioridadId='${req.body.PrioridadId}', OperarioId='${req.body.OperarioId}', EstadoId='2', PersonaResponsable='${req.body.PersonaResponsable}',
    //     fechaPendiente = CAST(GETDATE() AS DATE)
    //     where OrdenId = '${req.params.ordenid}'`);
    //     res.json({message:"Orden de trabajo puesta a pendiente correctamente"});
    // }

    // public async updateOrdenDeTrabajoATerminada(req:Request, res:Response){
    //     await sql.query(`update OrdenDeTrabajo set EstadoId='3', fechaTerminado= CAST(GETDATE() AS DATE)'
    //     where OrdenId = '${req.params.ordenid}'`);
    //     res.json({message:"Preventivo modificado correctamente"});
    // }
    // public async deleteOrdenDeTrabajo(req:Request, res:Response){
    //     await sql.query(`delete from UT_Preventivo where UtPrevId= '${req.params.utprevid}'`);
    //     res.json({message:"Preventivo eliminado correctamente"});
    // }
}
const ordendetrabajoController = new OrdenDeTrabajoController();
export default ordendetrabajoController;