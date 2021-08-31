import { EvolutionCircle } from "./EvolutionCircle";

export   const ContrailsEvolution = ({
    clusterKey, 
    clusterData, 
    nodeLink,
    xScale, 
    circleYScale, 
    circleRadius, 
    offset}) => {
      // console.log(clusterData)
      let evolutionData = {"nodes":[], "links":[]}
      clusterKey.forEach(clk => {

        let cluster = Object.keys(clusterData[clk])
        // console.log(cluster)
        circleYScale.domain([0, cluster.length])
        let info = {}
        let min = clusterData[clk][cluster[0]].length
        let max = clusterData[clk][cluster[0]].length
        cluster.forEach(point => {
          info[point] = clusterData[clk][point].length
          if(clusterData[clk][point].length < min) min = clusterData[clk][point].length
          if(clusterData[clk][point].length > max) max = clusterData[clk][point].length
        })
        // console.log(info, min, max)
        circleRadius.domain([min, max])
        cluster.forEach(cl => {
          evolutionData.nodes.push({
            "id": cl,
            "x": xScale(clk),
            "y":circleYScale(cluster.indexOf(cl)),
            "r":circleRadius(info[cl])
          })            
        })
      })

      // console.log(nodeLink)
      let links = Object.keys(nodeLink)
      links.forEach(link => {
        console.log(link)
        evolutionData.links.push({
          "node01":nodeLink[link].source,
          "node02":nodeLink[link].target
        })

      });
      console.log(evolutionData)
        
      return (clusterKey.map(clk => {
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
      }))

    };