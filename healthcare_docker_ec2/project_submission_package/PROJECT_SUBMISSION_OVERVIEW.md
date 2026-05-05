# Project Submission Overview

## Project Title

Cloud Deployment of an AI-Based Healthcare Clinical Conversation Analysis System

## What Is Included

- `cloud_healthcare_conversation_app/app.py`  
  Streamlit application for clinical conversation analysis.

- `cloud_healthcare_conversation_app/requirements.txt`  
  Python dependencies with compatible local versions.

- `cloud_healthcare_conversation_app/Dockerfile`  
  Docker setup for cloud deployment.

- `cloud_healthcare_conversation_app/.env.example`  
  Template for adding the Groq API key. The real `.env` file is intentionally not included.

- `cloud_healthcare_conversation_app/sample_clinical_conversation.txt`  
  Safe sample file for testing and demo screenshots.

- `cloud_healthcare_conversation_app/README.md`  
  Local setup, Docker setup, AWS EC2 deployment steps, and testing plan.

- `cloud_healthcare_conversation_app/Cloud_Based_Healthcare_Clinical_Conversation_Analysis_Project_Proposal.docx`  
  Ready-to-submit project proposal document.

## Local Run Command

```bash
cd cloud_healthcare_conversation_app
python3 -m venv .venv
source .venv/bin/activate
pip install setuptools wheel
pip install --no-build-isolation -r requirements.txt
python -m spacy download en_core_web_sm
streamlit run app.py --server.port 8502
```

Then open:

```text
http://localhost:8502
```

## Important Note

The real `.env` file is not included in the submission package because it contains a private API key. Use `.env.example` as the template and add the real `GROQ_API_KEY` locally or in the cloud environment.
