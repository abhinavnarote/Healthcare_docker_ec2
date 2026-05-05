FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV STREAMLIT_SERVER_ADDRESS=0.0.0.0
ENV STREAMLIT_SERVER_PORT=8501

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ffmpeg build-essential git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade "pip<26" "setuptools<81" wheel \
    && pip install --no-cache-dir --no-build-isolation -r requirements.txt \
    && python -m spacy download en_core_web_sm

COPY app.py .

EXPOSE 8501

CMD ["streamlit", "run", "app.py"]
