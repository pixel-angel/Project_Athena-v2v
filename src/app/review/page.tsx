import ReviewForm from "@/components/review/ReviewForm";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer";

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      <Navbar />
    <main className="min-h-screen bg-[#FFF5F2] py-12 px-5">
      <ReviewForm />
    </main>
      <Footer />
    </div>
  );
}