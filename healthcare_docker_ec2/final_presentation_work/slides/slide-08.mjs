import { bg, footer, kicker, rect, style, table, text, title } from "./shared.mjs";

export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Evaluation fit", 8);
  title(slide, ctx, "The project satisfies the cloud assessment by combining practical deployment with technical AI depth.");
  table(slide, ctx, 76, 228, [280, 780], [
    ["Assessment criterion", "How the final project addresses it"],
    ["Cloud concepts", "Docker image prepared for AWS EC2; remote browser access through port 8501; .env secret management."],
    ["Innovation", "Combines speech-to-text, sentiment, named entities, speaker classification, semantic retrieval, and LLM summarization."],
    ["Technical proficiency", "Uses Python, Streamlit, Whisper, spaCy, VADER, scikit-learn, Sentence Transformers, Groq API, Docker."],
    ["Execution", "Built app package, resolved dependency/deployment issues, tested locally and prepared EC2 commands."],
    ["Impact", "Shows how clinical conversations can become structured insights without manual survey-only evaluation."],
  ], { rowH: 54 });
  rect(slide, ctx, 905, 82, 240, 90, style.pale, { line: { width: 1, fill: style.line } });
  text(slide, ctx, "Submission angle", 930, 104, 188, 18, { size: 10, color: style.soft, bold: true, align: "center" });
  text(slide, ctx, "Practical cloud project", 930, 132, 188, 22, { size: 16, color: style.ink, face: style.serif, bold: true, align: "center" });
  footer(slide, ctx, 8);
  return slide;
}
