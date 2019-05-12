import React, {Component} from 'react';
import './App.css';
import Link from "react-router-dom/es/Link";
import About from "./containers/about";
import Inbox from "./containers/inbox";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Inbox">Inbox</Link></li>
                    <li><Link to="/Messages/2">Message</Link></li>
                </ul>

                <main>
                    <Switch>
                        <Route path="/About" component={About}/>
                        <Route path="/Inbox" component={Inbox}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

export default App;