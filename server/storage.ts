import { db } from "./db";
import {
  categories,
  aiModels,
  testimonials,
  type Category,
  type InsertCategory,
  type AiModel,
  type InsertAiModel,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getAiModels(categoryId?: number): Promise<AiModel[]>;
  getTestimonials(): Promise<Testimonial[]>;
  
  createCategory(category: InsertCategory): Promise<Category>;
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getAiModels(categoryId?: number): Promise<AiModel[]> {
    if (categoryId) {
      return await db.select().from(aiModels).where(eq(aiModels.categoryId, categoryId));
    }
    return await db.select().from(aiModels);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [created] = await db.insert(categories).values(category).returning();
    return created;
  }

  async createAiModel(model: InsertAiModel): Promise<AiModel> {
    const [created] = await db.insert(aiModels).values(model).returning();
    return created;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(testimonial).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
