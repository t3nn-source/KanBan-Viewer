import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY as string);
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
  return;
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
