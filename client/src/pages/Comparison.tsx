import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ComparisonTable from "@/components/sections/ComparisonTable";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Comparison() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-1 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="mr-2 w-4 h-4" /> На главную
            </Button>
          </Link>
        </div>
        <ComparisonTable />
      </main>
      <Footer />
    </div>
  );
}
