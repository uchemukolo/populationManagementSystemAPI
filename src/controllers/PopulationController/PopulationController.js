import models from '../../models';
import CustomError from '../../helpers/errorHandler';

export default class PopulationController {
  static home(req, res) {
    res.status(200).send('Welcome to Population Management Application');
  }

  static async createLocation(req, res) {
    try {
        const { location, malePopulation, femalePopulation } = req.body;

          const foundLocation = await models.PopulationManagement.findOne({
            where: { location }
          });

          if(foundLocation){
            CustomError.handleError('Location already exists', 409, res);
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
            return res.status(201).json({
                success: true,
                message: 'Location created successfully',
                location: createdLocation
            });
        }
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}

static async getLocations(req, res) {
    try {
         const locations = await models.PopulationManagement.findAll({
            order: [
              ['createdAt', 'DESC']
            ]
        });
         if (locations.length < 1) {
          CustomError.handleError('No location found', 404, res);
        }

         return res.status(200).json({
            success: true,
            message: 'Locations found',
            locations: locations,
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}

static async updateLocation(req, res) {
    try {
        const { location, malePopulation, femalePopulation } = req.body;
        const { locationId } = req.params;

        const foundLocation = await models.PopulationManagement.findOne({
          where: { id: locationId }
        });

        const totalPopulation = parseInt(malePopulation, 10) + parseInt(femalePopulation, 10);

        if (!foundLocation) {
          return res.status(400).json({
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

         return res.status(200).json({
            success: true,
            message: 'Location Successfully updated',
            location: updatedLocation
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}


static async deleteLocation(req, res) {
    try {

        const { locationId } = req.params;
        const foundLocation = await models.PopulationManagement.findOne({
          where: { id: locationId }
        });

        if (!foundLocation) {
          return res.status(400).json({
            success: false,
            message: 'The location does not exist'
          });
        }

         await foundLocation.destroy();

         return res.status(200).json({
            success: true,
            message: 'Location deleted successfully',
        });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
}

}
