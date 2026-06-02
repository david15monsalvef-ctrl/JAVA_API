import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El email ya está registrado.' });

    const newUser = new User({ nombre, email, password, rol });
    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas.' });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};