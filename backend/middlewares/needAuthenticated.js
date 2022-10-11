const jwt = require('jsonwebtoken');
const UserModel = require('../modules/auth/user');
const HTTPError = require('../common/httpError');

async function needAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        throw new HTTPError(401, 'Not found token');
    }

    const data = jwt.verify(token, process.env.SECRET_KEY);
    const { userId } = data;

    if (!userId) {
        throw new HTTPError(401, 'Authorization fail');
    }

    const existUser = await UserModel.findById(userId);
    if (!existUser) {
        throw new HTTPError(401, 'Authorization fail');
    }

    req.user = existUser;

    next(); 
}

module.exports = needAuthenticated;