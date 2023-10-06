import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import store from "./components/store"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
