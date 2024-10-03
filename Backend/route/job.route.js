import express from "express";
import isAuthentication from "../middleware/isAuthenticated.js";
import {  getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthentication,postJob);
router.route("/get").get(isAuthentication,getAllJob);
router.route("/get/:id").get(isAuthentication,getJobById);
router.route("/getadminjobs").get(isAuthentication,getAdminJobs);

export default router