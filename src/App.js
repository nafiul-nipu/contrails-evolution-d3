import './App.css';
import { scaleBand, scaleLinear, line} from 'd3';
import {useData} from  './components/useData'
import { AxisBottom } from './components/AxisBottom';
import { Border } from './components/Border';
import { ContrailsEvolution } from './components/ContrailsEvolution';



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


  // const NodeLink = ({circleYScale}) => {
  // //   var element = document.getElementById('14' );
  // //   // var rect = element.getBoundingClientRect();
  // //   console.log(element)
  // //   // console.log(rect)
  // // // console.log(nodeLink)
  //   let x1 = xScale('0.06')
  //   let x2 = xScale('0.07')
  //   let xx = scaleLinear().domain([0,0]).range()
  //   let y1 = circleYScale(0)
  //   circleYScale.domain([0, 2])
  //   let y2 = circleYScale(2)
  //   console.log(x1,x2,y1,y2)
  //   return(
  //     <line
  //         x1={0}
  //         y1={20}
  //         x2={60}
  //         y2={54}
  //         stroke='black'
  //       />
  //   )

  // }
  

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

        <ContrailsEvolution 
          clusterKey={clusterKey}
          clusterData={clusterData}
          nodeLink={nodeLink}
          xScale={xScale}
          circleYScale={circleYScale}
          circleRadius={circleRadius}
          offset={margin.top}
        />

      </g>
    </svg>
  );
}

export default App;
