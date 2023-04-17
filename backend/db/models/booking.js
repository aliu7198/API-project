"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Spots'},
        onDelete: 'CASCADE'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users'},
        onDelete: 'CASCADE'
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterToday(value) {
            if (new Date(value) < new Date()) {
              throw new Error('Booking must start on a future date');
            }
          },
          isBeforeEndDate(value) {
            if (new Date(value) < new Date(this.endDate)) {
              throw new Error('Start date cannot come after end date');
            }
          }
        }
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterToday(value) {
            if (new Date(value) < new Date()) {
              throw new Error('Booking must end on a future date');
            }
          },
          isAfterStartDate(value) {
            if (new Date(value) < new Date(this.startDate)) {
              throw new Error('End date cannot come before start date');
            }
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
