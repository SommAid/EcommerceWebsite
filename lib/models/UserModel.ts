import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../postgres';

// Define the User model
const UserModel = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
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
