import UserModel from "../models/user";
import { compare, hash } from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

type SignUpBody = {
  username?: string;
  email?: string;
  password?: string;
};

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }
    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }
    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists. Please log in instead."
      );
    }
    const passwordHashed = await hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });
    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

type LogInBody = {
  username?: string;
  password?: string;
};

export const logIn: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
