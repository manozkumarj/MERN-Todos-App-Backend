import { Router } from 'express';

const todosRouter = Router();

todosRouter.get('/', async (req, res) => {
    res.send('All users Todos route');
});

todosRouter.get('/user/:userId', async (req, res) => {
    res.send('Specific user Todos route');
});

todosRouter.post('/user/:userId', async (req, res) => {
    res.send('Add Todo to a specific user route');
});

todosRouter.put('/user/:userId/:todoId', async (req, res) => {
    res.send('Update Specific user Todo route');
});

todosRouter.delete('/user/:userId/:todoId', async (req, res) => {
    res.send('Delete Specific user Todo route');
});

export default todosRouter;