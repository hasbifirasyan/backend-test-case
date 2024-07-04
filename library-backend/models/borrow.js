"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.belongsTo(models.Member, {
        foreignKey: "memberId"
      });
      Borrow.belongsTo(models.Book, {
        foreignKey: "bookId"
      });
    }
  }
  Borrow.init(
    {
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Members",
          key: "id",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Member ID is required",
          },
          notEmpty: {
            args: true,
            msg: "Member ID is required",
          },
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Books",
          key: "id",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Book ID is required",
          },
          notEmpty: {
            args: true,
            msg: "Book ID is required",
          },
          isBorrowed(value) {
            Borrow.findOne({
              where: {
                bookId: value,
                returnDate: null,
              },
            }).then((borrow) => {
              if (borrow) {
                throw new Error("Book is already borrowed");
              }
            });
          },
        },
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          notNull: {
            args: true,
            msg: "Borrow date is required",
          },
          notEmpty: {
            args: true,
            msg: "Borrow date is required",
          },
        },
      },
      returnDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Borrow",
    }
  );
  return Borrow;
};
