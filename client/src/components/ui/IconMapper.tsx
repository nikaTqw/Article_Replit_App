import { Brain, Cpu, MessageSquare, Image as ImageIcon, Video, Zap, Sparkles, Bot, Fingerprint, Activity } from "lucide-react";

export function IconMapper({ name, className }: { name: string, className?: string }) {
  const normalized = name.toLowerCase();
  
  if (normalized.includes("text") || normalized.includes("message") || normalized.includes("bot")) {
    return <MessageSquare className={className} />;
  }
  if (normalized.includes("image") || normalized.includes("vision")) {
    return <ImageIcon className={className} />;
  }
  if (normalized.includes("audio") || normalized.includes("video")) {
    return <Video className={className} />;
  }
  if (normalized.includes("speed") || normalized.includes("fast")) {
    return <Zap className={className} />;
  }
  if (normalized.includes("brain") || normalized.includes("intel")) {
    return <Brain className={className} />;
  }
  if (normalized.includes("cpu") || normalized.includes("compute")) {
    return <Cpu className={className} />;
  }
  
  // Default fallback
  return <Sparkles className={className} />;
}
