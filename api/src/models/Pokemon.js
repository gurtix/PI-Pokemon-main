const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Pokemon = sequelize.define('pokemon', {
    idPokemon:{
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

