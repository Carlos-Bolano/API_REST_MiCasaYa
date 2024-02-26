import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UserProfile,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), UserRegister);

router.post("/login", validateSchema(loginSchema), UserLogin);

router.post("/logout", authRequired, UserLogout);

router.get("/profile", authRequired, UserProfile);

export default router;
