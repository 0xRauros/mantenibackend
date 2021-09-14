import { Router } from 'express';
import tareasController from '../../controllers/Tareas/tareasController';

class TareasRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', tareasController.selectAllTareas);
        this.router.get('/preventivo/:preventivoid', tareasController.selectAllTareasPreventivo);
        this.router.post('/tarea', tareasController.insertTarea);
        this.router.post('/tarea/preventivo', tareasController.insertTareaPrev);
        this.router.delete('/tarea/:tareaid', tareasController.deleteTarea);
        this.router.delete('/tarea/:preventivoid/:tareaid', tareasController.deleteTareaPrev);
        this.router.put('/tarea/:tareaid', tareasController.updateTarea);
    }
}
const tareasRoutes = new TareasRoutes();
export default tareasRoutes.router;