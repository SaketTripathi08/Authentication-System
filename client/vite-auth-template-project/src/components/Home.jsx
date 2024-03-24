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
        <section className="custom-section">
            <div className="custom-wrapper">
                <h1 className="custom-h1">Home</h1>
                <br />
                <p className="mb-7 dark:text-white">You are logged in!</p>
                <br />
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/editor" className="bg-blue-600  text-white p-2 rounded-lg block text-center">Go to the Editor page</Link>
                    <Link to="/admin" className="bg-green-600 text-white p-2 rounded-lg block text-center">Go to the Admin page</Link>
                    <Link to="/lounge" className="bg-yellow-600 text-white p-2 rounded-lg block text-center">Go to the Lounge</Link>
                    <Link to="/linkpage" className="bg-purple-600 text-white p-2 rounded-lg block text-center">Go to the link page</Link>
                </div>
                <div className="ml-1 mt-20">
                    <button onClick={signOut} className="text-blue-600 hover:underline font-medium">Sign Out</button>
                </div>
            </div>
        </section>
    )
}

export default Home