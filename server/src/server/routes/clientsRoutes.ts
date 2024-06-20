import { Router } from "express";
import { CreateClientController } from "../controllers"
import { UpdateClientController } from "../controllers"
import { DeleteClientController } from "../controllers"
import { GetAllClientsController } from "../controllers/client/getAlluser";

const clientRoutes = Router();
const getAllClientsController = new GetAllClientsController()
const createClientController = new CreateClientController()
const deleteClientController = new DeleteClientController()
const updateClientController = new UpdateClientController() 

clientRoutes.get('/', getAllClientsController.handle)
clientRoutes.post('/', createClientController.handle)
clientRoutes.delete('/:id', deleteClientController.handle)
clientRoutes.put('/:id', updateClientController.handle)

export { clientRoutes }   