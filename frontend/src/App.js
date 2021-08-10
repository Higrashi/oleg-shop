import React from "react";
//Global Style
import GlobalStyle from "./components/GlobalStyle";
//Pages
import AboutPage from './pages/about-page/about-page';
import ShopPage from './pages/shop-page/shop-page';
import ContactsPage from './pages/contacts-page/contacts-page';
import ProductPage from './pages/product-page/product-page';
import ShoppingCartPage from './pages/shopping-cart-page/shopping-cart-page';
import CheckoutPage from './pages/checkout-page/checkout-page';
import OrderCreatedPage from './pages/order-created-page/order-created-page';
import Nav from './components/nav/nav.component';
//Router
import { Switch, Route, useLocation } from "react-router-dom";
//Animation
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <GlobalStyle />

      <Nav />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
          
            <ShopPage />
          </Route>
          <Route path="/about" exact>
            
            <AboutPage />
          </Route>
          <Route path="/shop/:id">
            <ProductPage />
          </Route>
          <Route path="/contact">
            <ContactsPage />
          </Route>
          <Route path='/shopping-cart'>
              <ShoppingCartPage />
          </Route>

          <Route path='/checkout'>
                <CheckoutPage />
          </Route>

          <Route path='/order-created'>
                <OrderCreatedPage />
          </Route>

        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
