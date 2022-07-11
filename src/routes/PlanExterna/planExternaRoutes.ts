import { Router } from "express";
import planExternaController from "../../controllers/PlanExterna/planExternaController";

class PlanExternaRoutes {

    public router:Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', planExternaController.getAllPlanExternas);
        this.router.get('/relacion', planExternaController.getAllPlanExternasRelacionadas);
        this.router.post('/', planExternaController.addPlanExterna);
        this.router.put('/:id', planExternaController.updatePlanExterna);
        this.router.delete('/:id', planExternaController.deletePlanExterna);
    }

}

const planExternaRoutes = new PlanExternaRoutes();
export default planExternaRoutes.router;