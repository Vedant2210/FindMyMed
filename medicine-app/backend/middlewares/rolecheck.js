const requiredRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: `Forbidden ❌: Requires ${role} role` });
    }
    next();
  };
};

module.exports = requiredRole;