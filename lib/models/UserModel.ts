import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../postgres';

// Define the User model
const UserModel = sequelize.define('User', {
  _id: {
    type: DataTypes.UUID, // Assuming _id is a UUID
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true, // Enable timestamps (createdAt and updatedAt)
});

// Sync the model with the database (create the table if it doesn't exist)
(async () => {
  try {
    await sequelize.sync();
    console.log('User model synchronized with the database.');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
})();

export default UserModel;


// import sequelize from "../postgres";
// const {  Sequelize } = require('sequelize');


// const UserSchema = sequelize.define('UserSchema',{
//     name: {type: Sequelize.STRING, allowNull: false},
//     email: {type: Sequelize.STRING, allowNull: false, unique:true},
//     password: {type: Sequelize.STRING, allowNull: false},
//     isAdmin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
// },
// { timestamps: true }
// )

// const UserModel = sequelize.models?.User || sequelize.model('UserSchema')

// export default UserModel