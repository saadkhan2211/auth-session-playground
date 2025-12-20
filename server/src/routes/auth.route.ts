import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import Auth from "../controllers/auth.controller";

const router = Router();

router.post("/loign", validate(loginSchema), Auth.login);
router.post("/signup", validate(signupSchema), Auth.signup);

export default router;
