import express from "express";
import {
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
    getSuggestedUsers,
    freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update", protectRoute, updateUser);
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.put("/freeze", protectRoute, freezeAccount);

export default router;