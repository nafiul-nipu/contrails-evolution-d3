import { NodeDiagram } from "./NodeDiagram";
import { LinkDiagram } from "./LinkDiagram";

export   const ContrailsEvolution = ({
    clusterKey, 
    clusterData, 
    nodeLink,
    sortdata,
    xScale, 
    circleYScale, 
    circleRadius, 
    offset,
    name
  }) => {
      // console.log(name)
      // console.log('cluster key: ', clusterKey)
      // console.log('cluster data', clusterData)
      // console.log('node link: ', nodeLink)
      console.log('sort data: ', sortdata)
      let evolutionData = {"nodes":[], "links":[]}
      clusterKey.forEach(clk => {

        // let cluster = Object.keys(clusterData[clk])
        let cluster = sortdata[clk]
        // console.log(clk, cluster, sortdata[clk])

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
          // console.log(cl)
          // console.log(cluster.indexOf(cl))
          evolutionData.nodes.push({
            "id": cl,
            "x": xScale(clk),
            "y":circleYScale(cluster.indexOf(cl)),
            "r":circleRadius(info[cl])
          })            
        })
      })

      console.log(evolutionData.nodes)
      console.log(nodeLink)
      let links = Object.keys(nodeLink)
      console.log(links)
      links.forEach(link => {
        // console.log(link)
        console.log(nodeLink[link].source)
        // console.log(evolutionData.nodes)
        let sourceIndex = evolutionData.nodes.findIndex(x => x.id === nodeLink[link].source)
        let targetIndex = evolutionData.nodes.findIndex(x => x.id === nodeLink[link].target)
        evolutionData.links.push(
          // this one is needed is we want d3.line
          // [
          //   {"x": evolutionData.nodes[nodeLink[link].source].x, "y": evolutionData.nodes[nodeLink[link].source].y},
           
          //   {"x":evolutionData.nodes[nodeLink[link].target].x, "y": evolutionData.nodes[nodeLink[link].target].y}
          // ]
          // this one is for linkHorizontal or linkVertical
          // latest data source starts from 1 rather than 0, hence linck - 1
          {
            "id1": nodeLink[link].source,
            "id2": nodeLink[link].target,
            "source": [evolutionData.nodes[sourceIndex].x, evolutionData.nodes[sourceIndex].y],
            "target": [evolutionData.nodes[targetIndex].x, evolutionData.nodes[targetIndex].y]
          }
        )

      });
      // console.log(evolutionData)
      return(
        <g transform={`translate(${offset},0)`}>
          <LinkDiagram 
            links={evolutionData.links}
            name={name}
          />
          <NodeDiagram 
            nodes={evolutionData.nodes}
            name={name}
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
    