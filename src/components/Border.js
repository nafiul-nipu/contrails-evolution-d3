import '../App.css'
export const Border = ({xScale, innerHeight, heightOffset}) => {
    return(
      <g className='border'>
        {xScale.domain().map(value => (
          <rect 
            key={`border${value}`}
            x={xScale(value)}
            width={xScale.bandwidth()}
            height={innerHeight - heightOffset}
          />
        ))}
      </g>
    );
  };