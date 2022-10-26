const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HTTPError = require('../../common/httpError');
const profileController = require('../profile/profile.controller');

const createUser = async () => {
    try {
        if (await UserModel.find().count() > 0) return;

        const password = 'admin1234';
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = [
            { username: "admin", password: hashPassword },
        ];

        await FunctionModel.create(user);
        return;
    } catch (err) {
        return err;
    }
}

const register = async (req, res) => {
    const { username, password } = req.body;
    const existUser = await UserModel.findOne({ username });

    if (existUser) {
        throw new HTTPError(400, 'Username duplicate');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
        username,
        password: hashPassword
    });

    res.send({
        success: 1, data: {
            _id: newUser._id,
            username: newUser.username
        }
    });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const existUser = await UserModel.findOne({
        username,
    });

    if (!existUser) {
        throw new HTTPError(400, 'Username or Password incorrect');
    }

    const matchPassword = await bcrypt.compare(password, existUser.password);

    if (!matchPassword) {
        throw new HTTPError(400, 'Username or Password incorrect');
    }

    if (existUser.status == false){
        throw new HTTPError(400, 'Tài khoản của bạn đã hết hạn');
    }

    const userId = existUser._id;
    const token = jwt.sign({
        userId,
    }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60
    })

    res.send({
        success: 1, data: {
            _id: userId,
            token
        }
    });
}

const verify = async (req, res) => {
    const {user} = req;

    res.send({success: 1, data: user});
};

module.exports = {
    register,
    login,
    verify,
}
