import { useTestimonials } from "@/hooks/use-testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { IconMapper } from "@/components/ui/IconMapper";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();

  if (isLoading || testimonials.length === 0) {
    return null; // Skip rendering if no data or loading to keep it clean
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Как нейросети меняют рабочие процессы</h2>
          <p className="text-lg text-muted-foreground">Реальные кейсы использования ИИ в бизнесе и повседневных задачах</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <Card key={test.id} className="premium-shadow border-border/50 bg-white relative overflow-hidden group">
              {/* Decorative quote icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/5 -rotate-12 group-hover:text-primary/10 transition-colors duration-300" />
              
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="inline-block px-4 py-1.5 bg-green-500/10 text-green-600 rounded-lg font-bold text-lg mb-4">
                    {test.result}
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    "{test.content}"
                  </p>
                </div>
                
                <div className="flex items-end justify-between mt-8 pt-6 border-t border-border/50">
                  <div>
                    <h4 className="font-bold text-foreground">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.role}</p>
                  </div>
                  
                  <div className="flex gap-[-8px]">
                    {test.modelIcons.map((iconName, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-white border border-border shadow-sm flex items-center justify-center -ml-2 first:ml-0 relative z-10"
                        title={iconName}
                      >
                        <IconMapper name={iconName} className="w-4 h-4 text-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
