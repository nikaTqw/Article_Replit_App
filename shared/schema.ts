import { pgTable, text, serial, integer, boolean, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rating: numeric("rating").notNull(),
  icon: text("icon").notNull(),
  contextTokens: text("context_tokens").notNull(),
  speed: text("speed").notNull(),
  pricePer1k: numeric("price_per_1k").notNull(),
  qualityScore: numeric("quality_score").notNull(),
  languages: text("languages").notNull(),
  isMultimodal: boolean("is_multimodal").notNull().default(false),
  isTop10: boolean("is_top_10").notNull().default(false),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  result: text("result").notNull(),
  content: text("content").notNull(),
  modelIcons: json("model_icons").$type<string[]>().notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertAiModelSchema = createInsertSchema(aiModels).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type AiModel = typeof aiModels.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
