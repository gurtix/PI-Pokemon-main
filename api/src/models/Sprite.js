const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sprites', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false}
  );
};