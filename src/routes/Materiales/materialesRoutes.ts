import { Router } from 'express';
import materialController from '../../controllers/Materiales/materialController';

class MaterialesRoutes{
    public router:Router = Router();

    constructor(){
        this.config();

    }
    config(){        
        this.router.get('/', materialController.selectMateriales); 
        this.router.post('/', materialController.addMaterial)
        this.router.put('/:matid',materialController.updateMaterial)
        this.router.delete('/:matid', materialController.deleteMaterial)


        //OrdenDeTrabajo
        this.router.get('/ordendetrabajo/:ordenid', materialController.getMaterialDeOrden); 
        this.router.delete('/ordendetrabajo/:gastoid', materialController.deleteMaterialDeOrden); 
        this.router.post('/ordendetrabajo/:ordenid', materialController.addMaterialAOT); 


    }
}
const materialesRoutes = new MaterialesRoutes();
export default materialesRoutes.router;