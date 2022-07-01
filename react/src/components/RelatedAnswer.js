export default function RelatedAnswer(props) {
    return(
        <div className="border border-gray-300 text-md p-3 shadow-sm rounded-md text-gray-700">
            {props.text}
            <div className="mt-4 text-gray-500 font-medium">
                Context
            </div>
            <div className="mt-1 text-sm text-gray-500">
                {props.context}
            </div>
        </div>
    )
}