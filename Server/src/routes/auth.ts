import dotenv from "dotenv";
dotenv.config();
import Joi from "joi";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import User from "./../models/user";
import { Router } from "express";

const validationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(5).required().messages({
    "string.min": "Password should be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
});

const router = Router();

router.post("/signup", async (req, res) => {
  // 1) validate the email and password
  const isValid = validationSchema.validate(req.body, { abortEarly: false });
  if (isValid.error) {
    const errors = isValid.error.details.map((e) => {
      return { msg: e.message };
    });
    return res.json({ errors: errors, data: null });
  }

  // 2) check if the email already exist in the DB
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser)
    return res.json({
      status: "faild",
      errors: [{ msg: "email already exist" }],
      data: null,
    });

  // 3) Hash the Password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // 4) create the new user and save it in the DB
  const newUser = await User.create({
    email: req.body.email,
    password: hashedPassword,
  });

  // 5) create the token
  const token = JWT.sign(
    { email: newUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 3600 } // in seconds
  );

  // 6) send back the response with the data
  res.status(201).json({
    status: "success",
    errors: [],
    data: { token, user: { id: newUser._id, email: newUser.email } },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1) check if the email exist in the DB
  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      errors: [{ msg: "Invalid email or password!" }],
      data: null,
    });

  // 2) Comparing password
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.json({
      errors: [{ msg: "Invalid email or password!" }],
      data: null,
    });

  // 3) create the token
  const token = JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 3600 } // in seconds
  );

  // 4) send back the response with the data
  res.status(201).json({
    status: "success",
    errors: [],
    data: { token, user: { id: user._id, email: user.email } },
  });
});

export default router;
