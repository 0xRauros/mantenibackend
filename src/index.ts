import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import plantaRoutes from "./routes/ubicacionTecnica/plantaRoutes";
import areaRoutes from "./routes/ubicacionTecnica/areaRoutes";
import zonaRoutes from "./routes/ubicacionTecnica/zonaRoutes";
import seccionRoutes from "./routes/ubicacionTecnica/seccionRoutes";
import codigoRoutes from "./routes/ubicacionTecnica/codigoRoutes";
import grupoRoutes from "./routes/ubicacionTecnica/grupoRoutes";
import equipoRoutes from "./routes/ubicacionTecnica/equipoRoutes";
import utpreventivoRoutes from "./routes/UT_Preventivo/utpreventivoRoutes";
import preventivoRoutes from "./routes/preventivo/preventivoRoutes";
import ordendetrabajoRoutes from "./routes/OrdenDeTrabajo/ordendetrabajoRoutes";
import tareasRoutes from "./routes/Tareas/tareasRoutes";
import ubicacionRoutes from "./routes/ubicacionTecnica/ubicacionRoutes";
import encabezadoRoutes from "./routes/Encabezado/encabezadoRoutes";
import operarioRoutes from "./routes/Operario/operarioRoutes";
import prioridadRouters from "./routes/Prioridad/prioridadRouters";
import materialesRoutes from "./routes/Materiales/materialesRoutes";

import { CronJob } from "cron";
import ordenes from "./crearOrdenes/ordenes";
import estadosRoutes from "./routes/Estados/estadosRoutes";
import periodicidadRoutes from "./routes/Periodicidad/periodicidadRoutes";
import gastoMaterialRoutes from "./routes/GastoMaterial/gastoMaterialRoutes";

class Server {
  public app: Application;
  hoy: Date = new Date();

  cronJob: CronJob;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    //Se crea un cronjob con hora 06:00

    this.cronJob = new CronJob("1 8/24 * * *", async () => {
      try {
        //Cada día a la misma hora se ejecutará
        await this.ejecucion();
      } catch (e) {
        console.error(e);
        console.log("ERROR");
      }
    });
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3011);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use("/planta", plantaRoutes);
    this.app.use("/area", areaRoutes);
    this.app.use("/zona", zonaRoutes);
    this.app.use("/seccion", seccionRoutes);
    this.app.use("/codigo", codigoRoutes);
    this.app.use("/grupo", grupoRoutes);
    this.app.use("/equipo", equipoRoutes);
    this.app.use("/ubicaciontecnica", ubicacionRoutes);
    this.app.use("/prioridad", prioridadRouters);
    this.app.use("/utpreventivo", utpreventivoRoutes);
    this.app.use("/preventivo", preventivoRoutes);
    this.app.use("/ordendetrabajo", ordendetrabajoRoutes);
    this.app.use("/material", materialesRoutes);
    this.app.use("/gastomaterial", gastoMaterialRoutes);
    this.app.use("/estado", estadosRoutes);
    this.app.use("/tarea", tareasRoutes);
    this.app.use("/encabezado", encabezadoRoutes);
    this.app.use("/operario", operarioRoutes);
    this.app.use("/periodicidad", periodicidadRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port ", this.app.get("port"));
    });
  }
  async ejecucion() {
    try {
      
      //Obtiene los preventivos
      const preventivos = await ordenes.obtenerPreventivos();
      console.log ('salto')
      //Recorre los preventivos
      for (let i = 0; i < preventivos.length; i++) {
        let preventivoId = preventivos[i].UtPrevId;
        //Por cada preventivo se obtiene la fecha validado de la orden de trabajo asociada si la tuviera o su fecha de inicio
        let fechas = await ordenes.obtenerFechas(preventivoId);

        let fecha!: Date;
        if (fechas.hasOwnProperty("FechaValidado")) {
          if (fechas.FechaValidado !== null) {
            fecha = new Date(fechas.FechaValidado);
            fecha.setDate(fecha.getDate() + fechas.Dias);
            //La OT estará VALIDADA y se utilizará la fecha
          } else {
            //Aquí la OT estará abierta sin VALIDAR
            continue;
          }
        } else if (fechas.hasOwnProperty("FechaInicio")) {
          if (fechas.FechaInicio !== null) {
            fecha = new Date(fechas.FechaInicio);
            //El preventivo tiene fecha de inicio
          } else {
            //El preventivo no tendrá feha de inicio
            continue;
          }
        }
        this.hoy.setHours(0, 0, 0, 0);
        fecha.setHours(0, 0, 0, 0);

        console.log('TODAS',fecha)

        if (fecha.getTime() <= this.hoy.getTime()) {
          console.log("entra")
          console.log ("entra", this.hoy.getTime)
          //Si la fecha del preventivo es hoy tendrá que crear OT
          let id = await ordenes.crearOT(preventivoId);
          await ordenes.asociarPreventivoAOT(preventivoId, id.id);
          await ordenes.crearTareasDeOt(id.id);
          console.log('Creadas OTS ',this.hoy.getDay());
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
const server = new Server();
server.start();
