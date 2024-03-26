import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios('/logout', {
        withCredentials: true
      });
    // Create a new Broadcast Channel
    const logoutChannel = new BroadcastChannel('logout');
    // Post the message before closing the channel
    logoutChannel.postMessage("Logout");
    logoutChannel.close();
    navigate('/linkpage');
    } catch (err) {
      console.error(err);
    }
  }

  const logoutAllTabs = () => {
    const logoutChannel = new BroadcastChannel('logout');
    logoutChannel.onmessage = () => {
      logout();
      logoutChannel.close();
    }
  }

  return  { logout, logoutAllTabs };
}

export default useLogout;
