import React from "react";
import "../../scss/app.scss"
import {Header, Main, Footer} from "../index"

const App: React.FC = () => {
    return (
        <div className="app">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default App;
