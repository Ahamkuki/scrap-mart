 "use server";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(formData:FormData){
 const name=String(formData.get("name")||"").trim(),email=String(formData.get("email")||"").trim().toLowerCase(),phone=String(formData.get("phone")||"").trim(),password=String(formData.get("password")||"");
 if(!name||!email||password.length<8) throw new Error("Invalid registration");
 if(await db.user.findUnique({where:{email}})) throw new Error("Email already registered");
 const passwordHash=await bcrypt.hash(password,12); const u=await db.user.create({data:{name,email,phone,passwordHash}});
 await createSession(u.id,u.role); redirect("/account");
}
export async function login(formData:FormData){
 const email=String(formData.get("email")||"").trim().toLowerCase(),password=String(formData.get("password")||"");
 const u=await db.user.findUnique({where:{email}}); if(!u||!(await bcrypt.compare(password,u.passwordHash))) throw new Error("Invalid email or password");
 await createSession(u.id,u.role); redirect(u.role==="ADMIN"?"/admin":"/account");
}