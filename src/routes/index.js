import express from 'express';
import PopulationController from '../controllers/PopulationController/PopulationController';
import PopulationValidator from '../middlewares/PopulationValidator';

const Router = express.Router();

Router.get(
  '/',
  PopulationController.home,
);

Router.get(
  '/locations',
  PopulationController.getLocations,
);

Router.post(
  '/locations',
  PopulationValidator.checkFields,
  PopulationController.createLocation,
);

Router.put(
  '/locations/:locationId',
  PopulationValidator.checkParam,
  PopulationValidator.checkFields,
  PopulationController.updateLocation,
);

Router.delete(
  '/locations/:locationId',
  PopulationValidator.checkParam,
  PopulationController.deleteLocation,
);

export default Router;
