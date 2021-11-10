'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Comment.belongsTo(models.User, { foreignKey: 'userId' })
      
      models.Comment.hasMany(models.Message, { foreignKey: 'messageId' })
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    messageId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  })
  return Comment
}