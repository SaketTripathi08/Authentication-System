import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section className="w-full flex justify-center items-center h-screen">
            <div className="w-full max-w-lg md:h-96 lg:h-100 p-6 bg-white rounded-lg shadow dark:border dark:border-gray-700 flex flex-col justify-between">
                <h1 className="custom-h1">The Lounge</h1>
                    <p className="mx-auto">Admins and Editors can hang out here.</p>
                    <div className="flexGrow">
                        <Link to="/" className="text-blue-600 hover:underline font-medium">Home</Link>
                    </div>
            </div>
        </section>
    )
}

export default Lounge