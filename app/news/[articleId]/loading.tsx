// import { CircularProgress } from '@material-ui/core';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="p-4 border-2 rounded-lg bg-white">
            <h2 className="text-xl font-bold">Article ID: </h2>
            <p className="text-gray-700">
                {/* <CircularProgress /> */}
                Loading
            </p>
        </div>
    )
}
