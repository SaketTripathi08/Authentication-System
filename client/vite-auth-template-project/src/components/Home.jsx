import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section className="w-full flex justify-center items-center h-screen">
            <div className="w-full max-w-lg md:h-96 lg:h-100 p-6 bg-white rounded-lg shadow dark:border dark:border-gray-700">
                <h1 className="custom-h1">Home</h1>
                <br />
                <p className="mb-7">You are logged in!</p>
                <br />
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/editor" className="bg-blue-500 text-white p-2 rounded-lg block text-center">Go to the Editor page</Link>
                    <Link to="/admin" className="bg-green-500 text-white p-2 rounded-lg block text-center">Go to the Admin page</Link>
                    <Link to="/lounge" className="bg-yellow-500 text-white p-2 rounded-lg block text-center">Go to the Lounge</Link>
                    <Link to="/linkpage" className="bg-purple-500 text-white p-2 rounded-lg block text-center">Go to the link page</Link>
                </div>
                <div className="ml-1 mt-20">
                    <button onClick={signOut} className="text-blue-600 hover:underline font-medium">Sign Out</button>
                </div>
            </div>
        </section>
    )
}

export default Home