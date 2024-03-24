import { Outlet } from "react-router-dom";
import DarkMode from "./DarkMode";

const Layout = () => {
    return (
        <div className="relative">
            <div className="absolute top-4 right-4">
                <DarkMode />
            </div>
            <main className="App">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout