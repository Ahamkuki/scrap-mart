import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-secret-change-me");
const COOKIE = "scrapmart_session";

export async function createSession(userId: string, role: string) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  (await cookies()).set(COOKIE, token, { httpOnly:true, secure:process.env.NODE_ENV==="production", sameSite:"lax", path:"/", maxAge:60*60*24*7 });
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, secret)).payload as {userId:string;role:string}; }
  catch { return null; }
}

export async function currentUser() {
  const s = await getSession();
  if (!s?.userId) return null;
  return db.user.findUnique({ where:{id:s.userId}, select:{id:true,name:true,email:true,phone:true,role:true,twoFAEnabled:true} });
}

export async function requireAdmin() {
  const u = await currentUser();
  if (!u || u.role !== "ADMIN") throw new Error("UNAUTHORIZED");
  return u;
}
