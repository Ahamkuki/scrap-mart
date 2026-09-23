 "use server";
import { db } from "@/lib/db"; import { currentUser } from "@/lib/auth"; import { redirect } from "next/navigation";
export async function submitSell(formData:FormData){
 const u=await currentUser(); const name=String(formData.get("name")||"").trim(),phone=String(formData.get("phone")||"").trim(),email=String(formData.get("email")||"").trim()||null,scrapType=String(formData.get("scrapType")||"").trim(),quantity=String(formData.get("quantity")||"").trim(),description=String(formData.get("description")||"").trim()||null;
 const urls=String(formData.get("photoUrls")||"").split("\n").map(x=>x.trim()).filter(Boolean);
 const requestNo="SELL-"+Date.now().toString(36).toUpperCase();
 await db.sellRequest.create({data:{requestNo,userId:u?.id||null,name,phone,email,scrapType,quantity,description,photoUrls:urls}});
 redirect(`/sell/success?no=${requestNo}`);
}