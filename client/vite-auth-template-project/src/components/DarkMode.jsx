import { useState, useEffect } from "react";
import Switch from 'react-switch';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';


const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Load theme preference from local storage
        const savedTheme = localStorage.getItem('theme');
        // Check if user prefers dark mode based on OS settings
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || prefersDarkMode) {
            setDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []); // Only run on component mount

    // Function to handle toggling dark mode
    const handleDarkModeToggle = (checked) => {
        setDarkMode(checked);
        // Add or remove 'dark' class to the body
        document.body.classList.toggle('dark', checked);
        // Save theme preference to local storage
        localStorage.setItem('theme', checked ? 'dark' : 'light');
    };

    return (
        <div className="flex items-center">

            <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                onColor="#444"
                offColor="#ccc"
                onHandleColor="#fff"
                offHandleColor="#fff"
                checkedIcon={
                    <div style={{ padding: '3px' }}>
                        <FaMoon
                            className={`text-white ${darkMode ? '' : 'opacity-50'}`}
                            size={18}
                            // style={{ marginLeft: '5px', marginTop:"2px" }}
                        />
                    </div>
                }
                uncheckedIcon={
                    <div style={{ padding: '3px' }}>
                        <FiSun
                            className={`text-yellow-300 ${darkMode ? 'opacity-50' : ''}`}
                            size={20}
                            style={{ marginRight: '5px' }}
                        />

                    </div>
                }
                height={24}
                width={48}
            />

        </div>
    );
};

export default DarkMode;