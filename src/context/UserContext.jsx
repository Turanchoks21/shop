import React, { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function addUser(user) {
    setUsers([user]);
  }

  function clearUsers() {
    setUsers([]);
    localStorage.removeItem("users");
  }

  return (
    <UsersContext.Provider value={{ users, addUser, clearUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
