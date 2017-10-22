import React, {Component} from 'react';
import './App.css';
import Header from "./component/head";
import Footer from "./component/foot";
import Content from "./component/content";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        );
    }
}

export default App;
