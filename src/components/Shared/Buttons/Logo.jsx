import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className="p-8 mb-4">
      <Link href="/" className="flex items-center gap-3 group">
        {/* Animated Icon Container */}
        <div className="w-10 h-10 bg-linear-to-br from-[#1e232d] to-[#080808] rounded-xl flex items-center justify-center border border-accent-content/10 shadow-xl group-hover:border-primary-color/50 transition-all duration-300 shrink-0">
          <ShoppingCart className="w-5 h-5 text-primary-color" />
        </div>

        {/* Text Section */}
        <div className="flex flex-col">
          <div className="text-sm font-black leading-tight tracking-tighter">
            <span className="text-accent-content block">EASY</span>
            <span className="text-primary-color block -mt-1 text-[11px]">SHOPPINGMALL</span>
          </div>
          <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            Admin Panel
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Logo