import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryTabs from "@/components/sections/CategoryTabs";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Catalog() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="mr-2 w-4 h-4" /> На главную
            </Button>
          </Link>
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Каталог моделей ИИ</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Полный список всех доступных нейросетей. Фильтруйте по категориям и находите идеальный инструмент для ваших проектов.
            </p>
          </div>
        </div>
        <CategoryTabs />
      </main>
      <Footer />
    </div>
  );
}
