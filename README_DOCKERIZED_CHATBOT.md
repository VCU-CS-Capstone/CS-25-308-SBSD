# SBSD RAG Chatbot (Dockerized)

This project is a Retrieval-Augmented Generation (RAG) chatbot built with:

- 🧠 [LangChain](https://www.langchain.com/) + [Ollama](https://ollama.com/) for LLM and embeddings
- ⚙️ Flask backend (Python)
- 💬 React frontend (Next.js + React Chatbotify)
- 🐳 Fully Dockerized for ease of deployment

---

## 🛠️ Prerequisites

Make sure the following are installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/downloads)
- [Ollama](https://ollama.com/) (for local LLM + embedding models)

---

## 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd CS-25-308-SBSD/src
```

---

## 🧠 Step 2: Set Up Ollama

1. **Install Ollama**

2. **Pull required models**

```bash
ollama pull qwen2.5:latest
ollama pull nomic-embed-text:latest
```

3. **Run the Ollama server**

```bash
ollama serve &
```

> 🧠 Ollama runs at http://localhost:11434

---

## 🐳 Step 3: Run the Dockerized App

From the root of the project:

```bash
docker compose build --no-cache
docker compose up
```

This will:
- Start the **Flask backend** at http://localhost:5000
- Start the **React frontend** at http://localhost:3000

---

## 🧪 Step 4: Interact with the Chatbot

Open your browser and go to:

```
http://localhost:3000
```

Type your question and receive answers powered by Ollama's local LLM.

---

## 📂 Project Structure

```
├── src/
│   ├── backend/             # Python backend (Flask + LangChain)
│   ├── frontend/            # React/Next.js frontend
│   ├── data/                # PDF / FAQ documents
│   ├── Dockerfile.backend   # Dockerfile for backend
│   ├── Dockerfile.frontend  # Dockerfile for frontend
│   ├── requirements-docker.txt
│   └── ...
├── docker-compose.yml
└── README.md
```

---

