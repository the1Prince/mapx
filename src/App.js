import logo from './logo.svg';
import './App.css';
import NaviBar from './components/NaviBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopCon from './components/TopCon';

function App() {
  return (
    
     <div style={{height:'100vh'}}>
     <NaviBar></NaviBar>
     <TopCon></TopCon>
     </div>
    
  );
}

export default App;
