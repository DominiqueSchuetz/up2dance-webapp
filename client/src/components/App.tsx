import {
	CounterContainer,
	EventContainer,
	LoginContainer,
	RegisterContainer,
	UserContainer,
	GalleryContainer,
	CustomerContainer
} from "../container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { HeaderContainer } from "../container";
import { rootReducer } from "../store/reducers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "./Footer";

import "semantic-ui-css/semantic.min.css";
import React, { Fragment } from "react";
import { Provider } from "react-redux";

const composeEnhancer = composeWithDevTools({});
const reduxStore: any = createStore(rootReducer, {}, composeEnhancer(applyMiddleware(thunk as ThunkMiddleware)));
reduxStore.subscribe(() => console.log("redux store", reduxStore.getState()));

const App: React.FC = () => {
	return (
		<Provider store={reduxStore}>
			<Router>
				<Fragment>
					<ToastContainer autoClose={5000} />
					<HeaderContainer />
					{/* <Sidebar.Pushable as={Segment}>
						<SideBar animation="scale down" direction="bottom" visible={visible} />
						<Sidebar.Pusher> */}
					<main>
						<Route path="/login" exact strict component={LoginContainer} />
						<Route path="/register" exact strict component={RegisterContainer} />
						<Route path="/" exact component={CounterContainer} />
						<Route path="/" exact strict component={EventContainer} />
						<Route path="/" exact strict component={UserContainer} />
						<Route path="/" exact strict component={GalleryContainer} />
						<Route path="/" exact strict component={CustomerContainer} />
						<Route path="/" exact strict component={Footer} />
					</main>
					{/* </Sidebar.Pusher>
					</Sidebar.Pushable> */}
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
