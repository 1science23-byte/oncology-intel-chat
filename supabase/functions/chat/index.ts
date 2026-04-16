import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { query } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: "No query provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const normalizedQuery = query.toLowerCase().trim();

    // 1. Database Search
    // Using simple text matching for this implementation
    const { data: matches, error: searchError } = await supabaseClient
      .from("cancer_qa")
      .select("*");

    if (searchError) throw searchError;

    let bestMatch = null;
    let maxScore = 0;

    for (const item of (matches || [])) {
      const q = item.question.toLowerCase();
      let score = 0;
      if (q === normalizedQuery) score += 100;
      if (q.includes(normalizedQuery)) score += 50;
      if (normalizedQuery.includes(q)) score += 40;
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    let responseText = "";
    let isFallback = false;

    if (bestMatch && maxScore >= 40) {
      responseText = bestMatch.answer;
    } else {
      // 2. AI Fallback (Simulated, as requested in original chat-service)
      isFallback = true;
      const fallbacks = [
        "Based on medical literature, this query requires specialized clinical context. Please consult your oncologist.",
        "Our primary database doesn't have a direct match. The AI suggests consulting a professional for diagnostic imaging.",
        "The AI Group engine indicates research in this area is evolving. We recommend seeking a second opinion.",
        "I couldn't find a direct answer. Please specify the type of cancer for a more accurate response."
      ];
      responseText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // 3. Log Interaction
    await supabaseClient.from("chat_messages").insert({
      query: query,
      response: responseText,
      is_fallback: isFallback
    });

    return new Response(JSON.stringify({ text: responseText, isFallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});