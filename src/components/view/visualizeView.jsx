import React, { useContext, useEffect } from 'react';
import { Store } from '../../state/store';
import * as d3 from 'd3';
import styled from 'styled-components';
import VisualizerSideBar from '../sideBar/visualizerSidebar';

/*-------------------- Styled Components --------------------*/
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 65px auto;
  grid-template-areas: 
    "viz viz viz viz bar"
    "viz viz viz viz bar";
  height: 100vh;
  background-color: #EEEFF0;
  font-family: "Roboto", sans-serif;
`;

const Viz = styled.div`
  display: grid;
  grid-area: viz;
  height: 100vh;
  background-color: #EEEFF0;
  font-family: "Roboto", sans-serif;
`;


/*-------------------- Functional Component --------------------*/

function VisualizeView() {

  const { state: { visualizeJSON } } = useContext(Store);

  const createViz = () => {
  const svg = d3.select('#vizView').append('svg');
  const width = 700;
  const height = 600;

  const margin = {top: 0, right: 130, bottom: 0, left: 60};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const tree = d3.tree().size([innerHeight, innerWidth]);

  const g = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
      .attr('transform', `translate(${margin.left})`)

  // svg.call(d3.zoom().on('zoom', () => {
  //   zoomG.attr('transform', event.transform);
  // }));

      const root = d3.hierarchy(visualizeJSON);
  
      const links = tree(root).links();
      const LinkGenerator = d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
      
      g.selectAll('path').data(links)
        .enter()
        .append('path')
        .attr('d', LinkGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#DD399C')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', '0.65')
      
      const shapes = g.selectAll('shapes')
        .data(root.descendants()).enter()

      shapes.append('ellipse')
        .filter(d => d.depth % 2 === 0)
        .attr('cx', d => {
          if (d.depth === 3) return d.y + 55;
          else return d.y;
        })
        .attr('cy', d => d.x)
        .attr('rx', 50)
        .attr('ry', 20)
        .attr('stroke', 'rgba(0, 0, 0, 0.2')
        .attr('stroke-width', 1)
        .attr('fill', 'white')

      shapes.append('rect')
        .filter(d => d.depth % 2 === 1)
        .attr('x', d => {
          if (d.depth === 3) return d.y - 20;
          else return d.y - 60;
        })
        .attr('y', d => d.x - 15)
        .attr('width', 120)
        .attr('height', 30)
        .attr('stroke', 'rgba(0, 0, 0, 0.2')
        .attr('stroke-width', 1)
        .attr('fill', 'white')
        .attr('drop-shadow', '2px 2px 3px rgba(0, 0, 0, 0.12)')

      g.selectAll('text').data(root.descendants())
      .enter().append('text')
        .attr('x', d => d.y)
        .attr('y', d => d.x)
        .attr('dy', '0.32em')
        .attr('text-anchor', d => d.depth === 3 ? 'start' : 'middle')
        .text(d => {
          if (d.depth === 0 || d.depth === 2) return d.data.name;
          else return `${d.data.name}: ${d.data.type}`;
        })
        .attr('font-family', 'Helvetica')
        .attr('font-size', 12)


    // for the GLOW
    //Container for the gradients
    const defs = g.append("defs");

    //Filter for the outside glow
    const filter = defs.append("filter")
      .attr("id","glow");
    filter.append("feGaussianBlur")
      .attr("stdDeviation","3.5")
      .attr("result","coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in","coloredBlur");
    feMerge.append("feMergeNode")
      .attr("in","SourceGraphic");

    d3.selectAll("ellipse")
      .style("filter", "url(#glow)");
  }
  
  useEffect(createViz,[])

  return (
    <Container>
      <Viz id="vizView"></Viz>
      <VisualizerSideBar></VisualizerSideBar>
    </Container>   
    
  );
}

export default VisualizeView;
