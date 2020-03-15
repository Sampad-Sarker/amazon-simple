import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/order-review">
            <OrderReview></OrderReview>
          </Route>

          <Route path="/manage">
            <Manage></Manage>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          {/* dynamic path      /: indecate dynamic path */}
          <Route path="/product/:productKey">  
            <ProductDetail></ProductDetail>
          </Route>

          {/* for irrilivent named page/component */}
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>


      <footer>
        <p>Developed with <span role="img">❤️</span> by SampadSarker</p>
      </footer>
      
      
    </div>
  );
}

export default App;
