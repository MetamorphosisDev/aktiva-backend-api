import { db } from "../config/db";
import { usersTable } from "../config/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { RegisterData } from "../types/auth.type";

// REGISTER
export const registerUser = async (data: RegisterData) => {
  const password = await bcrypt.hash(data.password, 10);

  return db.insert(usersTable).values({
    name: data.name,
    email: data.email.toLowerCase().trim(),
    password,
    phoneNumber: data.phoneNumber,
  });
};

// LOGIN
export const loginUser = async (email: string, password: string) => {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email.toLowerCase().trim()));

  const user = users[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Email atau password salah");
  }

  return user;
};

// GET PROFILE
export const getProfile = async (userId: number) => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      phoneNumber: usersTable.phoneNumber,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  return users[0];
};

// UPDATE PROFILE
export const updateProfile = async (
  userId: number,
  data: {
    name: string;
    email: string;
    phoneNumber?: string;
  }
) => {
  return db
    .update(usersTable)
    .set({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      phoneNumber: data.phoneNumber,
    })
    .where(eq(usersTable.id, userId));
};

// DELETE PROFILE
export const deleteProfile = async (userId: number) => {
  return db
    .delete(usersTable)
    .where(eq(usersTable.id, userId));
};