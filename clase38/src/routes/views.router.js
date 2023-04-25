import { Router } from "express";
import context from "../dao/mongo/context.js";
import viewsController from '../controllers/views.controller.js'

let contenedor = new context()

const router = Router();

router.get('/register', viewsController.register)

router.get('/', viewsController.login)

router.get('/inicio', viewsController.main)


export default router;