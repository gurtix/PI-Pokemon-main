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
  },
  {timestamps: false}  
  );
  const Stat = require('./Stats')(sequelize, DataTypes);

  Pokemon.hasMany(Stat);
  Stat.belongsTo(Pokemon);

  return Pokemon;
};

