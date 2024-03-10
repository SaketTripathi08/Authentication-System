import express from 'express';
import {getAllUsers, deleteUser,getUser} from "../../controllers/users.controller.js";
import  ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from "../../middlewares/verifyRoles.js"
const router = express.Router();

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
