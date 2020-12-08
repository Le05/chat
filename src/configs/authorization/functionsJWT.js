const jwt = require('jsonwebtoken');
const jwtConfigs = require('./jwtConfigs.json');

module.exports = {

    async gerarToken(email) {
      
        const token = jwt.sign({ email }, jwtConfigs.secret, { expiresIn: '1d' });
        
        return token;
    },

    async validarToken(req, res, next) {
        //return next();
       const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ error: "No Token Provided" });

        const parts = authHeader.split(' ');

        if (parts.length != 2)
            return res.status(401).json({ error: "Token error" });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).json({ error: "Token malformatted" });

        try {
            jwt.verify(token, jwtConfigs.secret);
            return next();
        } catch (error) {
            return res.status(401).json({ error: "Token expired" });
        }
    },
    async validarLogin(req, res) {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).json({ error: "No Token Provided" });

        const parts = authHeader.split(' ');

        if (parts.length != 2)
            return res.status(401).json({ error: "Token error" });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).json({ error: "Token malformatted" });

        try {
            jwt.verify(token, jwtConfigs.secret);
            return true;//res.json({ "sucesso": "Token válido" });
        } catch (error) {
            return res.status(401).json({ error: "Token expired" });
        }
    },
}