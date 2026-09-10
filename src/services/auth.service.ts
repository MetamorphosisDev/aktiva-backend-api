import { db } from "../config/db";
import { usersTable } from "../config/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { RegisterData } from "../types/auth.type";

// REGISTER || POST
export const registerUser = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await db.insert(usersTable).values({
    ...data,
    email: data.email.toLowerCase().trim(),
    password: hashedPassword,
  });
};

// LOGIN || POST
export const loginUser = async (
  email: string,
  password: string
) => {
  const normalizedEmail = email.toLowerCase().trim();

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, normalizedEmail));
  const user = users[0];
  if (!user) { throw new Error("Email atau password salah"); }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) { throw new Error("Email atau password salah"); }
  return user;
};