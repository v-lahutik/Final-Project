import { useState, createContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { URL } from '../utils/URL';
import axios from 'axios';
import { User } from '../custom.Types/userTypes';
import Swal from 'sweetalert2';

const userNull: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  membership: '',
  address: null,
  role: '',
  profilePic: '',
  is_activated: false
};

interface UserContextType {
  user: User;
  isLoggedIn: boolean;
  userLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  authenticate: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: userNull,
  isLoggedIn: false,
  userLoading: true,
  login: () => {},
  logout: () => {},
  authenticate: () => {}
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(userNull);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  //check for cookies to authenticate user

  const authenticate = async () => {
    console.log('authenticating user');
    try {
      const response = await axios.get(`${URL}/users/authenticate`, {
        withCredentials: true
      });
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error during authentication:', error);

      // if the user is not authenticated, reset the user state
      setUser(userNull);
      //navigate('/');
      setIsLoggedIn(false);
    } finally {
      //add a loading state to prevent the page from rendering before the user is authenticated
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (
      (location.pathname.startsWith('/admin') && user.role !== 'Admin') ||
      (location.pathname.startsWith('/member') && user.role !== 'Member')
    ) {
      authenticate();
    } else {
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userLoading) {
      // Redirect user if they try to access a page they are not authorized to

      if (
        (location.pathname.startsWith('/admin') && user.role !== 'Admin') ||
        (location.pathname.startsWith('/member') && user.role !== 'Member')
      ) {
        setIsLoggedIn(false);
        setUser(userNull);
        navigate('/'); //redirect to home page if user is not an admin
        Swal.fire({
          title: 'Error!',
          text: 'Unauthorized access. You were logged out. Please log in again.',
          icon: 'error'
        });
      }
    }
  }, [userLoading, user, location.pathname]);

  const login = (userData: User) => {
    setUser(userData);
    console.log('User:', userData);
    if (userData.role === 'Admin') navigate('/admin/profile');
    else navigate('/member/profile');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const response = await fetch(`${URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(userNull);
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.log('Error during Logout:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        authenticate,
        userLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
