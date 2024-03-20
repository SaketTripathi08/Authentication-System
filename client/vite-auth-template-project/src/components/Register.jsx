import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import showPassword from "../assets/svgs/showpassword.svg";
import hidePasword from "../assets/svgs/hidepassword.svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[\p{L}\s'-]{2,}$/u;
const PHONE_REGEX = /^\d{10}$/; // Assuming 10-digit phone number
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [passwordType, setPasswordType] = useState("password");


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
        console.log(firstName, validFirstName)
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = NAME_REGEX.test(firstName);
        const v4 = NAME_REGEX.test(lastName);
        const v5 = PHONE_REGEX.test(phone);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, pwd, first_name: firstName, last_name: lastName, phone_number: phone }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setEmail('');
            setPwd('');
            setMatchPwd('');
            setFirstName('');
            setLastName('');
            setPhone('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email address is already in use');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section className="w-full flex justify-center items-center h-screen  bg-gray-100 dark:bg-gray-800" >
                    <div className="w-full max-w-lg xl:max-w-2xl p-6 space-y-4 bg-white rounded-lg shadow dark:border dark:border-gray-700 custom-width">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                                <div>
                                    <label htmlFor="first_name" className="custom-label">
                                        First Name
                                        <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        ref={userRef}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                        required
                                        aria-invalid={validFirstName ? "false" : "true"}
                                        aria-describedby="firstnamenote"
                                        onFocus={() => setFirstNameFocus(true)}
                                        onBlur={() => setFirstNameFocus(false)}
                                        className="custom-input"
                                    />
                                    <p id="firstnamenote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        First name should contain only letters and be at least two characters long.
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="custom-label">
                                        Last Name
                                        <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
                                        required
                                        aria-invalid={validLastName ? "false" : "true"}
                                        aria-describedby="lastnamenote"
                                        onFocus={() => setLastNameFocus(true)}
                                        onBlur={() => setLastNameFocus(false)}
                                        className="custom-input"
                                    />
                                    <p id="lastnamenote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Last name should contain only letters and be at least two characters long.
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="email" className="custom-label">
                                        Your email
                                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                        className="custom-input"
                                        placeholder="name@company.com"
                                    />
                                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Please enter a valid email address.<br />
                                        Email should be in the format: example@example.com<br />
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="custom-label">
                                        Phone Number
                                        <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="phone"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                            required
                                            aria-invalid={validPhone ? "false" : "true"}
                                            aria-describedby="phonenote"
                                            onFocus={() => setPhoneFocus(true)}
                                            onBlur={() => setPhoneFocus(false)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <p id="phonenote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Phone number should be a 10-digit number.
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="custom-label">
                                        Password
                                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordType ? "password" : "text"}
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                            onClick={() => setPasswordType((prev) => !prev)}>
                                            {passwordType ? (
                                                <img src={hidePasword} alt="Hide"/>
                                            ) : (
                                                <img src={showPassword} alt="Show"/>
                                            )}
                                        </div>
                                    </div>

                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="confirm_pwd" className="custom-label">
                                        Confirm Password
                                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>
                                </div>
                            </div>
                            <button disabled={!validEmail || !validFirstName || !validLastName || !validPhone || !validPwd || !validMatch} 
                            className={`
                            ${(!validEmail || !validFirstName || !validLastName || !validPhone || !validPwd || !validMatch) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} 
                            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit">
                                Sign Up
                            </button>
                        </form>
                        <p>
                            Already registered?
                            <span className="ml-1 line">
                                <Link to="/" className="text-blue-600 hover:underline font-medium">Sign In</Link>
                            </span>
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Register;
