export function whatsappUrl(message: string) {
  const number = (process.env.WHATSAPP_NUMBER || "").replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
