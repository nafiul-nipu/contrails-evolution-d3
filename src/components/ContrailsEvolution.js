import { EvolutionCircle } from "./EvolutionCircle";

export   const ContrailsEvolution = ({
    clusterKey, 
    clusterData, 
    xScale, 
    circleYScale, 
    circleRadius, 
    offset}) => clusterKey.map(clk => {
    let cluster = Object.keys(clusterData[clk])
    circleYScale.domain([0, cluster.length])
    let info = {}
    let min = clusterData[clk][cluster[0]].length
    let max = clusterData[clk][cluster[0]].length
    // console.log(cluster)
    cluster.forEach(point => {
      info[point] = clusterData[clk][point].length
      if(clusterData[clk][point].length < min) min = clusterData[clk][point].length
      if(clusterData[clk][point].length > max) max = clusterData[clk][point].length
    })
    // console.log(info, min, max)
    circleRadius.domain([min, max])
    return(
      <g transform={`translate(${offset},0)`} key={`evo${clk}`}>
        <EvolutionCircle 
            xScale={xScale}
            circleYScale = {circleYScale}
            cluster = {cluster}
            clusterInfo = {info}
            time={clk}
            circleRadius={circleRadius}
        />
      </g>
    )
  });