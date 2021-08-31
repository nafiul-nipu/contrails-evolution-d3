export const AxisBottom = ({xScale, innerHeight}) => {
    return (
        <g transform={`translate(0, ${innerHeight})`}>
            {xScale.domain().map(tickValue => (
            
                <text 
                    key={`botAxis${tickValue}`}
                    x={xScale(tickValue) + xScale.bandwidth() / 5}
                    // y={innerHeight}
                    dy={'0.32em'}
                >
                    {tickValue}
                </text>
            ))}
        </g>
    );
    };