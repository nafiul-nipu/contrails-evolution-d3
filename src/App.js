import './App.css';
import { useEffect, useState } from 'react';
import { scaleBand, scaleLinear} from 'd3';
import {useData} from  './components/useData'
import { Evolution } from './components/Evolution';

import cluster from "./data/contrails1-cluster.json";
import network from"./data/contrails1-network.json";
import sortList from "./data/contrails1-sort.json"

import cluster2 from "./data/contrails2-cluster.json";
import network2 from"./data/contrails2-network.json";
import sortList2 from "./data/contrails2-sort.json"

import cluster3 from "./data/contrails3-cluster.json";
import network3 from"./data/contrails3-network.json";
import sortList3 from "./data/contrails3-sort.json";


const width = 750;
const height = window.innerHeight / 2.1;
const margin = {top:20, right:30, bottom:50, left:30};

function App() {
  // const {clusterData, nodeLink} = useData(cluster, network); 
  // const {clusterData2, nodeLink2} = useData(2)

  const [clusterData, setClusterData] = useState(null)
  const [nodeLink, setnNodeLink] = useState(null)
  const [sortlist, setsortlist] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData(cluster)
    setnNodeLink(network)
    setsortlist(sortList)
  }, [cluster, network, sortList]);

  const [clusterData2, setClusterData2] = useState(null)
  const [nodeLink2, setnNodeLink2] = useState(null)
  const [sortlist2, setsortlist2] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData2(cluster2)
    setnNodeLink2(network2)
    setsortlist2(sortList2)
  }, [cluster2, network2, sortList2]);


  const [clusterData3, setClusterData3] = useState(null)
  const [nodeLink3, setnNodeLink3] = useState(null)
  const [sortlist3, setsortlist3] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData3(cluster3)
    setnNodeLink3(network3)
    setsortlist3(sortList3)
  }, [cluster3, network3, sortList3]);
  

  // console.log(clusterData)
  if(!clusterData){
    return <div>Loading .... </div>
  }

  // console.log(nodeLink)
  const clusterKey = Object.keys(clusterData)

  // console.log(clusterKey)
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
                    .domain(clusterKey)
                    .range([0, innerWidth])
                    .paddingInner(0.1)

  const circleYScale = scaleLinear()
                        .range([margin.top, innerHeight])


  const circleRadius = scaleLinear()
                        .range([5, 10])
  

  return (
    <>
        <Evolution
            width = {width}
            height = {height}
            margin = {margin}
            xScale = {xScale}
            innerHeight = {innerHeight}
            clusterKey = {clusterKey}
            clusterData = {clusterData}
            nodeLink = {nodeLink}
            sortdata={sortlist}
            circleYScale = {circleYScale}
            circleRadius = {circleRadius}
            name='c1'
        />
        <Evolution
            width = {width}
            height = {height}
            margin = {margin}
            xScale = {xScale}
            innerHeight = {innerHeight}
            clusterKey = {clusterKey}
            clusterData = {clusterData2}
            nodeLink = {nodeLink2}
            sortdata={sortlist2}
            circleYScale = {circleYScale}
            circleRadius = {circleRadius}
            name='c2'
        />

        <Evolution
            width = {width}
            height = {height}
            margin = {margin}
            xScale = {xScale}
            innerHeight = {innerHeight}
            clusterKey = {clusterKey}
            clusterData = {clusterData3}
            nodeLink = {nodeLink3}
            sortdata={sortlist3}
            circleYScale = {circleYScale}
            circleRadius = {circleRadius}
            name='c3'
        />
    </>

  );
}

export default App;
