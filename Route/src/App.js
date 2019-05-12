import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
 
class App extends React.Component {
  render(){
    return(
      <Router>
       <div>
        <Route path="/" component={Home} />
        <Route path="/Page1" component={Page1} />                                                                                                                                                                                                                                                                                   
        <Route path="/Page2" component={Page2} />  
        <Route path="/Page3" component={Page3} />                                                                                                                                                                                                                                                                                                                                                                                                                                          
      </div>
      </Router>
    ) 
  }
}
export default App;
