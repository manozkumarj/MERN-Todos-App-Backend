import express from 'express';
import cors from 'cors';
import { PORT } from './utils/constants.js';
import connectToDatabase from './config/db.js';
import usersRouter from './routes/users.route.js';
import todosRouter from './routes/todos.route.js';
import { errorHandler } from './utils/errorHandler.js';
import authRouter from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import refreshTokenRouter from './routes/refreshToken.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// corsOptions
// const corsOptions = {
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
//     credentials: true, // Enable credentials (cookies, authorization headers, etc)
// };

// cors
app.use(cors());

//middleware for cookies
app.use(cookieParser());

// health check
app.get('/health', (_, res) => {
    res.send('Hello world...! from health check route');
});

// auth routes
app.use('/api/v1/auth', authRouter);

// users routes
app.use('/api/v1/users', usersRouter);

// refresh token route
app.use("/api/v1/refresh", refreshTokenRouter);

// todos routes
app.use('/api/v1/todos', todosRouter);

// app.all('*', (req, res) => {
//     res.status(404);
//     res.json({ "error": "404 Not Found" });
// });

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    await connectToDatabase();
});