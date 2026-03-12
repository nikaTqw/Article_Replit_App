import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/catalog", label: "Каталог моделей" },
    { href: "/comparison", label: "Сравнение" },
    { href: "/pricing", label: "Цены" },
    { href: "/about", label: "О проекте" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Neuro<span className="text-primary">Compare</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link href="/catalog" className="hidden sm:block">
              <Button variant="ghost" className="font-medium hover:text-primary hover:bg-primary/5">
                Войти
              </Button>
            </Link>
            <Link href="/catalog">
              <Button className="font-semibold bg-gradient-to-r from-primary to-[#6B85F9] shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-xl px-6">
                Начать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
