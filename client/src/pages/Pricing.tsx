import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, ArrowLeft } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Идеально для тестирования",
      features: ["3 запроса в день", "Доступ к 5 базовым моделям", "Стандартная скорость", "Поддержка сообщества"],
      cta: "Начать бесплатно",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/мес",
      description: "Для регулярных задач",
      features: ["Безлимитные базовые запросы", "Доступ ко всем моделям", "Высокая приоритетность API", "Email поддержка"],
      cta: "Оформить подписку",
      popular: true
    },
    {
      name: "Enterprise",
      price: "По запросу",
      description: "Для крупного бизнеса",
      features: ["Индивидуальные лимиты", "SLA гарантии", "Выделенный сервер", "Персональный менеджер"],
      cta: "Связаться с нами",
      popular: false
    }
  ];

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
          
          <div className="text-center max-w-3xl mx-auto mt-8 mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Простые и прозрачные цены</h1>
            <p className="text-xl text-muted-foreground">
              Платите только за то, что используете. Без скрытых платежей.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
            {plans.map((plan, i) => (
              <Card key={i} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Популярный
                  </div>
                )}
                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-1">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button 
                    className={`w-full h-12 text-base font-semibold rounded-xl ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                    variant={plan.popular ? "default" : "secondary"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
