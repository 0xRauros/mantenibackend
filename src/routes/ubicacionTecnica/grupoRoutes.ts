import { Router } from 'express';
import grupoController from '../../controllers/ubicacionTecnica/grupoController';

class GrupoRoutes{
    public router:Router = Router();

    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', grupoController.selectAllGrupos);
        this.router.get('/:codigoid', grupoController.selectGrupos);
        this.router.get('/:codigoid/:grupoid', grupoController.selectOne)
        this.router.post('/', grupoController.addGrupo);
        this.router.put('/:codigoid/:grupoid', grupoController.updateGrupo);
        this.router.delete('/:codigoid/:grupoid', grupoController.deleteGrupo);
    }
}
const grupoRoutes = new GrupoRoutes();
export default grupoRoutes.router;