import './App.css';
import { scaleBand, scaleLinear, extent} from 'd3';
import {useData} from  './components/useData'
import { AxisBottom } from './components/AxisBottom';
import { Border } from './components/Border';



const width = 960;
const height = 500;
const margin = {top:20, right:30, bottom:50, left:30};

function App() {
  const {clusterData, nodeLink} = useData();  

  if(!clusterData){
    return <div>Loading .... </div>
  }

  // console.log(clusterData['0.07'])
  const clusterKey = Object.keys(clusterData)

  // console.log(clusterKey)
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
                    .domain(clusterKey)
                    .range([0, innerWidth])
                    .paddingInner(0.1)

  const circleYScale = scaleLinear()
                        .range([margin.top, innerHeight - margin.top-margin.bottom])


  const circleRadius = scaleLinear()
                        .range([5, 10])
  const ClusterCircle = ({xScale, circleYScale, cluster, clusterInfo, time, offset}) => 
    cluster.map(cl => (
      <circle
        cx={xScale(time) + offset}
        cy={circleYScale(cluster.indexOf(cl))}
        r={2}
      />
    ));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom 
          xScale={xScale}
          innerHeight={innerHeight}
          />

        <Border 
          xScale = {xScale}
          heightOffset = {margin.top}
          innerHeight={innerHeight}
        />
        {
          clusterKey.map(clk => {
            let cluster = Object.keys(clusterData[clk])
            circleYScale.domain([0, cluster.length])
            console.log([0, cluster.length])
            return(
              <ClusterCircle 
                xScale={xScale}
                circleYScale = {circleYScale}
                cluster = {cluster}
                clusterInfo = {clusterData[clk]}
                time={clk}
                offset={margin.top}

              />
            )
          })
        }
        {/* <ClusterCircle 
          data={clusterData}
          clusteKey={clusterKey}
          xScale={xScale}
          circleYScale={circleYScale}
        /> */}
      </g>
    </svg>
  );
}

export default App;
