// routes/customerRoutes.js
import express from 'express'
import {createCompany,getCompany,getCompanyById,updateCompany,deleteCompany,loginCompany} from '../controllers/companyController.js'

const router = express.Router();


// Define routes and link them to controllers
router.post("/",createCompany );
router.post("/login", loginCompany);
router.get("/", getCompany);
router.get("/:id",getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id",deleteCompany);

export default router;
