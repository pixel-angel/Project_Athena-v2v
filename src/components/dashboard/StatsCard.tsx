interface Props {
  // overall: number;

  reviews: number;

  strongest: string;

  weakest: string;
}

export default function StatsCards({
  // overall,

  reviews,

  strongest,

  weakest,
}: Props) {
  const cards = [
    // {
    //   title: "Overall",

    //   value: overall.toFixed(1),
    // },

    {
      title: "Reviews",

      value: reviews,
    },

    {
      title: "Strongest",

      value: strongest,
    },

    {
      title: "Needs Attention",

      value: weakest,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mt-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500">{card.title}</p>

          <h2 className="text-3xl font-bold mt-2 text-violet-700">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
