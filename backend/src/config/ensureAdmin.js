import User from '../models/User.js';

export async function ensureAdminFromEnv() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || 'Admin';

  if (!email) return;

  let user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (user) {
    user.role = 'admin';
    if (password && password.length >= 6) {
      user.password = password;
    }
    user.name = name || user.name;
    await user.save({ validateBeforeSave: true });
    console.log('Admin user updated:', email);
  } else {
    if (!password || password.length < 6) {
      console.warn('ADMIN_EMAIL set but ADMIN_PASSWORD missing or too short; skipping admin creation.');
      return;
    }
    user = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      role: 'admin',
    });
    console.log('Admin user created from env:', email);
  }
}
