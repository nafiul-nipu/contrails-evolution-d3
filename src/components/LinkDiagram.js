import { linkHorizontal} from "d3";


export const LinkDiagram = ({links}) => links.map(link => (
    <path className="pathCon"
      d={linkHorizontal()
          .source(d =>d.source)
          .target(d=>d.target)
          (link)
        }
    />
  ));