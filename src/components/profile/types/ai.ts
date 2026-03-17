export interface RecommendationItem {
  title: string;
  description: string;
}

export interface AIRecommendationResponse {
  resilience_state: string;
  recommendations: RecommendationItem[];
}
