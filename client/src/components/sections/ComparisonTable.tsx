import { useState } from "react";
import { useModels } from "@/hooks/use-models";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IconMapper } from "@/components/ui/IconMapper";
import { Badge } from "@/components/ui/badge";

export default function ComparisonTable() {
  const { data: allModels = [], isLoading } = useModels();
  const [filterMultimodal, setFilterMultimodal] = useState(false);
  const [filterTop10, setFilterTop10] = useState(false);

  const displayedModels = allModels.filter(m => {
    if (filterMultimodal && !m.isMultimodal) return false;
    if (filterTop10 && !m.isTop10) return false;
    return true;
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end md:items-end gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3 text-foreground">Сравните характеристики</h2>
            <p className="text-muted-foreground">Детальная таблица спецификаций для осознанного выбора</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 bg-secondary/50 p-4 rounded-xl border border-border">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="multimodal" 
                checked={filterMultimodal} 
                onCheckedChange={(c) => setFilterMultimodal(c as boolean)} 
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="multimodal" className="font-medium cursor-pointer">Только мультимодальные</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="top10" 
                checked={filterTop10} 
                onCheckedChange={(c) => setFilterTop10(c as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="top10" className="font-medium cursor-pointer">Топ-10 моделей</Label>
            </div>
          </div>
        </div>

        <div className="border border-border/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[250px] font-semibold text-foreground py-4">Модель</TableHead>
                  <TableHead className="font-semibold text-foreground">Контекст (токенов)</TableHead>
                  <TableHead className="font-semibold text-foreground">Скорость</TableHead>
                  <TableHead className="font-semibold text-foreground">Цена (1K ток.)</TableHead>
                  <TableHead className="font-semibold text-foreground">Качество (1-10)</TableHead>
                  <TableHead className="font-semibold text-foreground">Языки</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                      Загрузка данных...
                    </TableCell>
                  </TableRow>
                ) : displayedModels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Нет моделей, удовлетворяющих фильтрам
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedModels.map((model) => (
                    <TableRow key={model.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/5 text-primary">
                            <IconMapper name={model.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{model.name}</p>
                            {model.isMultimodal && (
                              <span className="text-[10px] font-medium uppercase tracking-wider text-primary">Multimodal</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{model.contextTokens}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal bg-white">
                          {model.speed}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">${parseFloat(model.pricePer1k).toFixed(4)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(parseFloat(model.qualityScore) / 10) * 100}%` }}
                            />
                          </div>
                          <span className="font-medium text-sm">{parseFloat(model.qualityScore).toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{model.languages}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </section>
  );
}
