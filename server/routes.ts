import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingCategories = await storage.getCategories();
  if (existingCategories.length === 0) {
    const catText = await storage.createCategory({ name: "Текстовые", slug: "text" });
    const catGraph = await storage.createCategory({ name: "Графические", slug: "graphics" });
    const catAudio = await storage.createCategory({ name: "Аудио/Видео", slug: "audio-video" });

    // Text Models
    await storage.createAiModel({
      categoryId: catText.id,
      name: "GPT-4",
      description: "Мощная универсальная модель от OpenAI",
      rating: "4.9",
      icon: "bot",
      contextTokens: "128K",
      speed: "40",
      pricePer1k: "0.03",
      qualityScore: "98",
      languages: "Многоязычная",
      isMultimodal: true,
      isTop10: true,
    });
    
    await storage.createAiModel({
      categoryId: catText.id,
      name: "Claude 3 Opus",
      description: "Продвинутая модель от Anthropic для сложных задач",
      rating: "4.8",
      icon: "cpu",
      contextTokens: "200K",
      speed: "35",
      pricePer1k: "0.015",
      qualityScore: "95",
      languages: "Многоязычная",
      isMultimodal: true,
      isTop10: true,
    });
    
    await storage.createAiModel({
      categoryId: catText.id,
      name: "YandexGPT",
      description: "Лучшая модель для русского языка",
      rating: "4.5",
      icon: "message-square",
      contextTokens: "32K",
      speed: "60",
      pricePer1k: "0.005",
      qualityScore: "85",
      languages: "RU, EN",
      isMultimodal: false,
      isTop10: false,
    });

    await storage.createAiModel({
      categoryId: catText.id,
      name: "Gemini Pro",
      description: "Модель от Google с глубокой интеграцией",
      rating: "4.6",
      icon: "zap",
      contextTokens: "32K",
      speed: "50",
      pricePer1k: "0.01",
      qualityScore: "88",
      languages: "Многоязычная",
      isMultimodal: true,
      isTop10: true,
    });

    // Graphics Models
    await storage.createAiModel({
      categoryId: catGraph.id,
      name: "Midjourney v6",
      description: "Лучшее качество художественных генераций",
      rating: "4.9",
      icon: "image",
      contextTokens: "-",
      speed: "0.5",
      pricePer1k: "0.05",
      qualityScore: "99",
      languages: "EN",
      isMultimodal: false,
      isTop10: true,
    });

    await storage.createAiModel({
      categoryId: catGraph.id,
      name: "DALL-E 3",
      description: "Отличное понимание контекста от OpenAI",
      rating: "4.7",
      icon: "image-plus",
      contextTokens: "-",
      speed: "0.8",
      pricePer1k: "0.04",
      qualityScore: "92",
      languages: "Многоязычная",
      isMultimodal: false,
      isTop10: true,
    });
    
    await storage.createAiModel({
      categoryId: catGraph.id,
      name: "Stable Diffusion XL",
      description: "Open-source лидер с полным контролем",
      rating: "4.6",
      icon: "brush",
      contextTokens: "-",
      speed: "2.0",
      pricePer1k: "0.01",
      qualityScore: "90",
      languages: "EN",
      isMultimodal: false,
      isTop10: true,
    });
    
    // Audio/Video Models
    await storage.createAiModel({
      categoryId: catAudio.id,
      name: "Sora",
      description: "Генерация видео по тексту от OpenAI",
      rating: "4.8",
      icon: "video",
      contextTokens: "-",
      speed: "0.1",
      pricePer1k: "1.5",
      qualityScore: "95",
      languages: "EN",
      isMultimodal: false,
      isTop10: true,
    });

    // Testimonials
    await storage.createTestimonial({
      name: "Анна",
      role: "Дизайнер",
      result: "60%",
      content: "Сократили время создания иллюстраций на 60% благодаря подбору оптимальной графической модели",
      modelIcons: ["image", "image-plus"],
    });

    await storage.createTestimonial({
      name: "Михаил",
      role: "Аналитик",
      result: "В 5 раз",
      content: "Ускорили анализ документов в 5 раз, выбрав GPT-4 для обработки текста",
      modelIcons: ["bot"],
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Call seed function
  seedDatabase().catch(console.error);

  app.get(api.categories.list.path, async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get(api.aiModels.list.path, async (req, res) => {
    try {
      const input = api.aiModels.list.input?.parse(req.query);
      const models = await storage.getAiModels(input?.categoryId);
      res.json(models);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });

  return httpServer;
}
