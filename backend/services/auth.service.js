const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (email, password) => {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        throw new Error('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return {
        id: newUser.id,
        email: newUser.email
    };
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
        }
    };
};
