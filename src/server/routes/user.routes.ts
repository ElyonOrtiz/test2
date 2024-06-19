import { DeleteUserController } from '../controllers/user/delete';
import { SingInController } from '../controllers/user/singin';
import { UpdateUserController } from '../controllers/user/updateById';
import { ensureAuthenticated } from '../../middlewares/EnsureAuthenticated';
import { Router } from 'express'
const singInController = new SingInController()
const deleteUserController = new DeleteUserController()
const updateUserController = new UpdateUserController()
const userRoutes = Router();


userRoutes.post('/', singInController.handle)
userRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle)
userRoutes.put('/:id', ensureAuthenticated, updateUserController.handle)

export { userRoutes }