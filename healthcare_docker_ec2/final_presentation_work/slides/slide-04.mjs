import { bg, footer, kicker, node, rect, style, text, title } from "./shared.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Architecture", 4);
  title(slide, ctx, "The cloud architecture separates browser access, container runtime, AI models, and external LLM calls.");
  const y = 292;
  node(slide, ctx, "User browser", "Uploads sample clinical conversation and views dashboard", 62, y, 210, 112, style.white, style.accent);
  node(slide, ctx, "AWS EC2", "Cloud compute instance hosting containerized app", 324, y, 230, 112, style.white, style.accent2);
  node(slide, ctx, "Docker container", "Python, Streamlit, model dependencies, app code", 606, y, 250, 112, style.white, style.accent3);
  node(slide, ctx, "AI/NLP pipeline", "Whisper, VADER, spaCy, speaker model, embeddings", 908, y, 286, 112, style.white, style.accent);
  rect(slide, ctx, 196, y + 53, 80, 3, style.accent);
  rect(slide, ctx, 544, y + 53, 70, 3, style.accent2);
  rect(slide, ctx, 846, y + 53, 70, 3, style.accent3);
  rect(slide, ctx, 606, 480, 250, 80, style.dark);
  text(slide, ctx, "Groq LLM API", 632, 504, 190, 22, { size: 16, color: style.white, bold: true, align: "center" });
  text(slide, ctx, "Summaries and Q&A", 632, 532, 190, 18, { size: 10, color: "#CFE2DC", align: "center" });
  rect(slide, ctx, 730, 404, 3, 76, style.accent);
  text(slide, ctx, "Deployment controls: .env secrets, EC2 security group, port 8501", 62, 590, 1020, 28, { size: 14, color: style.soft });
  footer(slide, ctx, 4);
  return slide;
}
