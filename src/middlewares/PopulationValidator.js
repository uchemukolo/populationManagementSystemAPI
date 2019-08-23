import models from '../models';
import CustomError from '../helpers/errorHandler';

export default class PopulationValidator {
  static checkFields(request, response, next) {
    const { location, malePopulation, femalePopulation } = request.body;
    console.log(request.body, location, malePopulation, femalePopulation);
    if (!location || !malePopulation || !femalePopulation) {
      CustomError.handleError('Invalid Payloads', 400, response);
    }
    else {
      next();
    }

  }

  static checkParam(request, response, next) {
    const { locationId } = request.params;
    if (!Number(locationId)) {
      CustomError.handleError('Invalid location id parameter', 400, response);
    }
    else {
      next();
    }
  }
}
