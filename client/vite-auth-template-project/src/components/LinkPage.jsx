import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section className="custom-section">
            <div className="custom-wrapper">
                <h1 className="custom-h1 mb-7">Links</h1>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-2">
                            <h2 className="underline dark:text-white">Public</h2>
                            <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <title>folder_type_public</title>
                                <path d="M27.5,5.5H18.2L16.1,9.7H4.4V26.5H29.6V5.5Zm0,4.2H19.3l1.1-2.1h7.1Z" style={{ fill: '#00a23c' }} />
                                <path d="M22.6,16.3a3.787,3.787,0,0,1,1.8,2.8,3.048,3.048,0,1,0-1.8-2.8Zm-2,6.3a3.1,3.1,0,1,0-3.1-3.1h0A3.116,3.116,0,0,0,20.6,22.6Zm1.3.2H19.3a3.9,3.9,0,0,0-3.9,3.9V30h0l.2.1A16.106,16.106,0,0,0,21,31a9.638,9.638,0,0,0,4.7-.9l.2-.1h0V26.8A4.148,4.148,0,0,0,21.9,22.8ZM27,19.6H24.4a3.225,3.225,0,0,1-1.2,2.6,4.621,4.621,0,0,1,3.3,4.5v1a9.782,9.782,0,0,0,4.1-.9l.2-.1h0V23.5A3.82,3.82,0,0,0,27,19.6Zm-11.8-.2a3.022,3.022,0,0,0,1.6-.5,3.71,3.71,0,0,1,1.4-2.4v-.2a3.1,3.1,0,0,0-6.2,0,3.272,3.272,0,0,0,3.2,3.1Zm2.7,2.9a4.2,4.2,0,0,1-1.2-2.6H13.8a3.9,3.9,0,0,0-3.9,3.9v3.2h0l.2.1a16.28,16.28,0,0,0,4.4.8v-1a4.81,4.81,0,0,1,3.4-4.4Z" style={{ fill: '#aaffa2' }} />
                            </svg>
                        </div>
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>

                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="flex items-center gap-2">
                            <h2 className="underline dark:text-white">Private</h2>
                            <svg width="40" height="40" viewBox="0 0 24 24" id="Artwork" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,6.23h0L7.28,8.33v3.15A6.73,6.73,0,0,0,10,16.79a5.75,5.75,0,0,0,2,1h0Z" style={{ fill: '#669df6' }} />
                                <path d="M12,17.77a6.52,6.52,0,0,0,4.72-6.29V8.33L12,6.23Z" style={{ fill: '#4285f4' }} />
                                <path d="M17.08,11.62c0,.26,0,.51-.06.76H19.4v-.76Z" style={{ fill: '#4285f4' }} />
                                <path d="M6.92,11.62c0,.26,0,.51.06.76H4.6v-.76Z" style={{ fill: '#4285f4' }} />
                                <path d="M3.59,12.73a.73.73,0,0,1,0-1.46v-.6a1.33,1.33,0,1,0,0,2.66Z" style={{ fill: '#aecbfa' }} />
                                <path d="M14.22,14.27a.56.56,0,0,1-.56.55H10.34l-.1,0a.54.54,0,0,1-.45-.53V11.5a.55.55,0,0,1,.55-.55h.28v-.56a1.39,1.39,0,0,1,2.77,0V11h.27a.33.33,0,0,1,.15,0,.54.54,0,0,1,.38.42.29.29,0,0,1,0,.1ZM12,9.54h-.1a.85.85,0,0,0-.75.74s0,.07,0,.1V11h1.72v-.56a.85.85,0,0,0-.08-.35A.84.84,0,0,0,12,9.54Z" style={{ fill: '#fff' }} />
                                <path d="M12.25,11.58l-1.1,1.47h.63v1.11l1.07-1.49h-.6Z" style={{ fill: '#4285f4' }} />
                                <path d="M3.59,13.33A1.32,1.32,0,0,0,4.92,12v0a1.32,1.32,0,0,0-1.33-1.33v.6a.73.73,0,0,1,0,1.46Z" style={{ fill: '#669df6' }} />
                                <path d="M20.41,12.73a.73.73,0,0,1,0-1.46v-.6a1.33,1.33,0,0,0,0,2.66Z" style={{ fill: '#aecbfa' }} />
                                <path d="M20.41,13.33A1.32,1.32,0,0,0,21.75,12v0a1.33,1.33,0,0,0-1.34-1.33v.6a.73.73,0,1,1,0,1.46Z" style={{ fill: '#669df6' }} />
                            </svg>
                        </div>
                        <Link to="/" className="text-blue-600 hover:underline font-medium">Home</Link>
                        <Link to="/editor" className="text-blue-600 hover:underline font-medium">Editors Page</Link>
                        <Link to="/admin" className="text-blue-600 hover:underline font-medium">Admin Page</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LinkPage
