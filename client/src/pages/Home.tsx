import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CategoryTabs from "@/components/sections/CategoryTabs";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryTabs />
        <ComparisonTable />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
