import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with accent color */}
      <div className="absolute inset-0 bg-primary z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Начните тестировать нейросети прямо сейчас
        </h2>
        
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Сравнивайте, выбирайте и интегрируйте лучшие модели для своих задач. Один API-ключ для доступа ко всем нейросетям.
        </p>
        
        <div className="flex flex-col items-center">
          <Link href="/catalog">
            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-xl rounded-xl transition-transform hover:-translate-y-1">
              Начать тестирование
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-white/60 font-medium">
            Бесплатно, без регистрации, 3 тестовых запроса в день
          </p>
        </div>
      </div>
    </section>
  );
}
