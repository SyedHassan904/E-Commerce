import adminContext from "./adminContext.js";
import React, { useEffect, useMemo, useState } from "react"
export default function AdminContextProvider({ children }) {
    const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const [theme, setTheme] = useState(() => {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('admin-theme') : null;
        return saved || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('admin-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    const contextValue = useMemo(() => ({ backendURL, theme, toggleTheme }), [backendURL, theme]);
    return (
        <adminContext.Provider value={contextValue}>
            {children}
        </adminContext.Provider>
    )
}