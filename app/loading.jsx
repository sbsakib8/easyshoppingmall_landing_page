export default function loading() {
  return (
    <div className="w-full min-h-screen bg-black text-accent-content animate-pulse">

      {/* ================= NAVBAR ================= */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-accent-content/5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-xl"></div>
          <div>
            <div className="h-4 w-32 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 bg-gray-700 rounded-full"></div>
          <div className="h-9 w-20 bg-gray-700 rounded-full"></div>
        </div>
      </div>


      {/* ================= HERO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 sm:px-6 py-10 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* Badge */}
          <div className="h-5 w-40 bg-gray-700 rounded"></div>

          {/* Heading */}
          <div className="space-y-3">
            <div className="h-10 w-72 bg-gray-700 rounded"></div>
            <div className="h-10 w-64 bg-gray-700 rounded"></div>
          </div>

          {/* Description */}
          <div className="h-4 w-80 bg-gray-700 rounded"></div>

          {/* Button */}
          <div className="h-12 w-48 bg-gray-700 rounded-full"></div>

        </div>


        {/* RIGHT IMAGE / CARD */}
        <div className="relative">

          {/* Main Card */}
          <div className="w-full h-[300px] sm:h-[400px] bg-gray-700 rounded-2xl"></div>

          {/* Floating Badge */}
          <div className="absolute bottom-4 left-4 w-40 h-12 bg-gray-600 rounded-xl"></div>

        </div>

      </div>

    </div>
  );
}