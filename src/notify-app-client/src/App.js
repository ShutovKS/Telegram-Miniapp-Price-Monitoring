import './App.css';
import {useEffect} from "react";
import useTelegram from "./hooks/useTelegram";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";


function App() {
    const {tg, toggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Header/>
                <MainLayout>
                    <button onClick={toggleButton}>Send Message</button>
                </MainLayout>
            </header>
        </div>
    );
}

export default App;
