import { Router } from 'express';
import ordendetrabajoController from '../../controllers/OrdenDeTrabajo/ordendetrabajoController';

class OrdenDeTrabajoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){

        //Preventivo

        this.router.get('/preventivo', ordendetrabajoController.getPreventivos)
        this.router.get('/preventivo/planificada', ordendetrabajoController.selectPreventivoPlanificada);
        this.router.get('/preventivo/pendiente', ordendetrabajoController.selectPreventivoPendiente);        
        this.router.get('/preventivo/terminada', ordendetrabajoController.selectPreventivoTerminada);
        this.router.get('/preventivo/validada', ordendetrabajoController.selectPreventivoValidada);
 
        //Correctivo
        this.router.post('/correctivo',ordendetrabajoController.crearCorrectivo)
        this.router.get('/correctivo', ordendetrabajoController.getCorrectivos)

        //General
        this.router.put('/preventivo/planificada/:ordenid', ordendetrabajoController.updatePlanificada);
        this.router.put('/preventivo/pendiente/:ordenid', ordendetrabajoController.updatePendiente);
        this.router.put('/preventivo/terminada/:ordenid', ordendetrabajoController.updateTerminada);        
        this.router.get('/:ordenid', ordendetrabajoController.selectOrden);        
        this.router.put('/preventivo/ordendetrabajo/:ordenid', ordendetrabajoController.updateOrden);
        this.router.get('/tipo/:tipoid',ordendetrabajoController.getOrdenes )
        this.router.put('/:ordenid', ordendetrabajoController.updateOrdenDeTrabajo)
        this.router.delete('/:ordenid', ordendetrabajoController.deleteOrden)
    }
}
const ordendetrabajoRoutes = new OrdenDeTrabajoRoutes();
export default ordendetrabajoRoutes.router;