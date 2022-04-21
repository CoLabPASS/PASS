import './Styles/Style.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/HomePage';
import MyAccount from './components/MyAccount';
import QuickJournal from './components/QuickJournal';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/MyAccount' element={<MyAccount/>}/>
          <Route path='/QuickJournal' element={<QuickJournal/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
