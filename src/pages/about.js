import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    avatar: "RK",
    rating: 4,
    comment: "The platform is incredibly powerful for long-term planning. We did face some delays in satellite data refresh during heavy monsoon periods, but the support team resolved it quickly. Overall a game-changer for our department.",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Sneha Desai",
    avatar: "SD",
    rating: 5,
    comment: "Took us a couple of weeks to fully onboard our team due to the depth of features. A guided tutorial would help. That said, the locality-level risk assessments are far more granular than anything else we've used.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    name: "Amir Shaikh",
    avatar: "AS",
    rating: 4,
    comment: "The desktop dashboard is excellent but the mobile view needs improvement — some charts overflow on smaller screens. For field teams, a dedicated mobile app would make a big difference.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 4,
    name: "Priya Nair",
    avatar: "PN",
    rating: 5,
    comment: "We needed reports in specific government-mandated formats and initially had to manually reformat the exports. The team added a custom template feature within a month of our request. Impressed by the responsiveness.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    avatar: "VJ",
    rating: 3,
    comment: "Integrating with our existing legacy GIS system was challenging — the API docs were thin at the time. Documentation has since improved significantly. The predictive models themselves are very accurate once set up.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 6,
    name: "Meera Iyer",
    avatar: "MI",
    rating: 5,
    comment: "We wanted finer control over alert thresholds per locality. The default settings triggered too many low-priority notifications initially. Custom threshold configuration was added and now it works perfectly for our workflow.",
    color: "bg-rose-100 text-rose-700",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} viewBox="0 0 20 20" className={`w-4 h-4 ${s <= rating ? "fill-amber-400" : "fill-gray-200"}`}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function AboutUs() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-gray-200 rounded-2xl p-10 md:p-14">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 tracking-tight">
            About Us...
          </h1>
          <div className="space-y-5 text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              The AI-Based Environmental Risk Prediction System is designed to support predictive,
              data-driven environmental decision-making for urban areas.
            </p>
            <p>
              Cities today face challenges such as rising temperatures, declining green cover, and
              increasing climate-related risks. While environmental data is widely available,
              converting it into meaningful and actionable insights remains a challenge.
            </p>
            <p>
              This platform combines satellite-based indicators, machine learning, and spatial
              analysis to generate locality-level risk assessments, future risk predictions, and
              decision-support insights.
            </p>
            <p>
              By moving beyond reactive monitoring, the system enables early risk identification
              and proactive urban planning, contributing to more resilient and sustainable cities.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "50+", label: "Cities Covered" },
              { value: "97%", label: "Prediction Accuracy" },
              { value: "15min", label: "Data Refresh Rate" },
            ].map((s) => (
              <div key={s.label} className="bg-white/60 rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-4xl mx-auto px-8 pb-20">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
          User Feedback
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => {
            const isOpen = expanded === r.id;
            return (
              <div
                key={r.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${r.color}`}>
                      {r.avatar}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  </div>
                  <StarRating rating={r.rating} />
                </div>

                <p className={`text-sm text-gray-600 leading-relaxed ${!isOpen ? "line-clamp-2" : ""}`}>
                  {r.comment}
                </p>

                <button
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  className="mt-2 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  {isOpen ? "Show less ↑" : "Read more ↓"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Rating Summary */}
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="text-center">
            <div className="text-5xl font-black text-gray-900">4.4</div>
            <StarRating rating={4} />
            <p className="text-xs text-gray-400 mt-1">Based on {reviews.length} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {[
              { stars: 5, count: 3 },
              { stars: 4, count: 2 },
              { stars: 3, count: 1 },
              { stars: 2, count: 0 },
              { stars: 1, count: 0 },
            ].map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-3">{stars}</span>
                <svg viewBox="0 0 20 20" className="w-3 h-3 fill-amber-400">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-2 rounded-full"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-3">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}