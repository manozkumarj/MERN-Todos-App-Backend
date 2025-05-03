import { z } from "zod";

const fullNameSchema = z.string().trim().min(1).max(64);
const emailSchema = z.string().trim().email().min(1).max(64);
const passwordSchema = z.string().min(6).max(255);

const todoTitleSchema = z.string().trim().min(1).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registrationSchema = loginSchema
  .extend({
    fullName: fullNameSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.string().trim().min(1).max(24);

// export const userIdSchema = z.string().trim().min(10).max(24).regex(/^[0-9a-fA-F]{24}$/);
export const userIdSchema = z.object({
  userId: z.string().trim().min(10).max(24).refine((value) => /^^[0-9a-fA-F]{24}$/.test(value ?? ""), 'Please enter valid ID')
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

export const todoSchema = z.object({
  title: todoTitleSchema,
});
