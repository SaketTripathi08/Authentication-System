import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section
            className="h-screen flex flex-col items-center justify-center dark:text-white"
        >
            <div className="flex flex-col items-center justify-center">
                
                <h1 className="text-3xl font-bold text-red mb-4">Unauthorized</h1>
                <p className="text-red mb-8">You do not have access to the requested page.</p>
                <div className="flex-grow">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={goBack}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Unauthorized