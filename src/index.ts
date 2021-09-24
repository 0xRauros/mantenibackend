import express,  {Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import plantaRoutes from './routes/ubicacionTecnica/plantaRoutes';
import areaRoutes from './routes/ubicacionTecnica/areaRoutes'
import zonaRoutes from './routes/ubicacionTecnica/zonaRoutes'
import seccionRoutes from './routes/ubicacionTecnica/seccionRoutes'
import codigoRoutes from './routes/ubicacionTecnica/codigoRoutes'
import grupoRoutes from './routes/ubicacionTecnica/grupoRoutes'
import equipoRoutes from './routes/ubicacionTecnica/equipoRoutes'
import utpreventivoRoutes from './routes/UT_Preventivo/utpreventivoRoutes'
import preventivoRoutes from './routes/preventivo/preventivoRoutes'
import ordendetrabajoRoutes from './routes/OrdenDeTrabajo/ordendetrabajoRoutes'
import tareasRoutes from './routes/Tareas/tareasRoutes'
import ubicacionRoutes from './routes/ubicacionTecnica/ubicacionRoutes';
import encabezadoRoutes from './routes/Encabezado/encabezadoRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void {
        this.app.use('/planta', plantaRoutes);
        this.app.use('/area', areaRoutes);
        this.app.use('/zona', zonaRoutes);
        this.app.use('/seccion', seccionRoutes);
        this.app.use('/codigo', codigoRoutes);
        this.app.use('/grupo', grupoRoutes);
        this.app.use('/equipo', equipoRoutes);
        this.app.use('/ubicaciontecnica', ubicacionRoutes);

        this.app.use('/utpreventivo', utpreventivoRoutes);
        this.app.use('/preventivo', preventivoRoutes);
        this.app.use('/ordendetrabajo', ordendetrabajoRoutes);

        this.app.use('/tarea', tareasRoutes);

        this.app.use('/encabezado', encabezadoRoutes)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'))
        });
    }

}
const server = new Server();
server.start();


