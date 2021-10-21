import { Router } from 'express';
import utpreventivoController from '../../controllers/UT_Preventivo/utpreventivoController';

class UTPreventivosRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.post('/preventivos', utpreventivoController.selectAllUtPreventivos);
        this.router.post('/', utpreventivoController.addUtPreventivo);
        this.router.get('/comprobarfin/:utprevid', utpreventivoController.comprobarOTFin)
        this.router.put('/:utprevid', utpreventivoController.updatePreventivo)
        // this.router.get('/', utpreventivoController.selectAllUtPreventivos);
        // this.router.get('/planta/:planta', utpreventivoController.selectUtPreventivosPorPlanta);
        // this.router.get('/planta/:planta/:area', utpreventivoController.selectUtPreventivosPorArea);
        // this.router.get('/planta/:planta/:area/:zona', utpreventivoController.selectUtPreventivosPorZona);
        // this.router.get('/planta/:planta/:area/:zona/:seccion', utpreventivoController.selectUtPreventivosPorSeccion);
        // this.router.get('/planta/:planta/:area/:zona/:seccion/:codigo', utpreventivoController.selectUtPreventivosPorCodigo);
        // this.router.get('/planta/:planta/:area/:zona/:seccion/:codigo/:grupo', utpreventivoController.selectUtPreventivosPorGrupo);
        // this.router.get('/planta/:planta/:area/:zona/:seccion/:codigo/:grupo/:equipo', utpreventivoController.selectUtPreventivosPorEquipo);
        // this.router.get('/preventivo/:preventivoid', utpreventivoController.selectUtPreventivosPorPreventivo);
        // this.router.post('/', utpreventivoController.addUtPreventivo);
        // this.router.put('/:utprevid', utpreventivoController.updatePreventivo);
        // this.router.delete('/:utprevid', utpreventivoController.deleteUtPreventivo);
    }
}
const utpreventivosRoutes = new UTPreventivosRoutes();
export default utpreventivosRoutes.router;