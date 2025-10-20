import './App.css'
import {BrowserRouter} from "react-router-dom";
import Root from "./Root.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="mx-auto max-w-5xl">
                <Root />
            </div>
        </BrowserRouter>
    );
}

export default App
