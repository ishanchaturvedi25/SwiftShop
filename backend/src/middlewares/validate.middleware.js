const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Validation failed',
            error: error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }
}

module.exports = validate;