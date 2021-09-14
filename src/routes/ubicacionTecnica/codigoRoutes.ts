import { Router } from 'express';
import codigoController from '../../controllers/ubicacionTecnica/codigoController';

class CodigoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', codigoController.selectAllCodigos);
        this.router.get('/:seccionid', codigoController.selectCodigos);
        this.router.get('/:seccionid/:codigoid', codigoController.selectOne)
        this.router.post('/', codigoController.addSeccion);
        this.router.put('/:seccionid/:codigoid', codigoController.updateSeccion);
        this.router.delete('/:seccionid/:codigoid', codigoController.deleteSeccion);
    }
}
const codigoRoutes = new CodigoRoutes();
export default codigoRoutes.router;