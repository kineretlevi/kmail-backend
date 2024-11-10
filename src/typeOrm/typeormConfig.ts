import { DataSource } from "typeorm"
import { User } from "../models/User.model"
import { Contacts } from "../models/Contacts.model"
import { Email } from "../models/Email.model"
import { AttachedFiles } from "../models/AttachedFiles.model"
import * as dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USER_NAME || ""
const PASSWORD = process.env.DB_PASSWORD || ""
const DATABASE = process.env.DB_DATABASE || ""

// Define and connect our pg db
const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    entities: [
        User,
        Contacts,
        Email,
        AttachedFiles
    ],
    // In first run uncomment those
    // synchronize: true,
    // dropSchema: true,
})

// Initialize our pg DB
PostgresDataSource.initialize()
    .then(() => {
        console.log("Postgres data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Postgres Data Source initialization", err)
    })

export default PostgresDataSource;