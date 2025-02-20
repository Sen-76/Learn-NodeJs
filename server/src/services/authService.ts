import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { userSchema } from '@/models/user';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLogin, LoginModel, RegisModel, ResetModel, VerifyModel } from '@common/models/auth';

// Create the Mongoose model
const UserModel = mongoose.model('User', userSchema);

const randomWord = (length: number) => {
  let str = '';
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  for (let i = 0; i < length; i++) {
    const pos = Math.round(Math.floor(Math.random() * (arr.length - 1)));
    str += arr[pos];
  }
  return str;
};

export const Auth = {
  async Login(model: LoginModel) {
    try {
      const user = await UserModel.findOne({ email: model.email });
      if (!user) return { statusCode: 404, error: 'User not found' };
      const validPassword = await bcrypt.compare(model.password, user.password);
      console.log(validPassword);
      if (!validPassword) return { statusCode: 401, error: 'Invalid password' };
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          userId: user._id,
        },
        'secretkey'
      );
      return { statusCode: 200, data: token };
    } catch (err) {
      console.error('Error login:', err);
      throw err;
    }
  },

  async Regis(model: RegisModel) {
    try {
      const existingUser = await UserModel.findOne({ email: model.email });
      if (existingUser) return { statusCode: 404, error: 'User already exists' };
      const hashedPassword = await bcrypt.hash(model.password, 12);
      const newUser = new UserModel({
        ...model,
        password: hashedPassword,
      });

      await newUser.save();
      return { statusCode: 200, data: newUser };
    } catch (err) {
      console.error('Error regis:', err);
      throw err;
    }
  },

  async FogotPassword(model: RegisModel) {
    try {
      const user = await UserModel.findOne({ email: model.email });
      if (!user) return { statusCode: 404, error: 'User not found' };
      const verifyString = randomWord(5);

      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 15); // 15 minutes expiration

      user.verificationCode = verifyString;
      user.verificationCodeExpiry = expirationTime;

      await user.save();

      return { statusCode: 200, data: verifyString };
    } catch (err) {
      console.error('Error regis:', err);
      throw err;
    }
  },

  async Verify(model: VerifyModel) {
    try {
      const user = await UserModel.findOne({ email: model.email });
      if (!user) return { statusCode: 404, error: 'User not found' };

      if (user.verificationCode !== model.verificationCode || new Date() > user.verificationCodeExpiry)
        return { statusCode: 400, error: 'Invalid or expired verification code' };

      return { statusCode: 200, data: true };
    } catch (err) {
      console.error('Error regis:', err);
      throw err;
    }
  },

  async ResetPassword(model: ResetModel) {
    try {
      const user = await UserModel.findOne({ email: model.email, verificationCode: model.verificationCode });
      if (!user) return { statusCode: 404, error: 'User not found' };
      if (model.newPassword != model.reNewPassword) return { statusCode: 404, error: 'Passwords are not match' };
      const hashedPassword = await bcrypt.hash(model.newPassword, 12);

      user.password = hashedPassword;

      await user.save();
      return { statusCode: 200, data: user };
    } catch (err) {
      console.error('Error regis:', err);
      throw err;
    }
  },

  async GoogleLogin(model: GoogleLogin) {
    try {
      const client = new OAuth2Client(process.env.GG_CLIENT_ID, process.env.GG_CLIENT_SECRET);

      const { token, clientId } = model;

      client.setCredentials({ id_token: token });

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      return ticket.getPayload();
    } catch (err) {
      console.error('Error login:', err);
      throw err;
    }
  },
};
