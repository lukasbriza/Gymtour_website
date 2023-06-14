import { Router } from "express";
import { filter } from "./controllers/filter";
import { coach } from "./controllers/coach";
import { admin } from "./controllers/admin";
import { fitness } from "./controllers/fitness";
import { user } from "./controllers/user";
import { login } from "./controllers/login";
import { images } from "./controllers/images";
import { views } from "./controllers/views";

export const router = Router();

router.use("/filter", filter);
router.use("/fitness", fitness);
router.use("/coach", coach);
router.use("/user", user);
router.use("/login", login);
router.use("/admin", admin);
router.use("/images", images);
router.use("/views", views);
