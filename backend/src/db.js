import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,       // Render Postgres needs SSL
        rejectUnauthorized: false // allow self-signed certs
      }
    }
  }
);

sequelize.sync({ force: true })
  .then(() => console.log("✅ Tables recreated"))
  .catch(err => console.error("❌ Error syncing DB:", err));

export default sequelize;
