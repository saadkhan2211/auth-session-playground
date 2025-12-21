import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import Auth from "../controllers/auth.controller";

const router = Router();

router.post("/login", validate(loginSchema), Auth.login);
router.post("/signup", validate(signupSchema), Auth.signup);
router.post("/refreshToken", Auth.refresh);

export default router;
