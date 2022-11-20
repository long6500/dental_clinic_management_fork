const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HTTPError = require('../../common/httpError');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.PASSWORD_EMAIL_ADMIN
    }
});

const createUser = async () => {
    try {
        if (await UserModel.find().count() > 0) return null;

        const password = process.env.PASSWORD_ADMIN;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = [
            { username: process.env.USERNAME_ADMIN, password: hashPassword },
        ];

        const admin = await UserModel.create(user);
        return admin._id;
    } catch (err) {
        return null;
    }
}

const generatePassword = () => {
    const hasNumber = /\d/;
    var test = false;
    var randomstring = '';
    while (!test) {
        randomstring = Math.random().toString(36).slice(-8);
        test = hasNumber.test(randomstring); 
    }
    return randomstring;
}

const generateUsername = async (fullname) => {
    const temp = fullname.split(' ');
    var username = temp[temp.length - 1];
    for (var i = 0; i < temp.length - 1; i++) {
        username += temp[i].charAt(0);
    }
    username = username.toLowerCase();
    var count = 0;
    var tempUsername = username;
    while (true) {
        const existUser = await UserModel.findOne({ username: tempUsername });
        if (existUser) {
            count++;
            tempUsername = username + count;
            continue;
        }
        return tempUsername;
    }
}

const sendEmail = async (email, subject, text) => {
    var mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: email,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const register = async (fullname, email) => {
    const password = generatePassword();
    const username = await generateUsername(fullname);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
        username,
        password: hashPassword
    });

    await sendEmail(
        email, 
        '[DCManagement] Tài khoản và mật khẩu của bạn', 
        'Chào mừng bạn đến với Dentail Clinic Management! \n Tài khoản của bạn là '+username+'\n Mật khẩu của bạn là '+password
    );
    
    return newUser;
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

    if (existUser.status == false) {
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
    const { user } = req;

    res.send({ success: 1, data: user });
};

module.exports = {
    register,
    login,
    verify,
    createUser,
}
