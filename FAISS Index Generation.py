from haystack.nodes import PreProcessor, DensePassageRetriever
from haystack.utils import convert_files_to_docs
from haystack.document_stores import FAISSDocumentStore


# Use this to convert .txt files in a directory, in this case content/pgt into documents
pgt_doc_txt = convert_files_to_docs(dir_path="./content/pgt")

preprocessor = PreProcessor(
    clean_empty_lines=True,
    clean_whitespace=True,
    clean_header_footer=False,
    split_by="word",
    split_length=100,
    split_respect_sentence_boundary=True,
)

pgt_docs = preprocessor.process(pgt_doc_txt)
print(f"docs_output: {len(pgt_docs)}")


# Set the sql_url to the name and location of where you would like the FAISS db and index to be stored
# Trying to run this without any modifications will fail as PGT.db already exists. You must either delete PGT,PGT.db,PGT.json or choose another name
pgt_document_store = FAISSDocumentStore(embedding_dim=128, faiss_index_factory_str="Flat", sql_url="sqlite:///PGT.db")
pgt_document_store.write_documents(pgt_docs)

retriever = DensePassageRetriever(
    document_store=pgt_document_store,
    query_embedding_model="vblagoje/dpr-question_encoder-single-lfqa-wiki",
    passage_embedding_model="vblagoje/dpr-ctx_encoder-single-lfqa-wiki",
)

pgt_document_store.update_embeddings(retriever)

# The name and path of the FAISS index and json file
pgt_document_store.save("PGT")

