
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      models.Like.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message'
      })
    }
  }
  Like.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },

  }, {
    sequelize,
    modelName: 'Like',
  })
  return Like
}