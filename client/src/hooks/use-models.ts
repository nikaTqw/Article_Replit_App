import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type AiModel } from "@shared/schema";

export function useModels(categoryId?: number) {
  return useQuery<AiModel[]>({
    queryKey: [api.aiModels.list.path, categoryId],
    queryFn: async () => {
      let url = api.aiModels.list.path;
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch models");
      const data = await res.json();
      return api.aiModels.list.responses[200].parse(data);
    },
  });
}
