import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Contacts } from "./entities/Contacts"
import { Email } from "./entities/Email"
import { AttachedFiles } from "./entities/AttachedFiles"
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
    synchronize: true,
    dropSchema: true,
})

// Initialize our pg db
PostgresDataSource.initialize()
    .then(() => {
        console.log("Postgres data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Postgres Data Source initialization", err)
    })

export default PostgresDataSource;