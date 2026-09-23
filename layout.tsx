import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ScrapMart | Buy & Sell Scrap",
  description: "Buy scrap and sell your scrap with ScrapMart. Browse scrap products and contact us directly on WhatsApp.",
  keywords: ["scrap", "scrap dealer", "scrap buying", "scrap selling", "metal scrap", "paper scrap", "Delhi scrap"],
  robots: "index,follow"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>
    <div className="top"><div className="container">♻️ ScrapMart — Buy & Sell Scrap Easily</div></div>
    <nav className="nav"><div className="container navin">
      <Link className="logo" href="/">Scrap<span>Mart</span></Link>
      <div className="links">
        <Link href="/products">Products</Link><Link href="/sell">Sell Scrap</Link><Link href="/orders">My Orders</Link><Link href="/account">Account</Link>
      </div>
      <Link className="btn whatsapp" href="/api/whatsapp?message=Hello%20ScrapMart%2C%20I%20want%20to%20know%20about%20scrap.">WhatsApp</Link>
    </div></nav>
    {children}
    <footer className="footer"><div className="container"><strong>ScrapMart</strong><p>Buy scrap. Sell scrap. Talk directly with us.</p><small>© {new Date().getFullYear()} ScrapMart. All rights reserved.</small></div></footer>
  </body></html>;
}