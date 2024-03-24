import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
    return (
        <section className="w-full flex justify-center items-center h-screen">
            <div className="w-full max-w-lg md:h-96 lg:h-100 p-6 bg-white dark:bg-gray-900 rounded-lg shadow dark:border dark:border-gray-700 flex flex-col justify-between">
                <div>
                    <h1 className="custom-h1">Admins Page</h1>
                    <br />
                    <Users />
                </div>
                <br />
                <div className="flexGrow">
                    <Link to="/" className="text-blue-600 hover:underline font-medium">Back to Home Page</Link>
                </div>
            </div>
        </section>
    )
}

export default Admin