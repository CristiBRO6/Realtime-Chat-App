const { validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);

            if (!result.isEmpty()) {
                const path = result.errors[0].path;
                const message = result.errors[0].msg;

                return res.status(200).json({ status: false, path: path, message: message });
            }
        }
  
        next();
    };
  };

module.exports = validate;