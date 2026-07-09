"use client";

import { useState } from "react";

type StarRatingProps = {
  icon: string;
  label: string;
};

export default function StarRating({
  icon,
  label,
}: StarRatingProps) {

  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white border border-[#ECE7F6] rounded-2xl p-5 shadow-sm">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-[#F4ECFF] flex items-center justify-center text-xl">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {label}
            </h3>

            <p className="text-sm text-gray-500">
              Rate from 1 to 5
            </p>
          </div>

        </div>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`
                w-10
                h-10
                rounded-xl
                border
                font-semibold
                transition
                ${
                  star <= rating
                    ? "bg-yellow-400 border-yellow-400 text-white"
                    : "bg-white border-[#DDD6F3] text-gray-600 hover:bg-yellow-300 hover:border-yellow-300"
                }
              `}
            >
              {star}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}