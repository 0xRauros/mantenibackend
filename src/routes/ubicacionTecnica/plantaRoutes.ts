import { Router } from 'express';
import plantaController from '../../controllers/ubicacionTecnica/plantaController';

class PlantaRoutes{

    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', plantaController.selectAll);
    }
}
const plantaRoutes = new PlantaRoutes();
export default plantaRoutes.router;