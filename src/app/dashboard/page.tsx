"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();

  const region = searchParams.get("region");

  return (
    <div>
      <h1>{region}</h1>
    </div>
  );
}
