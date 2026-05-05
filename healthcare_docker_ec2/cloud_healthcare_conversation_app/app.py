import os
import tempfile
from pathlib import Path

import numpy as np
import spacy
import streamlit as st
import whisper
from dotenv import load_dotenv
from groq import Groq
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

st.set_page_config(
    page_title="Clinical Conversation Intelligence",
    page_icon="🩺",
    layout="wide",
)

st.markdown(
    """
    <div style="text-align:center;">
        <h2 style="margin-bottom:5px;">Healthcare Evaluation using Clinical Conversation Analysis</h2>
        <p style="font-size:22px; color:#666; margin-top:0;">
            Speech-to-Text • Temporal Sentiment • NLP • Machine Learning • LLM Summary
        </p>
    </div>
    """,
    unsafe_allow_html=True,
)

st.caption(
    "Prototype for academic demonstration only. Use synthetic or de-identified sample conversations; "
    "do not upload real patient data."
)


@st.cache_resource
def load_spacy_model():
    try:
        return spacy.load("en_core_web_sm")
    except OSError:
        st.error(
            "spaCy model 'en_core_web_sm' is not installed. "
            "Run: python -m spacy download en_core_web_sm"
        )
        st.stop()


@st.cache_resource
def load_sentence_model():
    return SentenceTransformer("all-MiniLM-L6-v2")


@st.cache_resource
def load_whisper_model():
    return whisper.load_model("base")


def create_training_data():
    return [
        ("what brought you in today", "Doctor"),
        ("how long has this been going on", "Doctor"),
        ("do you have any allergies", "Doctor"),
        ("any past medical history", "Doctor"),
        ("what is your pain level", "Doctor"),
        ("i have chest pain", "Patient"),
        ("it started last night", "Patient"),
        ("i feel light headed", "Patient"),
        ("no i don't smoke", "Patient"),
        ("my father had a heart attack", "Patient"),
    ]


@st.cache_resource
def load_speaker_model():
    data = create_training_data()
    x_train = [item[0] for item in data]
    y_train = [item[1] for item in data]

    model = Pipeline(
        [
            ("tfidf", TfidfVectorizer()),
            ("clf", LogisticRegression(max_iter=1000)),
        ]
    )
    model.fit(x_train, y_train)
    return model


nlp = load_spacy_model()
embedding_model = load_sentence_model()
whisper_model = load_whisper_model()
speaker_model = load_speaker_model()
vader = SentimentIntensityAnalyzer()


def get_groq_client():
    if not GROQ_API_KEY:
        return None
    return Groq(api_key=GROQ_API_KEY)


def load_uploaded_file(uploaded_file):
    if uploaded_file.name.lower().endswith(".txt"):
        return uploaded_file.read().decode("utf-8")

    if uploaded_file.name.lower().endswith(".mp3"):
        st.info("Transcribing audio with Whisper...")
        temp_path = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
                temp_file.write(uploaded_file.read())
                temp_path = temp_file.name
            return whisper_model.transcribe(temp_path)["text"]
        finally:
            if temp_path and Path(temp_path).exists():
                Path(temp_path).unlink()

    st.error("Unsupported file format. Please upload a .txt or .mp3 file.")
    return None


def analyze_sentiment(text):
    score = vader.polarity_scores(text)["compound"]
    if score > 0.05:
        label = "Positive"
    elif score < -0.05:
        label = "Negative"
    else:
        label = "Neutral"
    return score, f"{label} (Compound Score: {score:.3f})"


def extract_entities_summary(text):
    doc = nlp(text)
    entities = {
        "People": set(),
        "Organizations": set(),
        "Dates": set(),
        "Locations": set(),
    }

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            entities["People"].add(ent.text)
        elif ent.label_ == "ORG":
            entities["Organizations"].add(ent.text)
        elif ent.label_ == "DATE":
            entities["Dates"].add(ent.text)
        elif ent.label_ in {"GPE", "LOC"}:
            entities["Locations"].add(ent.text)

    return {key: sorted(value) for key, value in entities.items()}


def extract_actions(text):
    keywords = ["should", "must", "need to", "will", "assigned", "task", "follow up"]
    sentences = [sentence.strip() for sentence in text.split(".") if sentence.strip()]
    return [sentence for sentence in sentences if any(k in sentence.lower() for k in keywords)]


def detect_speakers(text):
    sentences = [sentence.strip() for sentence in text.split(".") if sentence.strip()]
    return [(sentence, speaker_model.predict([sentence])[0]) for sentence in sentences]


def get_structured_text(text):
    dialogue = detect_speakers(text)
    structured_text = "\n".join([f"{speaker}: {sentence}" for sentence, speaker in dialogue])
    return structured_text, dialogue


def generate_clinical_summary(text):
    client = get_groq_client()
    if client is None:
        return "Groq API key is missing. Add GROQ_API_KEY to the cloud environment or .env file."

    prompt = f"""
You are an AI assistant that creates structured summaries for clinical conversation analysis.

Extract and format:
1. Brief clinical conversation summary
2. Patient concerns or symptoms mentioned
3. Action items or follow-up needs
4. Key decisions or recommendations
5. Important entities such as people, dates, organizations, and locations

Transcript:
{text}

Return the answer in clean markdown format.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You summarize clinical conversations for academic analysis."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )
    return response.choices[0].message.content


def build_db(text):
    sentences = [sentence.strip() for sentence in text.split(".") if sentence.strip()]
    embeddings = embedding_model.encode(sentences)
    return sentences, embeddings


def retrieve(query, sentences, embeddings, k=5):
    if len(sentences) == 0:
        return ""
    q_emb = embedding_model.encode([query])[0]
    scores = np.dot(embeddings, q_emb)
    top_idx = np.argsort(scores)[-k:][::-1]
    return " ".join([sentences[i] for i in top_idx])


def answer_question(query, context):
    client = get_groq_client()
    if client is None:
        return "Groq API key is missing. Add GROQ_API_KEY to the cloud environment or .env file."

    prompt = f"""
You are a strict clinical conversation assistant.

CONTEXT:
{context}

QUESTION:
{query}

RULES:
- Answer only from the context.
- If the answer is not found, say "Not mentioned in the conversation."
- Do not invent medical facts.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Strict transcript-based QA assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )
    return response.choices[0].message.content


uploaded_file = st.file_uploader("Upload clinical conversation file (.txt or .mp3)", type=["txt", "mp3"])
text = load_uploaded_file(uploaded_file) if uploaded_file else None

if not text:
    st.info("Upload a synthetic or de-identified clinical conversation file to begin.")
    st.stop()

st.subheader("Transcript")
st.write(text)

score, sentiment = analyze_sentiment(text)
col1, col2 = st.columns(2)
with col1:
    st.subheader("Sentiment Analysis")
    st.info(sentiment)
with col2:
    st.subheader("Cloud Demo Status")
    st.success("Application running and processing uploaded conversation data.")

st.subheader("Key Entities Summary")
entities = extract_entities_summary(text)
entity_cols = st.columns(4)
for col, label in zip(entity_cols, ["People", "Organizations", "Dates", "Locations"]):
    with col:
        st.write(f"**{label}**")
        st.write(entities[label] or "None detected")

st.subheader("Action Items")
actions = extract_actions(text)
st.write(actions or "No action items detected from rule-based keywords.")

structured_text, dialogue = get_structured_text(text)
st.subheader("Speaker Segmentation")
st.text(structured_text)

st.subheader("Clinical Conversation Summary")
if st.button("Generate Summary"):
    with st.spinner("Generating summary..."):
        st.markdown(generate_clinical_summary(text))

st.subheader("Ask Questions About the Conversation")
if "source_text" not in st.session_state or st.session_state.source_text != structured_text:
    st.session_state.sentences, st.session_state.embeddings = build_db(structured_text)
    st.session_state.source_text = structured_text

query = st.text_input("Ask something, for example: What symptoms did the patient mention?")
if query:
    top_context = retrieve(query, st.session_state.sentences, st.session_state.embeddings)
    with st.spinner("Searching conversation context..."):
        st.success(answer_question(query, top_context))
