import { Router } from 'express';
import { validateRequestBody, validateRequestParams } from '../middlewares/validations.middleware.js';
import { loginSchema, registrationSchema, userIdSchema } from '../controllers/users.schema.js';
import registrationController from '../controllers/registration.controller.js';
import User from '../models/user.model.js';

const usersRouter = Router();

usersRouter.get('/', async (_, res) => {
    try {
        const allUsers = await User.find().select("-createdAt -updatedAt -password").exec();
        res.status(200).json({
            success: true,
            data: allUsers
        });
    } catch (error) {
        res.json({
          success: false,
          error,
        });
    }
});

usersRouter.post('/registration', validateRequestBody(registrationSchema), registrationController);

usersRouter.get('/:userId', validateRequestParams(userIdSchema), async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({ "_id": userId}).select("email isEmailVerified accountStatus").exec();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.json({
          success: false,
          error,
        });
    }
});

// usersRouter.post('/login', validateRequestBody(loginSchema), async (req, res) => {
//     res.send('Login route');
// });

usersRouter.post('/verify/:code', async (req, res) => {
    res.send('Account verification route');
});

usersRouter.post('/password/forgot', async (req, res) => {
    res.send('Forgot passpord route');
});

usersRouter.post('/password/reset', async (req, res) => {
    res.send('Reset passpord route');
});

usersRouter.post('/logout', async (req, res) => {
    res.send('Logout route');
});

export default usersRouter;