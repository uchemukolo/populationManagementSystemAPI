import models from '../../models';
import CustomError from '../../helpers/errorHandler';

export default class PopulationController {

  static async createLocation(request, response) {
    try {
      const { location, malePopulation, femalePopulation } = request.body;

      const foundLocation = await models.PopulationManagement.findOne({
        where: { location }
      });

      if (foundLocation) {
        CustomError.handleError('Location already exists', 409, response);
        return;
      }

      const totalPopulation = parseInt(malePopulation, 10) + parseInt(femalePopulation, 10);

      const createdLocation = await models.PopulationManagement.create({
        location,
        male_population: malePopulation,
        female_population: femalePopulation,
        total_population: totalPopulation,
      });

      if (createdLocation) {
        return response.status(201).json({
          success: true,
          message: 'Location created successfully',
          location: createdLocation
        });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  static async getLocations(request, response) {
    try {
      const locations = await models.PopulationManagement.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      });
      if (locations.length < 1) {
        CustomError.handleError('No location found', 404, response);
      }

      return response.status(200).json({
        success: true,
        message: 'Locations found',
        locations: locations,
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

  static async updateLocation(request, response) {
    try {
      const { location, malePopulation, femalePopulation } = request.body;
      const { locationId } = request.params;

      const foundLocation = await models.PopulationManagement.findOne({
        where: { id: locationId }
      });

      const totalPopulation = parseInt(malePopulation, 10) + parseInt(femalePopulation, 10);

      if (!foundLocation) {
        return response.status(400).json({
          success: false,
          message: 'The location does not exist'
        });
      }

      const updatedLocation = await foundLocation.update({
        location,
        male_population: malePopulation,
        female_population: femalePopulation,
        total_population: totalPopulation,
      });

      return response.status(200).json({
        success: true,
        message: 'Location Successfully updated',
        location: updatedLocation
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }


  static async deleteLocation(request, response) {
    try {

      const { locationId } = request.params;
      const foundLocation = await models.PopulationManagement.findOne({
        where: { id: locationId }
      });

      if (!foundLocation) {
        return response.status(400).json({
          success: false,
          message: 'The location does not exist'
        });
      }

      await foundLocation.destroy();

      return response.status(200).json({
        success: true,
        message: 'Location deleted successfully',
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, response);
    }
  }

}
