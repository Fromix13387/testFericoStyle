import React, {useEffect, useState} from 'react';
import {UserService} from "../services/UserService.js";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import {TaskService} from "../services/TaskService.js";

const TodoView = () => {
    const navigate = useNavigate();
    const [user] = useState(() => UserService.getUser());
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (!user?.id) navigate("/login");

        TaskService.list().then(setTasks)
    }, [user]);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");
    async function createTasks(title, description) {
        const data = await TaskService.create({title, description});
        setTasks((arr) => [...arr, data]);
    }
    async function updateTasks(title, description) {
        const data = await TaskService.update(editId, {title, description});
        setTasks((arr) => arr.map((t) => (t.id === data.id ? data : t)));
    }
    async function addTask() {
        const vTitle = title.trim();
        const vText = text.trim();
        if (!vTitle) {
            setError("Заголовок не может быть пустым");
            return;
        }

        await createTasks(vTitle, vText);
        setText("");
        setTitle("");
    }
    async function delTask(id) {
        await TaskService.delete(id);
        setTasks((arr) => arr.filter((t) => t.id !== id));
    }
    function startEdit(task) {
        setEditId(task.id);
        setText(task.description || "");
        setTitle(task.title || "");
    }

    async function saveEdit() {
        const vTitle = title.trim();
        const vText = text.trim();
        if (!vTitle) {
            setError("Заголовок не может быть пустым");
            return;
        }
        await updateTasks(vTitle, vText);

        setEditId(null);
        setText("");
        setTitle("");
    }

    async function logout() {
        await UserService.logout();
        navigate("/login");
    }

    return (
        <div className="mx-auto w-full max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">Список задач</h1>
                <div className="flex items-center gap-2">
                    <span className="hidden text-sm text-slate-500 sm:block">{user?.email}</span>
                    <Button
                        variant="ghost"
                        onClick={logout}
                    >
                        Выйти
                    </Button>
                </div>
            </div>


            <Card
                title="Добавить задачу"
            >
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Input
                        placeholder="Заголовок задачи…"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Опишите задачу…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {editId ? (
                        <div className="flex gap-2">
                            <Button onClick={saveEdit}>Сохранить</Button>
                            <Button variant="ghost" onClick={() => { setEditId(null); setText(""); setTitle(""); }}>Отмена</Button>
                        </div>
                    ) : (
                        <Button onClick={addTask}>Добавить</Button>
                    )}
                </div>
                {error && (
                    <p onClick={() => setError("")} className="cursor-pointer rounded-xl bg-rose-50 p-2 text-sm text-rose-700 text-center">{error}</p>
                )}
            </Card>


            <div className="mt-6 space-y-3">
                {tasks.length === 0 ? (
                    <p className="text-center text-sm text-slate-500">Задач нет</p>
                ) : (
                    tasks.map((t) => (
                        <div
                            key={t.id}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                        >
                            <label className="flex flex-1 items-center gap-3">

                                <div className="flex flex-col">
                                    <span className={ ""}>{t.title}</span>
                                    <span className={"opacity-60"}>{t.description}</span>
                                </div>

                            </label>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => startEdit(t)}>Изменить</Button>
                                <Button variant="danger" onClick={() => delTask(t.id)}>Удалить</Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoView;