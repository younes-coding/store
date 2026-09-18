// Sanitize request data against NoSQL Injection and malicious operators

const cleanValue = (val) => {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(cleanValue);
  }
  if (typeof val === 'object') {
    const cleaned = {};
    for (const key of Object.keys(val)) {
      // Prevent MongoDB Operator Injection (e.g. $gt, $where, $ne)
      if (key.startsWith('$') || key.includes('.')) {
        continue;
      }
      cleaned[key] = cleanValue(val[key]);
    }
    return cleaned;
  }
  return val;
};

export const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = cleanValue(req.body);
  if (req.query) req.query = cleanValue(req.query);
  if (req.params) req.params = cleanValue(req.params);
  next();
};
