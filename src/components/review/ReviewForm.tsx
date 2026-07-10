"use client";

import { cities } from "@/constants/cities";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import StarRating from "./StarRating";

export default function ReviewForm() {
  const [region, setRegion] = useState("");

  const [streetLighting, setStreetLighting] = useState(0);
  const [publicToilets, setPublicToilets] = useState(0);
  const [menstrualProducts, setMenstrualProducts] = useState(0);
  const [safeTransport, setSafeTransport] = useState(0);
  const [childcareAccess, setChildcareAccess] = useState(0);

  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      // Upload image if selected
      if (photo) {
        const fileName = `${Date.now()}-${photo.name}`;

        const { error: uploadError } = await supabase.storage
          .from("review-images")
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("review-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Save review to database
      const { error } = await supabase.from("Reviews").insert([
        {
          region,
          street_lightening: streetLighting,
          public_toilets: publicToilets,
          menstrual_products: menstrualProducts,
          safe_transport: safeTransport,
          childcare_access: childcareAccess,
          comment,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      alert("✅ Review submitted successfully!");

      // Reset form
      setRegion("");
      setStreetLighting(0);
      setPublicToilets(0);
      setMenstrualProducts(0);
      setSafeTransport(0);
      setChildcareAccess(0);
      setComment("");
      setPhoto(null);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("❌ Failed to submit review.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#ECE7F6] shadow-sm p-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submit a Review</h1>

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
          value={region}
          onChange={(e) => setRegion(e.target.value)}
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

          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
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
        <StarRating
          icon="💡"
          label="Street Lighting"
          rating={streetLighting}
          setRating={setStreetLighting}
        />

        <StarRating
          icon="🚻"
          label="Public Toilets"
          rating={publicToilets}
          setRating={setPublicToilets}
        />

        <StarRating
          icon="🩸"
          label="Menstrual Products"
          rating={menstrualProducts}
          setRating={setMenstrualProducts}
        />

        <StarRating
          icon="🚌"
          label="Safe Transport"
          rating={safeTransport}
          setRating={setSafeTransport}
        />

        <StarRating
          icon="👶"
          label="Childcare Access"
          rating={childcareAccess}
          setRating={setChildcareAccess}
        />
      </div>

      {/* Experience */}

      <div className="mt-8">
        <label className="block mb-2 font-semibold text-gray-800">
          📝 Share your experience
        </label>

        <textarea
          rows={6}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
          <div className="text-5xl mb-3">📷</div>

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
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {/* Button */}

      <button
        type="button"
        onClick={handleSubmit}
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
