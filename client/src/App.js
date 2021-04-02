import { Provider } from "react-redux";
import { configureStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./routes/";
import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Main />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
