import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import { Link } from "wouter";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useModels } from "@/hooks/use-models";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl">
        <p className="font-bold text-foreground flex items-center gap-2 mb-2">
          {data.name}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Качество:</span> {data.y}/10
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Цена (1K токенов):</span> ${data.x}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function Hero() {
  const { data: models = [], isLoading } = useModels();

  // Prepare chart data: filtering out ones without proper numerical values
  const chartData = models
    .filter(m => m.isTop10 && parseFloat(m.pricePer1k) > 0 && parseFloat(m.qualityScore) > 0)
    .map(m => ({
      name: m.name,
      x: parseFloat(m.pricePer1k),
      y: parseFloat(m.qualityScore),
      color: "#4A6CF7",
    }));

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-70 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-70 -translate-x-1/3 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Activity className="w-4 h-4" />
              <span>Актуальные данные на 2025 год</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 text-balance">
              Объективное сравнение нейросетей для <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">любых задач</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-xl leading-relaxed">
              Выбирайте идеальную модель по качеству, скорости и стоимости. Все популярные нейросети в одном месте, с честными бенчмарками и реальными отзывами.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog">
                <Button size="lg" className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  Перейти в каталог
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/comparison">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-2 border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl w-full sm:w-auto transition-all">
                  Сравнить модели
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground font-medium">
              Бесплатно. Без регистрации. 3 тестовых запроса в день.
            </p>
          </motion.div>

          {/* Right Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-6 lg:p-8 premium-shadow">
              <h3 className="text-lg font-bold text-foreground mb-1">Соотношение цена / качество</h3>
              <p className="text-sm text-muted-foreground mb-6">Топ-10 моделей (Чем выше и левее, тем лучше)</p>
              
              <div className="h-[350px] w-full relative">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Цена" 
                        unit="$" 
                        stroke="#64748B" 
                        fontSize={12} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Качество" 
                        domain={['dataMin - 1', 10]} 
                        stroke="#64748B" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                      <Scatter name="Models" data={chartData} fill="#4A6CF7">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-border rounded-xl">
                    <p className="text-muted-foreground">Недостаточно данных для графика</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
