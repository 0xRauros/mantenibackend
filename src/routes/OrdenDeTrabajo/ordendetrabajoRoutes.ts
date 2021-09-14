import { Router } from 'express';
import ordendetrabajoController from '../../controllers/OrdenDeTrabajo/ordendetrabajoController';

class OrdenDeTrabajoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', ordendetrabajoController.selectAllOrdenDeTrabajo);
        this.router.get('/ordenpreventiva/:planta', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorPlanta);
        this.router.get('/ordenpreventiva/:planta/:area', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorArea);
        this.router.get('/ordenpreventiva/:planta/:area/:zona', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorZona);
        this.router.get('/ordenpreventiva/:planta/:area/:zona/:seccion', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorSeccion);
        this.router.get('/ordenpreventiva/:planta/:area/:zona/:seccion/:codigo', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorCodigo);
        this.router.get('/ordenpreventiva/:planta/:area/:zona/:seccion/:codigo/:grupo', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorGrupo);
        this.router.get('/ordenpreventiva/:planta/:area/:zona/:seccion/:codigo/:grupo/:equipo', ordendetrabajoController.selectOrdenDeTrabajoPreventivaPorEquipo);
        // this.router.get('/ordencorrectica/:planta', ordendetrabajoController.selectOrdenDeTrabajoPorPlanta);
        // this.router.get('/ordencorrectica/:planta/:area', ordendetrabajoController.selectOrdenDeTrabajoPorArea);
        // this.router.get('/ordencorrectica/:planta/:area/:zona', ordendetrabajoController.selectOrdenDeTrabajoPorZona);
        // this.router.get('/ordencorrectica/:planta/:area/:zona/:seccion', ordendetrabajoController.selectOrdenDeTrabajoPorSeccion);
        // this.router.get('/ordencorrectica/:planta/:area/:zona/:seccion/:codigo', ordendetrabajoController.selectOrdenDeTrabajoPorCodigo);
        // this.router.get('/ordencorrectica/:planta/:area/:zona/:seccion/:codigo/:grupo', ordendetrabajoController.selectOrdenDeTrabajoPorGrupo);
        // this.router.get('/ordencorrectica/:planta/:area/:zona/:seccion/:codigo/:grupo/:equipo', ordendetrabajoController.selectOrdenDeTrabajoPorEquipo);
        this.router.get('/preventivo/:preventivoid', ordendetrabajoController.selectOrdenDeTrabajoPorPreventivo);
        this.router.post('/ordenpreventiva', ordendetrabajoController.addOrdenDeTrabajoPreventiva);
        this.router.post('/ordencorrectiva', ordendetrabajoController.addOrdenDeTrabajoCorrectiva);
        this.router.put('/pendiente/:ordenid', ordendetrabajoController.updateOrdenDeTrabajoAPendiente);
        this.router.put('/terminada/:ordenid', ordendetrabajoController.updateOrdenDeTrabajoATerminada);
        this.router.delete('/ordendetrabajo/:ordenid', ordendetrabajoController.deleteOrdenDeTrabajo);
    }
}
const ordendetrabajoRoutes = new OrdenDeTrabajoRoutes();
export default ordendetrabajoRoutes.router;