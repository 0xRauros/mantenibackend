import { Router } from 'express';
import zonaController from '../../controllers/ubicacionTecnica/zonaController';

class ZonaRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', zonaController.selectAllZonas);
        this.router.get('/:areaid', zonaController.selectZonas);
        this.router.get('/:areaid/:zonaid', zonaController.selectOne);
        this.router.post('/', zonaController.addZona);
        this.router.put('/:areaid/:zonaid', zonaController.updateZona);
        this.router.delete('/:areaid/:zonaid', zonaController.deleteZona);
    }
}
export default new ZonaRoutes().router;