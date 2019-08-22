'use strict';
module.exports = (sequelize, DataTypes) => {
  const PopulationManagement = sequelize.define('PopulationManagement', {
    location: DataTypes.STRING,
    male_population: DataTypes.INTEGER,
    female_population: DataTypes.INTEGER,
    total_population: DataTypes.INTEGER
  }, {});
  PopulationManagement.associate = function(models) {
    // associations can be defined here
  };
  return PopulationManagement;
};