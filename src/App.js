import React, { createContext } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import { AuthContextProvider, useAuth } from './components/LogIn/useAuth';
import Shipment from './components/Shipment/Shipment';


// export const UserContext = createContext();  //context to export
const PrivateRoute =({ children, ...rest })=> {
    
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div>
      <AuthContextProvider>
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

            <Route path ="/login">
              <LogIn></LogIn>
            </Route>

            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>

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
      </AuthContextProvider>
     
      <footer>
        <p>Developed with <span role="img">❤️</span> by SampadSarker</p>
      </footer>
      
      
    </div>
  );
}

export default App;
