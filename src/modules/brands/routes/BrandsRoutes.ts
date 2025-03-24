import { Router } from "express";
import { ensureAunthenticated } from "../../../shared/infra/http/middleware/ensureAuthenticated";
import { CreateBrandController } from "../useCases/createBrands/CreateBrandController";
import { DeleteBrandController } from "../useCases/deleteBrands/DeleteBrandController";
import { UpdateBrandController } from "../useCases/updateBrands/UpdateBrandController";
import { ListBrandController } from "../useCases/listBrands/ListBrandController";

const createBrandController = new CreateBrandController
const deleteBrandController = new DeleteBrandController
const updateBrandController = new UpdateBrandController
const listBrandController = new ListBrandController

export const brandsRoutes = Router();

brandsRoutes.post("/create", ensureAunthenticated, createBrandController.handle)
brandsRoutes.delete("/delete/:id", ensureAunthenticated, deleteBrandController.handle)
brandsRoutes.put("/update/:id", ensureAunthenticated, updateBrandController.handle)
brandsRoutes.post("/list", ensureAunthenticated, listBrandController.handle)

