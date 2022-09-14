import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore.js'
import { Provider } from "react-redux";

const store = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MainComponent />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
