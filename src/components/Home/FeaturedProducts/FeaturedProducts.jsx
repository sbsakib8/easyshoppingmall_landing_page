import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/action/product";

export default async function FeaturedProducts() {
  const products = await getProducts();
  return (
    <section id="products" className="bg-[#080808] px-[4%] py-20 min-h-screen">

      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
          Our Collection
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-accent-content mb-4">
          Premium <span className="text-primary-color">Timepieces</span>
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          Discover our handpicked selection of luxury apparel, each crafted with precision and elegance.
        </p>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-3xl text-center py-10 text-gray-500">
          No products found!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group relative bg-[#11151c] border border-accent-content/5 rounded-2xl p-6 transition-all duration-300 hover:border-primary-color/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Discount Badge */}
              <div className="absolute top-5 left-5 z-10 bg-secondary text-accent-content text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg">
                -{product.discount}%
              </div>

              {/* Product Image Area */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl mb-6 bg-[#0a0c12]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0c12] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-accent-content tracking-tight group-hover:text-primary-color transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-2xl font-bold text-primary-color">
                    ৳{product.price}
                  </span>
                  <span className="text-sm text-gray-600 line-through">
                    ৳{product.oldPrice}
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <Link
                href={`/?productId=${product._id}#order`}
                className="mt-6 w-full flex items-center justify-center bg-primary-color hover:bg-primary-color text-black text-sm font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg"
              >
                Order Now
              </Link>

            </div>
          ))}
        </div>
      )}


    </section>
  );
}