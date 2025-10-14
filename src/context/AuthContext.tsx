// import React, { createContext, useState, useEffect, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (token: string, user: User, rememberMe?: boolean) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   login: () => {},
//   logout: () => {},
//   isAuthenticated: false,
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Load from storage (localStorage preferred, fallback sessionStorage)
//   useEffect(() => {
//     const savedToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
//     const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  
//     if (savedToken && savedUser) {
//       try {
//         setToken(savedToken);
//         setUser(JSON.parse(savedUser)); // ✅ only parse if not null
//       } catch (err) {
//         console.error("Error parsing user from storage:", err);
//         localStorage.removeItem("user");
//         sessionStorage.removeItem("user");
//       }
//     }
//   }, []);
  

//   const login = (token: string, user: User, rememberMe: boolean = true) => {
//     if (rememberMe) {
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       sessionStorage.setItem("authToken", token);
//       sessionStorage.setItem("user", JSON.stringify(user));
//     }
//     setToken(token);
//     setUser(user);
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;          // backend `_id`
  fullName: string;    // backend `fullName`
  email: string;
  phone?: string;
  role?: string;       // backend me "session" aa raha hai, use as role
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load from storage
  useEffect(() => {
    const savedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing user from storage:", err);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = (token: string, user: User, rememberMe: boolean = true) => {
    if (rememberMe) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    setToken(token);
    setUser(user);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
