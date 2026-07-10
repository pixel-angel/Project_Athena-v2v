import ReviewCard from "./ReviewCard";

interface Review {
  comment: string;

  date: string;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-5">Community Reviews</h2>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              comment={review.comment}
              date={review.date}
            />
          ))
        )}
      </div>
    </div>
  );
}
