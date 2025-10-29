// lógica de validação de token

const User = require('src/backend/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUSer = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isMatch =  await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, user: { id: user.id, email: user.email } };
};