'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Task.init(
    {
      body: {
        field: 'body',
        allowNull: false,
        type: DataTypes.STRING(400),
        validate: {
          notNull: true,
          notEmpty: true,
          len: [1, 400],
        },
      },
      isDone: {
        field: 'is_done',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      deadline: {
        field: 'deadline',
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true,
          isValidDate: value => {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('Bad date!');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      underscored: true,
      tableName: 'tasks',
    }
  );
  return Task;
};
