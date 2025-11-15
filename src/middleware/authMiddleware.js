const supabase = require('../config/supabase');
const UserRepository = require('../endPoints/auth/models/User/UserRepository');
const User = require('../endPoints/auth/models/authClasses');

const verifyToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization?.split(' ')[1];
    const refresh_token = req.headers['x-refresh-token'];

    if (!token) throw new Error('Authorization token is required');

    // Step 1: Try to verify the current token
    let { user, error } = await supabase.auth.api.getUser(token);

    // Step 2: If invalid or expired, attempt refresh
    if (error || !user) {
      if (!refresh_token) throw new Error('Token expired. Please log in again.');

      const { data, error: refreshError } = await supabase.auth.refreshSession({ refresh_token });

      if (refreshError) throw new Error('Invalid refresh token, please log in again.');

      // Replace the expired token
      user = data.session.user;
      req.newAccessToken = data.session.access_token;
      req.newRefreshToken = data.session.refresh_token;
    }

    // Step 3: Sync user profile in your DB
    let userProfile = await UserRepository.findById(user.id);

    if (!userProfile) {
      const newUser = new User({
        id: user.id,
        email: user.email ?? null,
        phone_number: user.phone ?? null,
        full_name: user.user_metadata?.full_name ?? null,
        role: user.user_metadata?.role ?? 'user',
        created_at: new Date(),
        updated_at: new Date()
      });

      userProfile = await UserRepository.create(newUser);
    } else {
      const userData = {
        email: user.email || userProfile.email,
        phone_number: user.phone || userProfile.phone_number,
        full_name: user.user_metadata?.full_name || userProfile.full_name,
        updated_at: new Date()
      };
      await UserRepository.update(userProfile.id, userData);
    }

    // Step 4: Attach user to request
    req.user = user;
    req.userProfile = userProfile;

    // Step 5: Optionally include new tokens in response headers
    if (req.newAccessToken) {
      res.setHeader('x-access-token', req.newAccessToken);
      res.setHeader('x-refresh-token', req.newRefreshToken);
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const verifyRole = (roles) => {
    return async (req, res, next) => {
        try {
            const userProfile = req.userProfile;

            if (!roles.includes(userProfile.role)) {
                throw new Error('Access denied');
            }
            next();
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    };
};

module.exports = { verifyToken, verifyRole };
