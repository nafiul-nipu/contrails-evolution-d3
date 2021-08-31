export   const EvolutionCircle = ({
    xScale, 
    circleYScale, 
    cluster, 
    clusterInfo, 
    time, 
    circleRadius}) => 
cluster.map(cl => (
  <circle
    key={`circle ${cl}`}
    className={"circleCon"}
    cx={xScale(time)}
    cy={circleYScale(cluster.indexOf(cl))}
    r={circleRadius(clusterInfo[cl])}
  />
));
