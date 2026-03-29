import { Search } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className="space-y-5 animate-pulse">

      {/* ================= HEADER ================= */}
      <div>
        <div className="h-6 sm:h-7 md:h-8 w-56 bg-gray-700 rounded"></div>
        <div className="h-3 w-40 bg-gray-700 rounded mt-2"></div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
          <div className="w-full h-9 sm:h-10 bg-[#11151c] border border-accent-content/5 rounded-lg"></div>
        </div>
      </div>


      {/* ================= MOBILE SKELETON ================= */}
      <div className="block xl:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3">

            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-700 rounded"></div>
              <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
            </div>

            <div className="h-4 w-40 bg-gray-700 rounded"></div>

            <div className="h-3 w-32 bg-gray-700 rounded"></div>
            <div className="h-3 w-28 bg-gray-700 rounded"></div>

            <div className="h-4 w-24 bg-gray-700 rounded"></div>

            <div className="flex justify-end gap-2 pt-2">
              <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
              <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
            </div>

          </div>
        ))}
      </div>


      {/* ================= DESKTOP TABLE SKELETON ================= */}
      <div className="hidden xl:block bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden">

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-[#0a0c12] border-b border-accent-content/5">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-20 bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-accent-content/5">

                  <td className="px-6 py-4">
                    <div className="h-3 w-16 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-3 w-24 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-3 w-28 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                      <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  )
}

export default loading