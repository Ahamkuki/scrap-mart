import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisAdminPassword123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name: "ScrapMart Admin" },
    create: { email, passwordHash, role: "ADMIN", name: "ScrapMart Admin" }
  });

  const categories = [
    ["Metal Scrap", "metal-scrap"],
    ["Paper Scrap", "paper-scrap"],
    ["Plastic Scrap", "plastic-scrap"],
    ["Electronic Scrap", "e-waste"]
  ];

  for (const [name, slug] of categories) {
    await db.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug, description: `${name} available from ScrapMart.` }
    });
  }

  const metal = await db.category.findUniqueOrThrow({ where: { slug: "metal-scrap" } });
  const paper = await db.category.findUniqueOrThrow({ where: { slug: "paper-scrap" } });
  const plastic = await db.category.findUniqueOrThrow({ where: { slug: "plastic-scrap" } });

  const products = [
    {name:"Copper Scrap",slug:"copper-scrap",description:"Clean copper scrap. Contact us on WhatsApp for current buying/selling price.",price:650,unit:"kg",stock:100,featured:true,categoryId:metal.id},
    {name:"Aluminium Scrap",slug:"aluminium-scrap",description:"Aluminium scrap for bulk and regular requirements.",price:170,unit:"kg",stock:100,featured:true,categoryId:metal.id},
    {name:"Iron Scrap",slug:"iron-scrap",description:"Mixed iron scrap. Final price depends on grade and quantity.",price:35,unit:"kg",stock:500,featured:false,categoryId:metal.id},
    {name:"Newspaper Scrap",slug:"newspaper-scrap",description:"Sorted newspaper scrap.",price:28,unit:"kg",stock:300,featured:true,categoryId:paper.id},
    {name:"Cardboard Scrap",slug:"cardboard-scrap",description:"Sorted cardboard and corrugated boxes.",price:14,unit:"kg",stock:400,featured:false,categoryId:paper.id},
    {name:"PET Plastic Scrap",slug:"pet-plastic-scrap",description:"Sorted PET plastic scrap.",price:45,unit:"kg",stock:250,featured:true,categoryId:plastic.id}
  ];

  for (const p of products) {
    await db.product.upsert({ where:{slug:p.slug}, update:p, create:p });
  }

  await db.setting.upsert({
    where:{key:"siteName"},
    update:{value:"ScrapMart"},
    create:{key:"siteName",value:"ScrapMart"}
  });
}

main().finally(() => db.$disconnect());
