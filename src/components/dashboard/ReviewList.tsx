import ReviewCard from "./ReviewCard";

export default function ReviewList({
  reviews,
}: {
  reviews: any[];
}) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-5">
        Community Reviews
      </h2>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              comment={review.comment}
              date={new Date(review.created_at).toLocaleDateString()}
            />
          ))
        )}
      </div>
    </div>
  );
}