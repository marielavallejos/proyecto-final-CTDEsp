import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
export interface UserToken {
  id: number | undefined,
  name: string,
  lastname: string,
  email: string,
  profileUrl: string,
  userType: {
    id: number,
    name: string
  },
}

interface AuthContextProps {
  token: string | null;
  user: UserToken | null
  setUser: React.Dispatch<React.SetStateAction<UserToken | null>>;
  setuserState: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({ token: null, user: null, setUser: () => { }, setuserState: () => { }, });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserToken | null>(null);
  const [userState, setuserState] = useState<string>("")


  useEffect(() => {
    if (userState == "logout") {
      setUser(null)
      return
    }
    // Obtener el token de la cookie al cargar la página
    const initialToken = document.cookie;
    const targetCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('access-confirmacion='));

    if (targetCookie) {
      const tokenValue = targetCookie.split('=')[1];
      try {
        const parsedToken = JSON.parse(tokenValue);
        console.log('parsedToken', parsedToken)
        const { token, ...user } = parsedToken
        setToken(token);
        setUser((prevUser) => ({ ...prevUser, ...user }));
      } catch (error) {
        console.error('Error al analizar el token JSON:', error);
      }
    } else {
      return setToken(initialToken)
    }

  }, [userState]);



  return <AuthContext.Provider value={{ token, user, setUser, setuserState }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
