import sql from '../database';

class Ordenes {

    public async obtenerPreventivos(){
        const preventivos = await sql.query(`SELECT UtPrevId FROM UT_Preventivo`)

        return preventivos.recordset;
    }

    public async obtenerFechas(preventivoid:number){
        const fechas = await sql.query(`if exists(
            select ot.OrdenId from OrdenDeTrabajo ot 
            inner join UTPreventivo_OrdenDeTrabajo uto on uto.OrdenId=ot.OrdenId
            inner join UT_Preventivo ut on ut.UtPrevId = uto.UTPrevId
            where ut.UtPrevId= ${preventivoid}) 
        begin 
            select top 1 ut.UtPrevId, ot.FechaValidado, per.Dias from OrdenDeTrabajo ot 
            inner join UTPreventivo_OrdenDeTrabajo uto on uto.OrdenId=ot.OrdenId
            inner join UT_Preventivo ut on ut.UtPrevId = uto.UTPrevId
            inner join Preventivo pre on pre.PreventivoId = ut.Preventivo
            inner join Periodicidad per on pre.PeriodicidadId = per.PeriodicidadId
            where ut.UtPrevId= ${preventivoid}
            order by ot.OrdenId DESC
        end 
        else
        begin
            select utp.UTPrevId, utp.FechaInicio, per.Dias from UT_Preventivo utp
            inner join Preventivo pre on pre.PreventivoId = utp.Preventivo
            inner join Periodicidad per on pre.PeriodicidadId = per.PeriodicidadId
            where utp.UtPrevId = ${preventivoid}
        end`)

        return fechas.recordset[0];
    }

    public async crearOT(preventivoId:number){
        try{
            const ultimoId= await sql.query(`INSERT INTO OrdenDeTrabajo (FechaCreacion, EstadoId, TipoId,PrioridadId, OperarioId, Planta, Area, Zona, Seccion, Codigo, Grupo, Equipo, Preventivo)
            SELECT CAST(GETDATE() AS date),
            1,
            1,
            2,
            2482,
            utp.Planta,
            utp.Area,
            utp.Zona,
            utp.Seccion,
            utp.Codigo,
            utp.Grupo,
            utp.Equipo,
            utp.Preventivo
            from UT_Preventivo utp
            WHERE utp.UtPrevId = ${preventivoId};
            SELECT SCOPE_IDENTITY() as 'id'`)
            return ultimoId.recordset[0];

        }catch(e){
            console.error(e)
        }
    }

    public async asociarPreventivoAOT(utprevid:number, ordenid:number){
        try{
            await sql.query(`INSERT INTO UTPreventivo_OrdenDeTrabajo(UTPrevId, OrdenId) VALUES(${utprevid}, ${ordenid})`)
        }catch(e)
        {
            console.log("Error asociando OT a PREV " + e)
        }
    }

    public async crearTareasDeOt(ulitmoid:number){
        try{
            await sql.query(`INSERT INTO TareaDeOT(Descripcion, Estado, OrdenId)
            SELECT T.Descripcion, 0, ${ulitmoid}
            FROM Tarea T
            INNER JOIN Tarea_Preventivo TP ON T.TareaId=TP.TareaId
            INNER JOIN Preventivo P ON P.PreventivoId=TP.PreventivoId
            where p.PreventivoId = ( select x.Preventivo from ordendetrabajo x  where x.OrdenId = ${ulitmoid})`)

        }catch(e){
            console.error(e)
        }
    }

}
const ordenes = new Ordenes();
export default ordenes;