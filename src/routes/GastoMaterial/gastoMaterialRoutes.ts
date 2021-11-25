import { Router } from 'express';
import gastoMaterialController from '../../controllers/GastoMaterial/gastoMaterialController';

class GastoMaterialRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){

        this.router.get('/', gastoMaterialController.getGastoMaterial)    
        this.router.put('/', gastoMaterialController.updateGastoMaterial);    

        //Para ordenes de trabajo
        this.router.get('/:ordenid', gastoMaterialController.getGastoMaterialDeOrden)        
        this.router.delete('/:gastoid', gastoMaterialController.deleteGastoMaterial)
        this.router.post('/:ordenid', gastoMaterialController.addGastoMaterial); 
    }
}
const gastoMaterialRoutes = new GastoMaterialRoutes();
export default gastoMaterialRoutes.router;