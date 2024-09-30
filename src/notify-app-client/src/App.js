import {useEffect, useState} from "react";
import useTelegram from "./hooks/useTelegram";
import Header from "./view/components/Header";
import MainLayout from "./view/components/MainLayout";
import FullscreenLoader from "./view/components/FullscreenLoader";


function App() {
    const {tg} = useTelegram();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tg.ready();
        setLoading(false);
    }, []);

    return (loading
            ? <FullscreenLoader/>
            : <div>
                <Header/>
                <MainLayout>
                </MainLayout>
            </div>
    );
}

export default App;
