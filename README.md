# Handbook-QA

Handbook-QA is the result of a Final Year Project at The University of Manchester. It makes use of the [Haystack Python Library](https://github.com/deepset-ai/haystack), Flask and React to provide an interface to search through documents to provide an answer using Natural Language Processing based Question Answering.

This project makes use of a Dense Passage Retriever and FAISS for Question Answering.

Different Evaluations can be found in the `Evaluation-Notebooks` folder

## Installation

1. Clone this repo `git clone https://github.com/technowhizz/Handbook-QA.git`

1. cd into the repo `cd Handbook-QA`

1. [Install Haystack with FAISS](https://github.com/deepset-ai/haystack#floppy_disk-installation) for your Operating System. (One should note that installing FAISS on Windows requires installing FAISS-Windows separately from Haystack)

1. Install the python requirements `pip install -r requirements.txt`

1. Ensure you have `npm` installed on your machine

1. cd into react `cd react`

1. run `npm install` (this may take a while)

## Running the App

In order to run this app, you need to start the backend and the frontend.

### Start the backend

```bash
# Make sure you are in the Handbook-QA folder (not the 'react' folder from the previous steps) 
export FLASK_APP=app.py
flask run
```

### Start the frontend (In another terminal session)

```bash
# Make sure you are in the Handbook-QA folder
cd react
npm start
```

You can now ask questions from the browser that just opened up (http://localhost:3000)

Enjoy!