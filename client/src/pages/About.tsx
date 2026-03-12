import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, ShieldCheck, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="mr-2 w-4 h-4" /> На главную
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto mt-8 mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8">О проекте NeuroCompare</h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-16">
              <p className="lead text-xl text-foreground font-medium mb-6">
                Наша миссия — сделать выбор ИИ-моделей простым, прозрачным и основанным на реальных данных.
              </p>
              <p className="mb-6">
                В мире, где каждую неделю появляются новые нейросети, разработчикам и бизнесу все сложнее ориентироваться. Какая модель лучше пишет код? Какая дешевле для обработки больших текстов? NeuroCompare агрегирует бенчмарки, цены и отзывы, чтобы дать объективный ответ.
              </p>
              <p>
                Мы не просто собираем данные с официальных сайтов. Наш сервис ежедневно проводит автоматизированное тестирование API-провайдеров для измерения реальной скорости и стабильности ответов.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-secondary/40 p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Объективность</h3>
                <p className="text-muted-foreground">Независимые тесты и бенчмарки без предвзятости к крупным вендорам.</p>
              </div>
              <div className="bg-secondary/40 p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Актуальность</h3>
                <p className="text-muted-foreground">Цены и характеристики обновляются в реальном времени.</p>
              </div>
              <div className="bg-secondary/40 p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Единый доступ</h3>
                <p className="text-muted-foreground">Интеграция с десятками провайдеров через один универсальный API.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
