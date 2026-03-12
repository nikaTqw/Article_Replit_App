import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { IconMapper } from "@/components/ui/IconMapper";
import { useCategories } from "@/hooks/use-categories";
import { useModels } from "@/hooks/use-models";
import { Badge } from "@/components/ui/badge";

export default function CategoryTabs() {
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const [activeCategoryId, setActiveCategoryId] = useState<number | undefined>(undefined);
  
  // Initialize active tab once categories load
  if (!activeCategoryId && categories.length > 0) {
    setActiveCategoryId(categories[0].id);
  }

  const { data: models = [], isLoading: modelsLoading } = useModels(activeCategoryId);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Популярные модели по категориям</h2>
          <p className="text-muted-foreground">Исследуйте лучшие решения для генерации текста, создания изображений и работы с аудио</p>
        </div>

        {catsLoading ? (
          <div className="flex justify-center mb-8"><div className="w-48 h-10 bg-muted animate-pulse rounded-lg"></div></div>
        ) : (
          <div className="flex justify-center mb-12">
            <Tabs value={String(activeCategoryId)} onValueChange={(val) => setActiveCategoryId(Number(val))}>
              <TabsList className="h-14 p-1 bg-background border border-border shadow-sm rounded-2xl">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={String(cat.id)}
                    className="h-full px-6 rounded-xl font-medium data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="min-h-[400px]">
          {modelsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="h-64 animate-pulse bg-muted/50 border-border/50" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategoryId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {models.slice(0, 8).map((model) => (
                  <Card key={model.id} className="premium-shadow overflow-hidden group border-border/60 bg-white">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                        <IconMapper name={model.icon} className="w-6 h-6" />
                      </div>
                      
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-foreground line-clamp-1">{model.name}</h3>
                        <div className="flex items-center gap-1 bg-amber-100/50 text-amber-700 px-2 py-1 rounded-md text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {parseFloat(model.rating).toFixed(1)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
                        {model.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium">
                          {model.speed}
                        </Badge>
                        {model.isMultimodal && (
                          <Badge variant="outline" className="border-primary/20 text-primary">
                            Мультимодальная
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {models.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                    Нет доступных моделей в этой категории.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        
      </div>
    </section>
  );
}
