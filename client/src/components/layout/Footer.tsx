import { Brain } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Neuro<span className="text-primary">Compare</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Объективное сравнение нейросетей для любых задач. Выбирайте идеальную модель по качеству, скорости и стоимости.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Продукт</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Каталог моделей</Link></li>
              <li><Link href="/comparison" className="hover:text-primary transition-colors">Сравнение таблицей</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Цены API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Компания</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">О проекте</Link></li>
              <li><Link href="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 NeuroCompare. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
