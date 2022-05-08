import './Styles/Style.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './components/HomePage';
import MyAccount from './components/MyAccount';
import QuickJournal from './components/QuickJournal';
import Journals from './components/Journals';
import Facts from './components/Facts';
import JournalCalendar from './components/JournalCalendar';
import AlternateFactsPage from './components/AlternateFactsPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/MyAccount' element={<MyAccount/>}/>
          <Route path='/QuickJournal' element={<QuickJournal/>}/>
          <Route path='/Journals' element={<Journals/>}/>
          <Route path='/CheckTheFacts' element={<Facts/>}/>
          <Route path='/Calendar' element={<JournalCalendar/>}/>
          <Route path='/AlternateCheckTheFacts' element={<AlternateFactsPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
