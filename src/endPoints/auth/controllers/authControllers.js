const supabase = require('../../../config/supabase.js');
const ROLES = require('../middleware/roles.js');

const { create, findById } = require('../models/User/UserRepository.js');

const VALID_ROLES = Object.values(ROLES);

class AuthController {
    async register(req, res) {
        try {
            const { email, phone_number, full_name, role, password } = req.body;

            // Validate role and required fields
            if (!VALID_ROLES.includes(role)) {
                throw new Error('Invalid role');
            }
            if (role === ROLES.FARMER ) {
                if (!phone_number){
                    throw new Error('Phone number is required');
                }
                else if (!email) {
                    throw new Error('Email is required');
                }
                
            }
            if ([ROLES.COOPERATIVE_MANAGER,ROLES.QUALITY_OFFICER,ROLES.EXPORTER,ROLES.IMPORTER,ROLES.ADMIN].includes(role)) {
                if (!phone_number){
                    throw new Error('Phone number is required');
                }
                else if (!email) {
                    throw new Error('Email is required');
                }
            }

            // Register user in Supabase
            let authResponse;
            if (role === ROLES.FARMER) {
                authResponse = await supabase.auth.signUp({ email, password });
            } else {
                authResponse = await supabase.auth.signUp({ email, password });
            }

            if (authResponse.error) throw new Error(authResponse.error.message);

            // Create user profile in database
            const userProfile = create({
                id: authResponse.data.user.id,
                email,
                phone_number,
                full_name,
                role,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })

            res.status(201).json({ message: 'Registration successful', user: userProfile });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { identifier, password, role } = req.body;

            // Validate role
            if (!VALID_ROLES.includes(role)) {
                throw new Error('Invalid role');
            }

            // Login user in Supabase
            let authResponse;
            if (identifier.match(/^\+?[1-9]\d{1,14}$/)) {
                    authResponse = await supabase.auth.signInWithOtp({ phone: identifier }); 
                } else {
                    authResponse = await supabase.auth.signInWithPassword({ email: identifier, password });
            }
 
            if (authResponse.error) throw new Error(authResponse.error.message);

            // Verify role
            const user = await findById(authResponse.data.user.id);
            if (user.role !== role) throw new Error('Role mismatch');

            res.status(200).json({ message: 'Login successful', user, session: authResponse.data.session });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async signInWithOAuth(req, res) {
        const provider = req.body
        let authResponse;
        try {
            authResponse = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: process.env.SUPABASE_REDIRECT_URL,
                },

            }).then(
                res.status(200).json({ message: `${provider} sign-in initiated`, url: authResponse.data.url })
            )} catch (error) {
                res.status(400).json({ error: error.message });
            }
    }

    async verifyPhone(req, res) {
        try {
            const { phone_number } = req.body;
            const authResponse = await supabase.auth.signInWithOtp({ phone: phone_number });

            if (authResponse.error) {
              res.status(400).json({ error: error.message });  
            };
            res.status(200).json({ message: 'Verification code sent', data: authResponse.data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async enableMFA(req, res) {
        try {
            const { mfa_type } = req.body;
            const token = req.headers.authorization?.split(' ')[1];

            // Verify token and enable MFA
            const { user, error } = await supabase.auth.api.getUser(token);
            if (error) throw new Error('Invalid token');

            // Update MFA status in database
            await db.update('users', { auth_id: user.id }, { mfa_enabled: true });

            res.status(200).json({ message: `MFA enabled using ${mfa_type}` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email } = req.body;
            const authResponse = await supabase.auth.api.resetPasswordForEmail(email, {
                redirectTo: process.env.SUPABASE_RESET_PASSWORD_REDIRECT_URL,
            });
            if (authResponse.error) throw new Error(authResponse.error.message);

            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const { error } = await supabase.auth.api.signOut(token);
            if (error) {
                res.status(400).json({ error: error.message });
            };  
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
