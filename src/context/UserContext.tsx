import React, { createContext, useState, useEffect } from "react";

interface UserContextInterface {
  email: string;
  id: string;
  name: string;
  role: string;
  token: string;
  login: ({}: UserContextInterface) => void;
  logout: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextInterface);

let textUser = localStorage.getItem("user");

const initialState: UserContextInterface = {
  email: "",
  id: textUser ? JSON.parse(textUser).id : "",
  name: "",
  role: "",
  token: textUser ? JSON.parse(textUser).token : "",
  login: (user: UserContextInterface) => {},
  logout: () => {},
};

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    let textUser = localStorage.getItem("user");
    if (!textUser) return;

    const user = JSON.parse(textUser);

    login(user);
  }, []);

  const login = (user: UserContextInterface) => {
    setUser({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      token: user.token,
      login: () => {},
      logout: () => {},
    });

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser({ ...initialState, id: "", token: "" });

    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        ...user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
