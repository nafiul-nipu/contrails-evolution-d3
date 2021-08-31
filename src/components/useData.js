import { useEffect, useState } from "react";
import cluster from "../data/cluster.json";
import network from"../data/network.json"

export const useData = () =>{
    const [clusterData, setClusterData] = useState(null)
    const [nodeLink, setnNodeLink] = useState(null)

    useEffect(() =>{
        // load data
        setClusterData(cluster)
        setnNodeLink(network)
    }, []);

    return {clusterData, nodeLink};
}