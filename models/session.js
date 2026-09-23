'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Sport, {
        foreignKey: 'sportId'
      });

      Session.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });

      Session.hasMany(models.SessionPlayer, {
        foreignKey: 'sessionId'
      }); 
    }
  }
  Session.init({
    sportId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    maxPlayers: DataTypes.INTEGER,
    team1Players: DataTypes.TEXT,
    team2Players: DataTypes.TEXT,
    additionalPlayers: DataTypes.INTEGER,
    status: DataTypes.STRING,
    venue: DataTypes.STRING,
    cancelReason: DataTypes.STRING,
    cancelledAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};