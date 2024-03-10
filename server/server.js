import express from 'express';
import cors from 'cors';
import corsOptions from './src/config/corsOptions.js';
import { } from 'dotenv/config';
import cookieParser from 'cookie-parser';
import { verifyJWT } from './src/middlewares/verifyJWT.middleware.js';
import connectDB from "./src/config/dbConn.js";
import credentials from "./src/middlewares/credentials.js"
import registerRouter from "./src/routes/register.js";
import authRouter from "./src/routes/auth.js";
import refreshRouter from "./src/routes/refresh.js";
import logoutRouter from "./src/routes/logout.js";
import usersRouter from "./src/routes/api/users.js";
import { logger } from './src/middlewares/logEvents.js';
import errorHandler from './src/middlewares/errorHandler.js';

const PORT = process.env.PORT || 8080;
const app = express();


app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/register', registerRouter); // change from userSignUp at front
app.use('/auth', authRouter); // change from userSignIn at front
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(verifyJWT);
app.use('/users', usersRouter);

//app.use('/route', router);

app.all('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler); //!!!check 


const connection = async () => {
    connectDB();
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
}
connection().catch(err => console.log(err.message));