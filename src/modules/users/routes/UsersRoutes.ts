import { Router } from "express";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";
import { CreateUserController } from "../useCases/createUser.ts/CreateUserController";
import { DeleteUserController } from "../useCases/deleteUsers.ts/deleteUserController";
import { UpdateUserController } from "../useCases/updateUsers.ts/UpdateUserController";
import { ListUserController } from "../useCases/listUser.ts/ListUserController";

const createUserController = new CreateUserController;
const deleteUserController = new DeleteUserController;
const updateUserController = new UpdateUserController;
const listUserController = new ListUserController;


export const userRoutes = Router();

userRoutes.post("/create", ensureAunthenticated, createUserController.handle)
userRoutes.delete("/delete/:id", ensureAunthenticated, deleteUserController.handle)
userRoutes.put("/update/:id", ensureAunthenticated, updateUserController.handle)
userRoutes.post("/list", ensureAunthenticated, listUserController.handle)


