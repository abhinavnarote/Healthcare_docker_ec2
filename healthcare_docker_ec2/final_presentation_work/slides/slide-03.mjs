import { bg, footer, kicker, node, style, table, text, title } from "./shared.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Solution", 3);
  title(slide, ctx, "Uploaded conversations become structured clinical intelligence.", 82, 33, 920);
  text(slide, ctx, "The Streamlit interface connects file upload, NLP processing, ML classification, retrieval, and LLM output in one workflow.", 58, 190, 920, 40, { size: 14.5, color: style.soft });
  node(slide, ctx, "Upload", ".txt or .mp3 conversation", 70, 288, 220, 102, style.white, style.accent);
  node(slide, ctx, "Analyze", "Transcription, sentiment, entities, speaker role", 370, 288, 260, 102, style.white, style.accent2);
  node(slide, ctx, "Summarize", "Groq LLM creates structured clinical summary", 710, 288, 250, 102, style.white, style.accent3);
  node(slide, ctx, "Ask", "RAG-style Q&A over retrieved transcript context", 1020, 288, 220, 102, style.white, style.accent);
  table(slide, ctx, 110, 462, [230, 300, 520], [
    ["Layer", "Tool", "Project output"],
    ["Speech-to-text", "Whisper", "Audio converted into transcript"],
    ["NLP", "VADER + spaCy", "Sentiment and key entities"],
    ["ML + retrieval", "TF-IDF, Logistic Regression, Sentence Transformers", "Speaker labels and semantic context"],
    ["LLM", "Groq llama-3.3-70b-versatile", "Summary, action items, Q&A"],
  ], { rowH: 36 });
  footer(slide, ctx, 3);
  return slide;
}
