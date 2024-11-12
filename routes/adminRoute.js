// routes/admin.js
import express from 'express';
import { registerAdmin,loginAdmin,getAdmin,getAllAdmins } from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/',getAllAdmins)
router.get('/:id',getAdmin)

export default router;
