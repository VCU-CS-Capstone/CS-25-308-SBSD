import argparse
import os
from dotenv.main import load_dotenv
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from get_embedding_function import get_embedding_function

load_dotenv()

DATA_PATH = os.environ['DATA_PATH']
CHROMA_PATH = os.environ['CHROMA_PATH']
modelName = "qwen2.5:latest"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context. If the context does not have 
the answer to the question or is not helpful for understanding the SBSD website
reply only "I do not have the information necessary to answer that question."
If the question is in another language do your best to translate the context
to the language the question was asked in:
{question}
"""

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    print("Querying rag...\n")
    query_text = args.query_text
    query_rag(query_text)

def query_rag(query_text):
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # ✅ Updated to use Docker-compatible base_url
    model = Ollama(
        model=modelName,
        base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    )

    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\n\nSources: {sources}"
    print(formatted_response)
    return response_text

if __name__ == "__main__":
    main()
