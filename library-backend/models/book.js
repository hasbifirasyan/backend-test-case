'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Borrow, {foreignKey: 'bookId', as: 'borrows'})
    }
  }
  Book.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Code is required'
        },
        notEmpty: {
          args: true,
          msg: 'Code is required'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title is required'
        },
        notEmpty: {
          args: true,
          msg: 'Title is required'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Author is required'
        },
        notEmpty: {
          args: true,
          msg: 'Author is required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        isInt: {
          args: true,
          msg: 'Stock must be an integer'
        },
        min: {
          args: [0],
          msg: 'Stock must be greater or equal to 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};