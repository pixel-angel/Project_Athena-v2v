"use client";

import StarRating from "./StarRating";

export default function ReviewForm() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#ECE7F6] shadow-sm p-8">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Submit a Review
        </h1>

        <p className="mt-2 text-gray-600">
          Help others by sharing your accessibility experience.
        </p>
      </div>

      {/* Region */}

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-800">
          📍 Region / Area
        </label>

        <select
          className="
          w-full
          rounded-2xl
          border
          border-[#DDD6F3]
          bg-white
          px-4
          py-3
          text-gray-700
          outline-none
          focus:ring-2
          focus:ring-[#8B5CF6]
          "
        >
          <option value="">Select Region</option>
          <option>North Delhi</option>
          <option>South Delhi</option>
          <option>East Delhi</option>
          <option>West Delhi</option>
        </select>
      </div>

      {/* Anonymous Notice */}

      <div
        className="
        bg-[#F4ECFF]
        rounded-2xl
        p-4
        mb-8
        border
        border-[#E6DDFB]
        "
      >
        <p className="text-[#7C3AED] text-sm">
          💜 Anonymous reviews are encouraged for honest accessibility feedback.
        </p>
      </div>

      {/* Ratings */}

      <div className="space-y-4">
        <StarRating icon="💡" label="Street Lighting" />
        <StarRating icon="🚻" label="Public Toilets" />
        <StarRating icon="🩸" label="Menstrual Products" />
        <StarRating icon="🚌" label="Safe Transport" />
        <StarRating icon="👶" label="Childcare Access" />
      </div>

      {/* Experience */}

      <div className="mt-8">
        <label className="block mb-2 font-semibold text-gray-800">
          📝 Share your experience
        </label>

        <textarea
          rows={6}
          placeholder="Tell us about accessibility in this area..."
          className="
          w-full
          rounded-2xl
          border
          border-[#DDD6F3]
          p-4
          resize-none
          text-gray-700
          placeholder:text-gray-500
          outline-none
          focus:ring-2
          focus:ring-[#8B5CF6]
          "
        />
      </div>

      {/* Upload */}

      <div className="mt-8">
        <label className="block mb-3 font-semibold text-gray-800">
          📷 Upload Photo (Optional)
        </label>

        <label
          htmlFor="photoUpload"
          className="
          flex
          h-52
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-[#D9D0F6]
          bg-[#FCFBFF]
          transition
          hover:bg-[#F8F5FF]
          hover:border-[#8B5CF6]
          "
        >
          <div className="text-5xl mb-3">
            📷
          </div>

          <p className="font-medium text-gray-700">
            Click to upload or drag & drop
          </p>

          <p className="text-sm text-gray-500 mt-1">
            PNG, JPG or JPEG (Max 5 MB)
          </p>

          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>

      {/* Button */}

      <button
        className="
        mt-10
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-[#8B5CF6]
        to-[#7C3AED]
        py-4
        text-lg
        font-semibold
        text-white
        transition
        hover:scale-[1.02]
        hover:shadow-xl
        active:scale-95
        "
      >
        Submit Review
      </button>

    </div>
  );
}