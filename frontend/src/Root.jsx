import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthView from "./views/AuthView.jsx";
import {UserService} from "./services/UserService.js";
import TodoView from "./views/TodoView.jsx";

const Root = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        UserService.load()
            .then(() => {
                setUser(UserService.getUser())
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    const isAuth = !!user?.id;

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuth  ? "/login" : "/tasks"} replace />} />
            <Route path="/login" element={<AuthView />} />
            <Route path="/tasks" element={<TodoView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Root;