interface Review {
  id: string;
  region: string;
  street_lightening: number;
  public_toilets: number;
  menstrual_products: number;
  safe_transport: number;
  childcare_access: number;
  comment: string;
  image_url?: string;
  created_at: string;
}

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const average =
    (review.street_lightening +
      review.public_toilets +
      review.menstrual_products +
      review.safe_transport +
      review.childcare_access) /
    5;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{review.region}</h3>
          <p className="text-yellow-500">⭐ {average.toFixed(1)}/5</p>
        </div>

        <p className="text-sm text-gray-400">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>

      <p className="mt-4">{review.comment}</p>

      {review.image_url && (
        <img
          src={review.image_url}
          alt="Review"
          className="mt-4 rounded-xl w-full h-56 object-cover"
        />
      )}
    </div>
  );
}
