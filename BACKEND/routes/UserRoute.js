import Express  from "express";
import {
    getUsers, 
    getUsersById, 
    createUser,
    updateUser,
    deleteUser

} from "../controllers/UserController.js"

const router = Express.Router()
router.get('/users', getUsers)
router.get('/users/:id', getUsersById)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
export default router
