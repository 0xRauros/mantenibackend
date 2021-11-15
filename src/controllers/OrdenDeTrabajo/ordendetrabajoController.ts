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
    db.Nombre as 'PersonaResponsable',
	e.Descripcion as 'Estado',
    ot.EstadoId,
	t.Descripcion as 'Tipo',
    ot.TipoId,
    ot.ComentarioResponsable,
    ot.Comentario,
    ot.Plazo,
    ot.TiempoEmpleado,
    ot.TituloCorrectivo,
    ot.DescripcionCorrectivo,
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
    left join Periodicidad per on per.PeriodicidadId = pre.PeriodicidadId
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
        db.Nombre as 'PersonaResponsable',
        e.Descripcion as 'Estado',
        ot.EstadoId,
        t.Descripcion as 'Tipo',
        ot.TipoId,
        ot.ComentarioResponsable,
        ot.Plazo,
        ot.Comentario,
        ot.TituloCorrectivo,
        ot.DescripcionCorrectivo,
        ot.TiempoEmpleado,
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

    public async selectOrden(req:Request, res:Response){
        //const orden = await sql.query(consulta + ` WHERE ot.OrdenId=${req.params.ordenid}`)
        console.log(req.params)
        const orden = await sql.query(`SELECT * FROM OrdenDeTrabajo WHERE OrdenId=81`)
        res.status(200).json(orden.recordset)
    }

    //Obtiene las OT de los preventivos planificados
    public async selectPreventivoPlanificada(req:Request, res:Response){
        const ordendetrabajo = await sql.query(consulta +  ` where ot.estadoid=1 and ot.tipoid=1`);
        res.json(ordendetrabajo.recordset);
    }
    //Actualiza los datos cuando pasa de estado planificada a pendiente
    public async updatePlanificada(req:Request, res:Response){

         let ComentarioResponsable = ''
        if(req.body.ComentarioResponsable==null){ ComentarioResponsable=''} 
        else {ComentarioResponsable = req.body.ComentarioResponsable }

        await sql.query(`UPDATE OrdenDeTrabajo SET OperarioId='${req.body.OperarioId}', PrioridadId='${req.body.PrioridadId}', FechaPendiente = CAST(GETDATE() AS date), ComentarioResponsable='${ComentarioResponsable}' , EstadoId=2,
        Comentario=NULL, TiempoEmpleado=0, FechaTerminado=NULL
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

        let Comentario = ''
       if(req.body.Comentario== null) {Comentario = ''}
       else {Comentario = req.body.Comentario}

        await sql.query(`UPDATE OrdenDeTrabajo SET Comentario='${Comentario}', TiempoEmpleado=${req.body.TiempoEmpleado} ,  FechaTerminado = CAST(GETDATE() AS date) , EstadoId=3
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
        let Comentario = ''
       if(req.body.Comentario== null) {Comentario = ''}
       else {Comentario = req.body.Comentario}

       let ComentarioResponsable = ''
       if(req.body.ComentarioResponsable== null) {ComentarioResponsable = ''}
       else {ComentarioResponsable = req.body.ComentarioResponsable}

        await sql.query(`UPDATE OrdenDeTrabajo SET Comentario='${Comentario}', TiempoEmpleado=${req.body.TiempoEmpleado}, ComentarioResponsable='${ComentarioResponsable}'
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

            const ultimoId = await sql.query(`INSERT INTO OrdenDeTrabajo(TituloCorrectivo, DescripcionCorrectivo, FechaCreacion, PersonaResponsable, EstadoId, PrioridadId, TipoId, Preventivo ${insert})
            VALUES('${req.body.TituloCorrectivo}', '${req.body.DescripcionCorrectivo}', CAST(GetDate() as Date), ${PersonaResponsable}, 1, ${PrioridadId},2, 0  ${insert1});
            INSERT INTO UTPreventivo_OrdenDeTrabajo(UTPrevId, OrdenId) VALUES(0,SCOPE_IDENTITY())`)

            res.status(200).json({message:"Se ha creado la orden de trabajo correctiva"})

        }catch(e){
            console.error(e)
        }
    }
    //Obtener ordenes correctivas de los 4 estados
    public async getCorrectivos(req:Request, res:Response){
        try{
            const correctivos = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2`)

            const planificadas = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2 and ot.EstadoId=1`)
            const pendientes = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2 and ot.EstadoId=2`)
            const terminadas = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2 and ot.EstadoId=3`)
            const validadas = await sql.query(`${ordenCorrectiva} WHERE ot.TipoId=2 and ot.EstadoId=4`)

            res.status(200).json([{ordenes:planificadas.recordset,"nombre": 'Planificadas'}, {ordenes:pendientes.recordset,"nombre": 'Pendientes'},{ordenes:terminadas.recordset,"nombre": 'Terminadas'}, {ordenes:validadas.recordset,"nombre": 'Validadas'} ])
        }catch(e){
            console.error(e)
        }
    }

    //Get para todas las ordenes
    public async getOrdenes(req:Request, res:Response) {
        try{
            const ordenes = await sql.query(`SELECT ot.OrdenId, 
            pre.Descripcion as 'Preventivo', 
            case when ot.Area is null then p.Descripcion 
                 when ot.Zona is null then concat(p.Denominacion, '/', a.Descripcion) 
                 when ot.Seccion is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Descripcion)
                 when ot.Codigo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Descripcion) 
                 when ot.Grupo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Descripcion ) 
                 when ot.Equipo is null then concat(p.Denominacion, '/', a.Denominacion, '/', z.Denominacion, '/', s.Denominacion, '/', c.Denominacion, '/', g.Descripcion ) 
                 else concat(p.Denominacion,'/', a.Denominacion,'/' ,z.Denominacion ,'/', s.Denominacion,'/', c.Denominacion,'/', g.Denominacion, '/', eq.Denominacion) 
                end as 'UbicacionTecnica'
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
                left join Equipo eq on eq.equipoid = ot.Equipo`)

            res.status(200).json(ordenes.recordset)
        }
         catch(e){
             console.error(e)
         }

    }


}
const ordendetrabajoController = new OrdenDeTrabajoController();
export default ordendetrabajoController;