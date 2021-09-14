import { Router } from 'express';
import equipoController from '../../controllers/ubicacionTecnica/equipoController';

class EquipoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', equipoController.selectAllEquipos);
        this.router.get('/:grupoid', equipoController.selectEquipos);
        this.router.get('/:grupoid/:equipoid', equipoController.selectOne);
        this.router.post('/', equipoController.addEquipo);
        this.router.put('/:grupoid/:equipoid', equipoController.updateEquipo);
        this.router.delete('/:grupoid/:equipoid', equipoController.deleteEquipo);
    }
}
const equipoRoutes = new EquipoRoutes();
export default equipoRoutes.router;