/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import {
  LoginContainer,
  RegisterContainer,
  UserContainer,
  GalleryContainer,
  CustomerContainer,
  EventContainer,
  LandingPageContainer
  // HeaderContainer
} from '../container';
import { rootReducer } from '../store/reducers';
import { Footer } from './Footer';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

const composeEnhancer = composeWithDevTools({});
const reduxStore: Store = createStore(rootReducer, {}, composeEnhancer(applyMiddleware(thunk as ThunkMiddleware)));
// eslint-disable-next-line no-console
reduxStore.subscribe(() => console.log('redux store', reduxStore.getState()));

const App: React.FC = () => {
  return (
    <Provider store={reduxStore}>
      <Router>
        <ToastContainer autoClose={5000} />
        {/* <HeaderContainer> */}
        {/* <Container> */}
        <main>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact={true} strict={true} component={LandingPageContainer} />
              <Route path="/" exact={true} strict={true} component={EventContainer} />
              <Route path="/login" exact={true} strict={true} component={LoginContainer} />
              <Route path="/" exact={true} strict={true} component={CustomerContainer} />
              {/* <Route path="/" exact={true} strict={true} component={EventContainer} />
              <Route path="/" exact={true} strict={true} component={UserContainer} />
              <Route path="/" exact={true} strict={true} component={GalleryContainer} />
              <Route path="/" exact={true} strict={true} component={CustomerContainer} />
              <Route path="/register" exact={true} strict={true} component={RegisterContainer} /> */}
            </Suspense>
          </Switch>
        </main>
        {/* </Container> */}
        <Route path="/" exact={true} strict={true} component={Footer} />
        {/* </HeaderContainer> */}
      </Router>
    </Provider>
  );
};

export default App;
