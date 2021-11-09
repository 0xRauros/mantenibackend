import { Router } from 'express';
import ordendetrabajoController from '../../controllers/OrdenDeTrabajo/ordendetrabajoController';

class OrdenDeTrabajoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/preventivo/datos/:ordenid', ordendetrabajoController.selectOrdenPreventiva); 
        this.router.get('/preventivo/planificada', ordendetrabajoController.selectPreventivoPlanificada);
        this.router.put('/preventivo/planificada/:ordenid', ordendetrabajoController.updatePlanificada);
        this.router.get('/preventivo/pendiente', ordendetrabajoController.selectPreventivoPendiente);        
        this.router.put('/preventivo/pendiente/:ordenid', ordendetrabajoController.updatePendiente);
        this.router.get('/preventivo/terminada', ordendetrabajoController.selectPreventivoTerminada);
        this.router.put('/preventivo/terminada/:ordenid', ordendetrabajoController.updateTerminada);
        this.router.get('/preventivo/validada', ordendetrabajoController.selectPreventivoValidada);
        this.router.put('/preventivo/ordendetrabajo/:ordenid', ordendetrabajoController.updateOrden);
    }
}
const ordendetrabajoRoutes = new OrdenDeTrabajoRoutes();
export default ordendetrabajoRoutes.router;