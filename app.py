from flask import Flask, request, jsonify
from flask_cors import CORS
from haystack.nodes import DensePassageRetriever, FARMReader
from haystack.pipelines import ExtractiveQAPipeline
from haystack.document_stores import FAISSDocumentStore

app = Flask(__name__)
cors = CORS(app)


pgr_document_store = FAISSDocumentStore.load("pgr_test")
pgt_document_store = FAISSDocumentStore.load("PGT")
ug_document_store = FAISSDocumentStore.load("UG")

retriever = DensePassageRetriever(
    document_store=ug_document_store,
    query_embedding_model="vblagoje/dpr-question_encoder-single-lfqa-wiki",
    passage_embedding_model="vblagoje/dpr-ctx_encoder-single-lfqa-wiki",
)

reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", context_window_size=500)

pipe = ExtractiveQAPipeline(reader, retriever)



@app.route('/query', methods=['POST'])
def qa():
    programme = request.json["programme"]

    if programme == "pgr":
        retriever.document_store = pgr_document_store
    elif programme == "pgt":
        retriever.document_store = pgt_document_store
    elif programme == "ug":
        retriever.document_store = ug_document_store
    
    prediction = pipe.run(
    query=request.json["query"], params={"Retriever": {"top_k": 10}, "Reader": {"top_k": 4}})

    answers = {
        "a1":{
            "answer": prediction["answers"][0].answer,
            "context": prediction["answers"][0].context
        },
        "a2":{
            "answer": prediction["answers"][1].answer,
            "context": prediction["answers"][1].context
        },
        "a3":{
            "answer": prediction["answers"][2].answer,
            "context": prediction["answers"][2].context
        },
        "a4":{
            "answer": prediction["answers"][3].answer,
            "context": prediction["answers"][3].context
        }
    }

   
    return jsonify(answers)
