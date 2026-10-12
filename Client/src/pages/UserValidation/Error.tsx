import { useLocation } from "react-router-dom"

interface Errortype {
        message?: string,
        details?: Record<string, string>
    }

export default function Error() {

    

    const location = useLocation()

    const state = location.state as Errortype;
    return (
        <div>
            <div className="border-b-2 text-5xl p-5 mt-5 font-serif">
                <p>Service Unavailable</p>
            </div>
            <div className="p-5 text-2xl flex gap-2">
                <p className="font-semibold">HTTP ERROR : </p> 
                {state?.message && (
                    <p>{state.message}</p>
                )}       
            </div>
            <div className="p-5 text-2xl flex gap-2">
                <p className="font-semibold" >DETAILS : </p>
                {state?.details?.cause && (
                    <p>{state.details.cause}</p>
                )}
            </div>
        </div>
    )
}