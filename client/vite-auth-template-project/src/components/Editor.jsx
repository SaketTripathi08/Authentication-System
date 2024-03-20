import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section className="w-full flex justify-center items-center h-screen">
            <div className="w-full max-w-lg md:h-96 lg:h-100 p-6 bg-white rounded-lg shadow dark:border dark:border-gray-700 flex flex-col justify-between">
                <h1 className="text-center font-bold">Editors Page</h1>
                <p>You must have been assigned an Editor role.</p>
                <div className="flexGrow">
                    <Link to="/">Home</Link>
                </div>
            </div>
        </section>
    )
}

export default Editor