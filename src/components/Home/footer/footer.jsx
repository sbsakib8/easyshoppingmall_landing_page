import Link from "next/link";
import { ShoppingCart, MapPin, Phone, Mail, Clock } from "lucide-react";



const contactInfo = [
  { icon: MapPin, text: "Dhaka, Bangladesh" },
  { icon: Phone, label: "Call Us:", text: "+880 1700-000000" },
  { icon: Mail, label: "Email:", text: "info@easyshoppingmall.com" },
  { icon: Clock, text: "Mon–Sat: 9am – 6pm" },
];

const socialLinks = [
  { name: "f", label: "Facebook", href: "#" },
  { name: "in", label: "LinkedIn", href: "#" },
  { name: "tw", label: "Twitter", href: "#" },
  { name: "yt", label: "YouTube", href: "#" },
];

const paymentMethods = ["bKash", "Nagad", "Visa", "MasterCard", "COD"];

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-xl border-t border-accent-content/8 text-accent-content">



      {/* ===== MAIN GRID ===== */}
      <div className="px-[4%] py-6 flex flex-col md:flex-row justify-between gap-10">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border border-accent-content/10">
              <ShoppingCart className="w-5 h-5 text-primary-color" />
            </div>
            <div>
              <div className="text-base font-bold">
                <span className="text-accent-content">EASY</span>
                <span className="text-primary-color">SHOPPINGMALL</span>
              </div>
              <div className="text-[11px] text-gray-500">Best deals every day</div>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Awesome grocery store website. Quality products, unbeatable prices, fast delivery across Bangladesh.
          </p>


        </div>
        {/* Contact Info */}
        <div className="space-y-3">
          {contactInfo.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
              <item.icon className="w-4 h-4 text-primary-color shrink-0" />
              {item.label && (
                <span className="text-gray-500 text-xs">{item.label}</span>
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-accent-content/8 px-[4%] py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © 2025 EasyShoppingMall. All rights reserved.
        </p>

        {/* Payment Methods */}
        <div className="flex items-center gap-2">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="text-xs bg-accent-content/5 border border-accent-content/8 px-3 py-1 rounded-lg text-gray-500 hover:border-primary-color hover:text-primary-color transition"
            >
              {method}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 mr-1">Follow Us</span>
          {socialLinks.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              aria-label={s.label}
              className="w-8 h-8 rounded-xl bg-accent-content/5 border border-accent-content/8 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-primary-color hover:border-primary-color hover:text-accent transition-all"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>



    </footer>
  );
}