interface Props {
  region: string;
  score: number;
}

export default function DashboardHeader({ region, score }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8">
      <p className="text-gray-500">Region Dashboard</p>

      <h1 className="text-4xl font-bold mt-2">📍 {region}</h1>

      <div className="mt-4 flex items-center gap-4">
        <span className="text-5xl font-bold text-violet-600">
          {score.toFixed(1)}
        </span>

        <span className="text-xl text-gray-500">/5 Community Score</span>
      </div>
    </div>
  );
}
