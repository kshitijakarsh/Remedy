import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const JWT_SECRET = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Registration successful",
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const JWT_SECRET = process.env.JWT_SECRET_KEY;
      if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined in environment variables");
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });
  
      return res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Error logging in" });
    }
  };
  

export const logoutUser = (req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
};
