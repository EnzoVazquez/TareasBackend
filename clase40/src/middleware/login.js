import jwt from 'jsonwebtoken';
import config from '../configs/config.js';

function requireAuth(req, res, next) {
  return (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    const token = req.cookies[config.jwt.cookie];
    if (!token) return res.redirect('/login');
    try {
        const user = jwt.verify(token, config.jwt.cookie);
        if (policies[0] === "AUTHENTICATED") {
            req.user = user;
            return next();
        }
        else res.redirect('/login');
    } catch (error) {
        res.clearCookie(config.jwt.cookie).status(401).send({ status: "error", error: "Not authenticated" })
    }
}
}
export default requireAuth