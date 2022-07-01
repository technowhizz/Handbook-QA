import { useState } from "react"
import MainAnswer from "./components/MainAnswer";
import RelatedAnswer from "./components/RelatedAnswer";


export default function App() {
    const [mainAnswer, setMainAnswer] = useState("")
    const [mainAnswerContext, setMainAnswerContext] = useState("")
    const [relatedAnswer1, setRelatedAnswer1] = useState("")
    const [relatedAnswer2, setRelatedAnswer2] = useState("")
    const [relatedAnswer3, setRelatedAnswer3] = useState("")
    const [relatedContext1, setRelatedContext1] = useState("")
    const [relatedContext2, setRelatedContext2] = useState("")
    const [relatedContext3, setRelatedContext3] = useState("")
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("ug")
    const [loading, setLoading] = useState(false)
    
    function handleClick() {
        console.log(query, category)
        setLoading(true)

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "query":query, "programme":category })
        };


        fetch('http://127.0.0.1:5000/query', requestOptions)
          .then(response => response.json())
          .then(json => {
            console.log(json)
            setMainAnswer(json.a1.answer)
            setMainAnswerContext(json.a1.context)
            setRelatedAnswer1(json.a2.answer)
            setRelatedContext1(json.a2.context)
            setRelatedAnswer2(json.a3.answer)
            setRelatedContext2(json.a3.context)
            setRelatedAnswer3(json.a4.answer)
            setRelatedContext3(json.a4.context)
            setLoading(false)
          }
          )
      }

    return (
        <div className="max-w-4xl m-auto my-6">
            <div className="">
            <label htmlFor="price" className="block text-xl font-semibold text-gray-700">
            Enter your question
            </label>
            <div className="mt-4 relative rounded-md shadow-sm text-3xl">
            <input
                type="text"
                name="query"
                id="query"
                className="focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg block w-full py-3 pl-5 pr-12 border-gray-300 rounded-md text-gray-700"
                placeholder="e.g. Where do I go to get help?"
                onChange={e => setQuery(e.target.value)}
                value={query}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="category" className="sr-only">
                Category
                </label>
                <select
                id="category"
                name="category"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full pl-5 pr-12 border-transparent bg-transparent text-gray-700 sm:text-lg rounded-l-md"
                onChange={e => setCategory(e.target.value)}
                value={category}

                >
                <option value="ug">Undergraduate</option>
                <option value="pgt">Postgraduate Taught</option>
                <option value="pgr">Postgraduate Research</option>
                </select>
                <button className="pl-4 pr-4 hover:bg-indigo-400 border-0 bg-indigo-500 h-full w-full rounded-r-md text-gray-50" onClick={handleClick}>
                    {
                        loading ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-6 w-6" fill="none" viewBox="0 0 36 36">
                            <path stroke="currentColor" stroke-width="2" d="M34.9 19.849A17.002 17.002 0 0 1 5.98 30.021 17 17 0 0 1 16.15 1.1c.412-.045.849.296.849.86 0 .503-.428 1.015-1.094 1.108A15.077 15.077 0 1 0 32.93 20.094c.093-.666.605-1.094 1.107-1.094.565 0 .906.437.861.849Z"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                </button>
            </div>
            </div>
        </div>

        {
            mainAnswer &&
            <div>
                <MainAnswer main={mainAnswer} context={mainAnswerContext}/>
                <div className="text-lg text-gray-700 font-medium mt-6">
                    Related Answers
                </div>
                <div className="flex mt-2 space-x-4">
                    <RelatedAnswer text={relatedAnswer1} context={relatedContext1}/>
                    <RelatedAnswer text={relatedAnswer2} context={relatedContext2}/>
                    <RelatedAnswer text={relatedAnswer3} context={relatedContext3}/>
                </div>
            </div>
        }
    </div>
    )
  }
