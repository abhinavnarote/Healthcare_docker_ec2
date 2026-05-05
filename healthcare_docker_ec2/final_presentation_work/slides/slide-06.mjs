import { bg, footer, kicker, metric, rect, style, table, text, title } from "./shared.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "Testing outcomes", 6);
  title(slide, ctx, "The demo successfully processed audio, produced insights, and generated an LLM clinical summary.");
  metric(slide, ctx, ".mp3", "Audio input", "Uploaded clinical visit recording", 70, 250, 210, style.accent);
  metric(slide, ctx, "-0.989", "Sentiment score", "Negative tone detected in chest-pain conversation", 340, 250, 250, style.accent2);
  metric(slide, ctx, "4", "Entity groups", "People, organizations, dates, locations", 650, 250, 245, style.accent3);
  metric(slide, ctx, "Working", "LLM summary", "Symptoms, actions, decisions, entities", 950, 250, 240, style.accent);
  table(slide, ctx, 90, 430, [260, 260, 500], [
    ["Feature tested", "Result", "Evidence from project demo"],
    ["Whisper transcription", "Passed", "Audio was converted into a readable visit transcript."],
    ["Sentiment analysis", "Passed", "Chest-pain conversation returned strong negative compound score."],
    ["Entity extraction", "Passed with limits", "Detected names, clinic, dates; generic NER created some noisy entities."],
    ["LLM summary", "Passed", "Returned symptoms, follow-up needs, decisions, and important entities."],
  ], { rowH: 38 });
  footer(slide, ctx, 6);
  return slide;
}
