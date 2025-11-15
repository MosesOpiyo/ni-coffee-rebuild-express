const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 5,                 // limit each IP to 100 requests per window
})

module.exports = loginLimiter;