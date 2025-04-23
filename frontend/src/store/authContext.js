import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');


    if (token && role && adminId) {
      setAdmin({ token, role, adminId });
    }
  }, []);

  // Слушаем изменения localStorage и обновляем user
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const adminId = localStorage.getItem('adminId');

      if (token && role && adminId) {
        setAdmin({ token, role, adminId });
      } else {
        setAdmin(null); // Сбрасываем состояние, если данные удалены
      }
    };

    // Подписываемся на изменения localStorage
    window.addEventListener('storage', handleStorageChange);

    // Отписываемся при размонтировании
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token, admin) => {
    setAdmin({ token, role: admin.role, adminId: admin.id, name: admin.name});
    localStorage.setItem('token', token);
    localStorage.setItem('role', admin.role);
    localStorage.setItem('adminId', admin.id);
    localStorage.setItem('name', admin.name);

  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');

    
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
