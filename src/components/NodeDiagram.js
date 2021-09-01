export const NodeDiagram = ({nodes}) => nodes.map(node=>(
  <circle className="circleCon"
    cx={node.x}
    cy={node.y}
    r={node.r}
    
  />
))
