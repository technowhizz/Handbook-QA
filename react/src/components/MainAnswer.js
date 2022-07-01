export default function MainAnswer(props) {
    return(
        <div className="border border-gray-300 text-lg shadow-sm rounded-md mt-8 p-5 text-gray-700">
            {props.main}
            <div className="mt-4 text-gray-500 font-medium">
                Context
            </div>
            <div className="mt-1 text-sm text-gray-500">
                {props.context}
            </div>
        </div>
    )
}