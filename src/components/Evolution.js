import { AxisBottom } from './AxisBottom';
import { Border } from './Border';
import { ContrailsEvolution } from './ContrailsEvolution';

export const Evolution = ({
    width,
    height,
    margin,
    xScale,
    innerHeight,
    clusterKey,
    clusterData,
    nodeLink,
    circleYScale,
    circleRadius
}) => {


    return(
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
    )
}