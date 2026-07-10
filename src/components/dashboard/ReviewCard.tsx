interface Props {
  comment: string;

  date: string;
}

export default function ReviewCard({
  comment,

  date,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <div className="flex justify-between">
        <div className="text-yellow-500">★★★★★</div>

        <p className="text-sm text-gray-400">{date}</p>
      </div>

      <p className="mt-4 text-gray-700">{comment}</p>
    </div>
  );
}
