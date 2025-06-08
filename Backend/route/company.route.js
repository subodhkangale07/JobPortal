import express from "express";
import { companyRegister, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import isAuthentication from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthentication,companyRegister);
router.route("/get").get(isAuthentication,getCompany);
router.route("/get/:id").get(isAuthentication,getCompanyById);
router.route("/update/:id").put(isAuthentication,updateCompany);

export default router