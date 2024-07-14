const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide email", error: true, success: false });
        }
        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found", error: true, success: false });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite : 'None'
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false,
            });

        } else {
            return res.status(401).json({ message: "Please check password", error: true, success: false });
        }

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: err.message || 'Internal Server Error',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
