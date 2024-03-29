const { DataTypes, INTEGER } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  const Detail = sequelize.define('detail', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },    
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique:true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    }, 
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    abilities: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sprites: {
      type: DataTypes.JSON, 
      allowNull: true,
    }, 
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {timestamps: false}  
  );
};