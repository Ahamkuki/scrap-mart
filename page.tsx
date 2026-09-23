import Link from "next/link";
import { db } from "@/lib/db";
import { whatsappUrl } from "@/lib/whatsapp";

export default async function Home(){
  const products=await db.product.findMany({where:{active:true},include:{category:true},orderBy:{createdAt:"desc"},take:6});
  const wa=whatsappUrl("Hello ScrapMart, I want to buy scrap.");
  return <>
    <section className="hero"><div className="container"><div className="pill">♻️ Trusted Scrap Marketplace</div><h1>Buy & Sell Scrap<br/>the simple way.</h1><p>Browse scrap products, send your order request, or sell your own scrap. For final price and availability, talk directly with ScrapMart on WhatsApp.</p><div className="actions"><Link className="btn primary" href="/products">Browse Scrap</Link><Link className="btn light" href="/sell">Sell Your Scrap</Link><a className="btn whatsapp" href={wa}>Chat on WhatsApp</a></div></div></section>
    <section className="section"><div className="container"><h2>Featured Scrap</h2><div className="grid">{products.map(p=><Link className="card" href={`/products/${p.slug}`} key={p.id}><div className="product-image">♻️</div><h3>{p.name}</h3><div className="muted">{p.category.name}</div><div className="price">₹{Number(p.price).toLocaleString("en-IN")} / {p.unit}</div><span className="btn light">View & WhatsApp</span></Link>)}</div></div></section>
  </>;
}