import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../postgres';

// Define the User model
const UserModel = sequelize.define('User', {
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
    await UserModel.sync();
    console.log('User model synchronized with the database.');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
})();

export default UserModel

export type User = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

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