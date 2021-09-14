import { Router } from 'express';
import preventivoController from '../../controllers/preventivo/preventivoController';

class PreventivoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', preventivoController.selectAllPreventivos);
        this.router.get('/:preventivoid', preventivoController.selectOne);
        this.router.post('/', preventivoController.addPreventivo);
        this.router.put('/:preventivoid', preventivoController.updatePreventivo);
        this.router.delete('/:preventivoid', preventivoController.deletePreventivo);
    }
}
const preventivoRoutes = new PreventivoRoutes();
export default preventivoRoutes.router;