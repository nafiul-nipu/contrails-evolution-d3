import './App.css';
import {useData} from  './components/useData'


const width = 960;
const height = 500;
const margin = {top:20, right:30, bottom:30, left:30};

function App() {
  const {clusterData, nodeLink} = useData();

  if(!clusterData){
    return <div>Loading .... </div>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
