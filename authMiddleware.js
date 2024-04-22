const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    next();
};

module.exports = {
    verifyToken
};
