import xss from 'xss';

const sanitizeInput = (req, res, next) => {
  try {
    const dangerousPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|UNION|--|;)\b)/i, // SQL injection
      /(\b(OR|AND)\b\s+['"0-9a-z_]+[=><])/i, // boolean-based injection
      /<script.*?>.*?<\/script>/gi, // XSS <script> tags
      /["'`;]+/g // stray quotes, semicolons
    ];

    const sanitizeValue = (val) => {
      if (typeof val === 'string') {
        let clean = xss(val); // strip HTML/JS tags
        for (const pattern of dangerousPatterns) {
          if (pattern.test(clean)) {
            throw new Error(`Malicious input detected: "${val}"`);
          }
        }
        // Further cleanup: trim, normalize quotes
        clean = clean.trim().replace(/['"`;]/g, '');
        return clean;
      } else if (Array.isArray(val)) {
        return val.map(sanitizeValue);
      } else if (typeof val === 'object' && val !== null) {
        return Object.fromEntries(
          Object.entries(val).map(([k, v]) => [k, sanitizeValue(v)])
        );
      }
      return val;
    };

    // Sanitize all sources
    req.body = sanitizeValue(req.body);
    req.query = sanitizeValue(req.query);
    req.params = sanitizeValue(req.params);

    next();
  } catch (error) {
    console.error('Input sanitization error:', error.message);
    return res.status(400).json({
      error: 'Bad request',
      details: error.message,
    });
  }
};

module.exports = sanitizeInput