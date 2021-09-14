import { Router } from 'express';
import seccionController from '../../controllers/ubicacionTecnica/seccionController';

class SeccionRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', seccionController.selectAllSecciones);
        this.router.get('/:zonaid', seccionController.selectSecciones);
        this.router.get('/:zonaid/:seccionid', seccionController.selectOne)
        this.router.post('/', seccionController.addSeccion);
        this.router.put('/:zonaid/:seccionid', seccionController.updateSeccion);
        this.router.delete('/:zonaid/:seccionid', seccionController.deleteSeccion);
    }
}
const seccionRoutes = new SeccionRoutes();
export default seccionRoutes.router;