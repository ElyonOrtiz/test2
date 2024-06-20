import { Router } from "express";
import { userRoutes } from "./user.routes";
import { clientRoutes } from "./clientsRoutes";

const routes = Router();
routes.get('/', (_, res) => {
  return res.send('Olá, Dev!');
});

routes.use("/user", userRoutes);    
routes.use("/client", clientRoutes); 


export { routes };