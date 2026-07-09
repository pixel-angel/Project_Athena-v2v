import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-full mx-auto px-6 py-20 bg-[#fff5f7]">
      {/* Badge */}
      <div className="flex justify-center">
        <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-medium text-pink-600">
          🏆 IEEE SHE Aspire 3.0 - Vibe2Vision Hackathon
        </span>
      </div>

      {/* Heading */}
      <div className="mt-8 text-center">
        <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
          Rate What Actually
          <br />
          <span className="text-pink-600">Matters for Women</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Discover safer, cleaner and more accessible places through
          community-driven reviews. Find regions based on lighting, transport,
          public toilets, childcare and more.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-center gap-5">
        <button className="rounded-xl bg-violet-700 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-violet-800 cursor-pointer">
          <Link href="/map">Explore Map</Link>
        </button>

        <button className="rounded-xl border-2 border-pink-600 px-8 py-3 font-semibold text-pink-600 transition hover:bg-[#f3e5f5] cursor-pointer">
          Write a Review
        </button>
      </div>

      {/* Cards */}
      <div className="mt-20 grid gap-8 md:grid-cols-2 ml-10 mr-10">
        {/* Map Preview */}
        <div className="rounded-3xl border bg-white p-8 shadow-lg ">
          <div className="mb-6 flex items-center gap-3 ">
            <span className="text-3xl">🗺️</span>
            <h2 className="text-2xl font-bold text-violet-700">Explore Map</h2>
          </div>

          <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100">
            <p className="text-lg font-semibold text-gray-600">
              Interactive Map Preview
            </p>
          </div>

          <p className="mt-5 text-gray-600">
            Browse cities and explore accessibility scores based on real
            community reviews.
          </p>
        </div>

        {/* Bot Card */}
        <div className="rounded-3xl border bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <h2 className="text-2xl font-bold text-violet-700">Ask Our Bot</h2>
          </div>

          <div className="flex h-64 flex-col justify-center rounded-2xl bg-gray-50 px-6">
            <p className="rounded-xl bg-white p-4 shadow">
              Compare Pune and Bangalore
            </p>

            <p className="mt-4 rounded-xl bg-white p-4 shadow">
              Which city has better lighting?
            </p>

            <button className="mt-8 w-fit rounded-lg bg-pink-600 px-5 py-2 font-medium text-white hover:bg-pink-700">
              Ask a Question →
            </button>
          </div>

          <p className="mt-5 text-gray-600">
            Ask questions in natural language and compare cities using
            community-driven accessibility data.
          </p>
        </div>
      </div>
    </section>
  );
}
