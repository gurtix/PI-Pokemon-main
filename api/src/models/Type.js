const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  const Type = sequelize.define('type', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique:true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false}
  );
  return Type;
};