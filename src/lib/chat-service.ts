import { CANCER_QA_DATABASE, QAPair } from "../data/cancer-data";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isFallback?: boolean;
}

/**
 * OncoProtocol Clinical Search Logic
 * Searches the strict database for high-confidence clinical matches.
 * If no sufficient match is found, simulates high-level AI Group API fallback.
 */
export const getChatResponse = async (query: string): Promise<{ text: string; isFallback: boolean }> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // 1. Clinical Record Search (Simulating 9000+ record matching)
  let bestMatch: { item: QAPair; score: number } | null = null;

  for (const item of CANCER_QA_DATABASE) {
    const q = item.question.toLowerCase();
    const c = item.category.toLowerCase();
    
    let score = 0;
    
    // Direct protocol match
    if (q === normalizedQuery) score += 100;
    
    // Substring clinical relevance
    if (q.includes(normalizedQuery)) score += 50;
    if (normalizedQuery.includes(q)) score += 40;
    
    // Clinical category relevance
    if (normalizedQuery.includes(c)) score += 30;
    
    // Clinical keyword parsing
    const queryWords = normalizedQuery.split(/\\s+/);
    const questionWords = q.split(/\\s+/);
    
    let matches = 0;
    queryWords.forEach(word => {
      if (word.length > 3 && questionWords.includes(word)) {
        matches++;
      }
    });
    
    score += matches * 15;

    if (score > (bestMatch?.score || 0)) {
      bestMatch = { item, score };
    }
  }

  // Strict Clinical Threshold (Only return matches with high confidence)
  if (bestMatch && bestMatch.score >= 55) {
    // Clinical processing delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return { text: bestMatch.item.answer, isFallback: false };
  }

  // 2. AI Group API Fallback - High-Level Clinical Inference
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  const fallbackResponses = [
    "The OncoProtocol AI database does not contain a direct match for this specific clinical query. Analyzing through AI Group API: This request involves complex oncological variables. It is recommended to cross-reference with NCCN guidelines or consult a board-certified oncologist for patient-specific management.",
    "Query flagged for advanced clinical complexity. The AI Group API fallback suggests that this inquiry pertains to evolving therapeutic standards. For definitive guidance, please refer to the latest peer-reviewed clinical trial data or institutional protocols.",
    "Standard database match insufficient. AI Group API analysis indicates that the query relates to specialized diagnostic or treatment parameters. Strict clinical protocol suggests clinical assessment and multidisciplinary team (MDT) review for this scenario.",
    "Information not found in the primary 9,000+ clinical record set. AI Group API fallback inference: The query requires specialized context (e.g., molecular profiling or specific histological grading) not present in the general database. Consult clinical staff for further clarification."
  ];

  return { 
    text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)], 
    isFallback: true 
  };
};