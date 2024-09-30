import './App.css';
import {useEffect} from "react";


function App() {

    useEffect(() => {
        window.Telegram.WebApp.ready();
    }, []);

    const closeWindow = () => {
        window.Telegram.WebApp.close();
    }

    return (
        <div className="App">
            <button onClick={closeWindow}>Close</button>
        </div>
    );
}

export default App;
