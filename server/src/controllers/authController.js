const authService = require('@/services/authService');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        const result  = await authService.register(name, email, password);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }   
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result  = await authService.login(email, password, res);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }   
};

// EMAIL VERIFICATION
exports.emailVerification = async (req, res) => {
    try {
        const { id, code } = req.body;
    
        const result  = await authService.emailVerification(id, code, res);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }  
};

// RESEND CODE
exports.resendCode = async (req, res) => {
    try {
        const { id } = req.body;

        const result  = await authService.resendCode(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }  
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await authService.forgotPassword(email);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }  
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { id, password } = req.body;

        const result = await authService.resetPassword(id, password, res);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    } 
};

// LOGOUT
exports.logout = async (req, res) => {
    try {
        const result = await authService.logout(req, res);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};