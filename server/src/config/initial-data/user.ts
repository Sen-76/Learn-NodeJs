import { IUser, userSchema } from '@/models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const InitUser = async () => {
  const User = mongoose.model<IUser>('User', userSchema);

  const saltRounds = 12;
  const plainPassword = 'your_plain_password';

  bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    const user = new User({
      name: 'Cersei Lannister',
      email: 'lena_headey@gameofthron.es',
      password: hash,
    });

    user
      .save()
      .then(() => console.log('User saved successfully!'))
      .catch((err) => console.error('Error saving user:', err));
  });
};

export default InitUser;
