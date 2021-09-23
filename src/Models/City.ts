import { Sequelize } from "sequelize";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Instances/pg";

export interface CityInstance extends Model {
  id: number;
  city: string;
  country: string;
  sum: number;
  createdAt: Date;
  updatedAt: Date;
}

const time = Date.now();

export const City = sequelize.define<CityInstance>(
  "City",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    sum: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE(6),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

    },
    updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE(6),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

    },
  },
  {
    tableName: "cities",
    timestamps: true,
  }
);
