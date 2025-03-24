const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "BANANA_KEY");
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }
        next(); // car a la suite de the MW sur les route ont a d'autre mw a executer propre a leur model
    } catch (error) {
        res.status(401).json({ error });
    }
}
