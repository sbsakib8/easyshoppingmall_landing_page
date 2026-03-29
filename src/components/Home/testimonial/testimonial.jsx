import { getReviews } from '@/action/review';

const avatarColors = [
  "bg-pink-500/15 text-pink-400",
  "bg-primary-color/15 text-primary-color",
  "bg-blue-500/15 text-blue-400",
  "bg-purple-500/15 text-purple-400",
  "bg-teal-500/15 text-teal-400",
  "bg-orange-500/15 text-orange-400"
];

const stats = [
  { value: "4.9★", label: "Overall Rating" },
  { value: "20K+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "15K+", label: "Reviews" },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${star <= rating ? "text-primary-color" : "text-gray-700"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const testimonials = await getReviews();

  return (
    <section className="bg-[#080808] px-[4%] py-16">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-primary-color/10 border border-primary-color/25 text-primary-color text-sm font-black px-5 py-2 rounded-full uppercase tracking-widest mb-4">
          ★ Customer Reviews
        </span>
        <h2 className="text-4xl font-bold text-accent-content mb-3">
          What Our <span className="text-primary-color">Customers</span> Say
        </h2>
        <p className="text-gray-400 text-base max-w-md mx-auto">
          Trusted by 20,000+ happy shoppers across Bangladesh
        </p>
      </div>

      {/* ===== STATS BAR ===== */}
      <div className="flex flex-wrap justify-center gap-10 bg-accent-content/2 border border-accent-content/7 rounded-2xl px-8 py-6 max-w-2xl mx-auto mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-bold text-primary-color">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ===== TESTIMONIAL CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => {
          const colorClass = avatarColors[i % avatarColors.length];
          return (
            <div
              key={i}
              className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${t.featured
                ? "bg-linear-to-br from-primary-color/8 to-primary-color/3 border-primary-color/25"
                : "bg-accent-content/3 border-accent-content/8 hover:border-primary-color/25"
                }`}
            >
              {/* Category Tag */}
              {t.category && (
                <span className="absolute top-5 right-5 bg-primary-color/10 border border-primary-color/20 text-primary-color text-xs font-bold px-3 py-1 rounded-full">
                  {t.category}
                </span>
              )}

              {/* Quote */}
              <div className="text-4xl text-primary-color/30 font-serif leading-none mb-3">
                {'"'}
              </div>

              {/* Stars */}
              <StarRating rating={t.rating || 5} />

              {/* Review */}
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                {t.review}
              </p>

              {/* Divider */}
              <div className="h-px bg-accent-content/7 mb-5" />

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${colorClass}`}>
                  {t.name ? t.name.slice(0, 2).toUpperCase() : "??"}
                </div>
                <div>
                  <p className="text-accent-content text-sm font-bold">{t.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.location}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No reviews yet. Be the first to leave a review!
        </div>
      )}

    </section>
  );
}