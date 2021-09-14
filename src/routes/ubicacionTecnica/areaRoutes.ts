import { Router } from 'express';
import areaController from '../../controllers/ubicacionTecnica/areaController';

class AreaRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', areaController.selectAllAreas);
        this.router.get('/:plantaid', areaController.selectAreas);
        this.router.get('/:plantaid/:areaid', areaController.selectOne);
        this.router.post('/', areaController.addArea);
        this.router.put('/:plantaid/:areaid', areaController.updateArea);
        this.router.delete('/:plantaid/:areaid', areaController.deleteArea);
    }
}
const areaRoutes = new AreaRoutes();
export default areaRoutes.router;