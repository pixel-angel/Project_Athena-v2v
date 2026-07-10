import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  region: string;
  street_lightening: number;
  public_toilets: number;
  menstrual_products: number;
  safe_transport: number;
  childcare_access: number;
  comment: string;
  image_url: string;
  created_at: string;
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-5">
        Community Reviews
      </h2>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))
        )}
      </div>
    </div>
  );
}