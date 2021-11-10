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
    db.Nombre,
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
    left join DATOS7QB_ISRI_SPAIN.dbo.usuario db on db.Codigo = ot.PersonaResponsable
    inner join Prioridad pri on pri.PrioridadId = ot.PrioridadId
    inner join Planta p on p.plantaid = ot.Planta
    left join Area a on a.areaid = ot.area
    left join Zona z on Z.ZonaId = ot.Zona
    left join Seccion s on s.SeccionId = ot.Seccion
    left join Codigo c on c.CodigoId = ot.Codigo
    left join Grupo g on g.GrupoId = ot.Grupo
    left join Equipo eq on eq.equipoid = ot.Equipo`

    const ordenCorrectiva = `SELECT ot.OrdenId, 
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
        db.Nombre,
        e.Descripcion as 'Estado',
        t.Descripcion as 'Tipo',
        ot.ComentarioResponsable,
        ot.Plazo,
        ot.Resolucion,
        ot.TituloCorrectivo,
        ot.DescripcionCorrectivo,
        ot.tiempoEmpleado,
        ot.FechaCreacion,
        ot.FechaPendiente,
        ot.FechaTerminado,
        ot.FechaValidado,
        ot.OperarioId,
        da.Nombre as 'Operario',
        pri.Descripcion as 'Prioridad',
        ot.PrioridadId
        FROM OrdenDeTrabajo ot 
        inner join EstadoOt e on e.EstadoId=ot.EstadoId
        inner join TipoDeOrden t on t.TipoId = ot.TipoId
        inner join Preventivo pre on pre.PreventivoId = ot.Preventivo
        left join DATOS7QB_ISRI_SPAIN.dbo.usuario da on da.Codigo = ot.OperarioId
        left join DATOS7QB_ISRI_SPAIN.dbo.usuario db on db.Codigo = ot.PersonaResponsable
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

    // Crear orden correctiva
        //Crear orden correctiva
    public async crearCorrectivo(req:Request, res:Response){
        try{

            let insert = '', insert1 = '', PersonaResponsable = '', PrioridadId = 0
            if(req.body.Planta){ insert += ', Planta';  insert1 += `, ${req.body.Planta}`}
            if(req.body.Area){   insert += ', Area';    insert1 += `, ${req.body.Area}`}
            if(req.body.Zona){   insert += ', Zona';    insert1 += `, ${req.body.Zona}`}
            if(req.body.Seccion){insert += ', Seccion'; insert1 += `, ${req.body.Seccion}`}
            if(req.body.Codigo){ insert += ', Codigo';  insert1 += `, ${req.body.Codigo}`}
            if(req.body.Grupo){  insert += ', Grupo';   insert1 += `, ${req.body.Grupo}`}
            if(req.body.Equipo){ insert += ', Equipo';  insert1 += `, ${req.body.Equipo}`}

            PersonaResponsable = req.body.PersonaResponsable
            PrioridadId = req.body.PrioridadId

            await sql.query(`INSERT INTO OrdenDeTrabajo(TituloCorrectivo, DescripcionCorrectivo, FechaCreacion, PersonaResponsable, EstadoId, PrioridadId, TipoId, Preventivo ${insert})
            VALUES('${req.body.TituloCorrectivo}', '${req.body.DescripcionCorrectivo}', CAST(GetDate() as Date), ${PersonaResponsable}, 1, ${PrioridadId},2, 0  ${insert1})`)

            res.status(200).json({message:"Se ha creado la orden correctiva"})

        }catch(e){
            console.error(e)
        }
    }
        //Obtener ordenes personales
    public async getCorrectivosPersonales(req:Request, res:Response){
        try{
            let PersonaResponsable = req.params.PersonaResponsable
            const correctivos = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2 and ot.PersonaResponsable = ${PersonaResponsable} `)

            if(correctivos.recordset.length > 0){
                res.status(200).json(correctivos.recordset)               
            }else {
                res.status(404).json({message:"No se han encontrado ordenes correctivas para esa persona"})
            }
        }catch(e){
            console.error(e)
        }
    }


}
const ordendetrabajoController = new OrdenDeTrabajoController();
export default ordendetrabajoController;