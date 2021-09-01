import { NodeDiagram } from "./NodeDiagram";
import { LinkDiagram } from "./LinkDiagram";

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
        // console.log(link)
        evolutionData.links.push(
          // this one is needed is we want d3.line
          // [
          //   {"x": evolutionData.nodes[nodeLink[link].source].x, "y": evolutionData.nodes[nodeLink[link].source].y},
           
          //   {"x":evolutionData.nodes[nodeLink[link].target].x, "y": evolutionData.nodes[nodeLink[link].target].y}
          // ]
          // this one is for linkHorizontal or linkVertical
          {
            "source": [evolutionData.nodes[nodeLink[link].source].x, evolutionData.nodes[nodeLink[link].source].y],
            "target": [evolutionData.nodes[nodeLink[link].target].x, evolutionData.nodes[nodeLink[link].target].y]
          }
        )

      });
      return(
        <g transform={`translate(${offset},0)`}>
          <NodeDiagram 
            nodes={evolutionData.nodes}
          />
          <LinkDiagram 
            links={evolutionData.links}
          />
        </g>
      )

    };



/**
 * return (clusterKey.map(clk => {
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
 */
    