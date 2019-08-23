import models from '../models';
import CustomError from '../helpers/errorHandler';

export default class PopulationValidator {
  static checkFields(req, res, next) {
    const { location, malePopulation, femalePopulation } = req.body;
    console.log(req.body,location, malePopulation, femalePopulation);
    if (!location || !malePopulation || !femalePopulation) {
      CustomError.handleError('Invalid Payloads', 400, res);
    }
    else{
      next();
    }

  }

  static checkParam(req, res, next) {
    const { locationId } = req.params;
    if (!Number(locationId)) {
      CustomError.handleError('Invalid location id parameter', 400, res);
    }
    else{
      next();
    }
  }
}
