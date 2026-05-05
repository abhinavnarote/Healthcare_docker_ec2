# Cloud-Based Healthcare Clinical Conversation Analysis

This project deploys an AI-powered clinical conversation analysis application as a cloud-hosted Streamlit web app. Users can upload a synthetic or de-identified clinical conversation file in `.txt` or `.mp3` format and receive transcription, sentiment analysis, entity extraction, speaker segmentation, LLM-generated summaries, and transcript-based question answering.

## Features

- Upload `.txt` or `.mp3` clinical conversation files
- Transcribe audio using Whisper
- Analyze sentiment using VADER
- Extract entities using spaCy
- Classify likely speaker role using TF-IDF and Logistic Regression
- Build semantic context using Sentence Transformers
- Generate summaries and question-answering responses using Groq LLM API
- Deploy as a cloud web application using Docker and AWS EC2

## Project Architecture

```text
User Browser
    |
    v
Cloud-hosted Streamlit App on AWS EC2
    |
    v
AI/NLP Pipeline
    |-- Whisper speech-to-text
    |-- VADER sentiment analysis
    |-- spaCy entity extraction
    |-- TF-IDF + Logistic Regression speaker classification
    |-- Sentence Transformer retrieval
    |
    v
Groq LLM API
    |
    v
Summary, action items, and question-answering results
```

## Local Setup

1. Create a virtual environment.

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies.

```bash
pip install setuptools wheel
pip install --no-build-isolation -r requirements.txt
python -m spacy download en_core_web_sm
```

3. Create a `.env` file from the template.

```bash
cp .env.example .env
```

4. Add your Groq API key to `.env`.

```text
GROQ_API_KEY=your_real_key_here
```

5. Run the app locally.

```bash
streamlit run app.py
```

## Docker Setup

1. Build the Docker image.

```bash
docker build -t clinical-conversation-analysis .
```

2. Run the container.

```bash
docker run --env-file .env -p 8501:8501 clinical-conversation-analysis
```

3. Open the app in a browser.

```text
http://localhost:8501
```

## AWS EC2 Deployment Steps

### 1. Launch EC2 Instance

Recommended starting configuration:

- Ubuntu Server LTS
- Instance type: `t3.medium` or higher
- Storage: at least 20 GB
- Security group inbound rules:
  - SSH: port `22`, restricted to your IP
  - Streamlit: port `8501`, restricted where possible

### 2. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 3. Install Docker

```bash
sudo apt update
sudo apt install -y docker.io git
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

Log out and log back in after adding the user to the Docker group.

### 4. Copy or Clone the Project

If using GitHub:

```bash
git clone your-repository-url
cd cloud_healthcare_conversation_app
```

If copying manually, upload the project folder to the EC2 instance and then enter the folder.

### 5. Create Environment File

```bash
cp .env.example .env
nano .env
```

Add the Groq API key:

```text
GROQ_API_KEY=your_real_key_here
```

### 6. Build and Run the App

```bash
docker build -t clinical-conversation-analysis .
docker run -d --env-file .env -p 8501:8501 --name clinical-app clinical-conversation-analysis
```

### 7. Open the Cloud App

In a browser, visit:

```text
http://your-ec2-public-ip:8501
```

## Testing Plan

Use `sample_clinical_conversation.txt` for a safe demo. The expected test flow is:

1. Upload the sample conversation.
2. Confirm the transcript appears.
3. Check sentiment result.
4. Review extracted entities.
5. Review action items.
6. Review speaker segmentation.
7. Click **Generate Summary**.
8. Ask a question such as: `What symptoms did the patient mention?`

## Cloud Computing Concepts Demonstrated

- Cloud compute through AWS EC2
- Containerized deployment using Docker
- Remote browser access to a hosted web application
- Cloud networking and port configuration
- Environment-based secret management
- External API integration with Groq
- Scalable design path for future cloud storage and monitoring

## Privacy and Ethics Note

This project is an academic prototype. It should use synthetic or de-identified sample clinical conversations only. Real patient information should not be uploaded unless the system is redesigned with proper healthcare compliance, encryption, access control, audit logging, and institutional approval.
