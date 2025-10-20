import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {UserService} from "../services/UserService.js";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import {setToken} from "../untils/api.js";

function AuthView() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login"); // 'login' | 'register'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function submit(e) {
        e.preventDefault();
        setError("");
        if (!email || !password) return setError("Заполните все поля");


        try {
            let data;
            if (mode === "register") {
                data = await UserService.register(email, password);
            } else {
                data = await UserService.login(email, password);
            }

            if(data.error) {
                return setError(data.message);
            }

            setToken(data.token);
            await UserService.load();

            navigate("/tasks");
        } catch (err) {
            console.error(err);
            setError("Ошибка авторизации");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-md">
            <Card
                title={mode === "login" ? "Вход" : "Регистрация"}
            >
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <label className="mb-1 block text-sm text-slate-600">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-slate-600">Пароль</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <Button className="w-full" disabled={loading}>
                        {loading ? "Подождите…" : mode === "login" ? "Войти" : "Зарегистрироваться"}
                    </Button>

                    <div
                        className="text-sm text-sky-700 text-end w-full cursor-pointer"
                        onClick={() => {
                            setMode(mode === "login" ? "register" : "login");
                            setError("");
                        }}
                    >
                        {mode === "login" ? "Создать аккаунт" : "У меня уже есть аккаунт"}

                    </div>

                    {error && (
                        <p onClick={() => setError("")} className="cursor-pointer rounded-xl bg-rose-50 p-2 text-sm text-rose-700 text-center">{error}</p>
                    )}
                </form>
            </Card>
        </div>
    )

}
export default AuthView;