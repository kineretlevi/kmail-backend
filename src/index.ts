import express, { Request, Response } from 'express';
import "reflect-metadata";
import * as dotenv from 'dotenv';
import PostgresDataSource from './typeOrm/typeormConfig';
import contactRouter from './routes/contacts.router';
import emailsRouter from './routes/emails.router';

dotenv.config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use("/api", contactRouter);
app.use("/api", emailsRouter);


// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

// Connect to the database and start the server
PostgresDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Error starting server: ", err);
});
