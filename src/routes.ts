import { Router } from "express";
import * as ApiController from './Controllers/ApiController'

const router = Router();


/* router.post('/city', ApiController.createCity);
router.get('/city', ApiController.listCities); */
router.get('/city/mostSought', ApiController.mostSought);
router.get('/city/latestResearch', ApiController.latestResearch);
router.post('/city/find', ApiController.findAndCreate);

/* router.get('/city/:id', ApiController.getCity);
router.put('/city/:id', ApiController.updateCities);
router.delete('/city/:id', ApiController.deleteCities); */


export default router;