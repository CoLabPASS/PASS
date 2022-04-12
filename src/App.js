import './Styles/Style.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/HomePage';
import MyAccount from './components/MyAccount';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/MyAccount' element={<MyAccount/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
