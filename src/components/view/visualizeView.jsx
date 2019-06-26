import React, { useContext, useEffect } from 'react';
import { Store } from '../../state/store';
import * as d3 from 'd3';
import styled from 'styled-components';
import VisualizerSideBar from '../sideBar/visualizerSidebar';
import { updateArrayBindingPattern } from 'typescript';

/*-------------------- Styled Components --------------------*/
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 65px auto;
  grid-template-areas: 
    "viz viz viz viz bar"
    "viz viz viz viz bar";
  height: calc(100vh - 64px);
  background-color: #EEEFF0;
  font-family: "Roboto", sans-serif;
`;

const Viz = styled.div`
  display: grid;
  grid-area: viz;
  height: calc(100vh - 64px);
  background-color: #EEEFF0;
  font-family: "Roboto", sans-serif;
  height: calc(100vh - 64px);
`;


/*-------------------- Functional Component --------------------*/

// function VisualizeView() {

//   const { state: { visualizeJSON } } = useContext(Store);

//   function responsivefy(svg) {
//     var container = d3.select(svg.node().parentNode),
//       width = parseInt(svg.style("width")),
//       height = parseInt(svg.style("height")),
//       aspect = width / height;
//     svg.attr("viewBox", "0 0 " + width + " " + height)
//       .attr("perserveAspectRatio", "xMinYMid")
//       .call(resize);
//     d3.select(window).on("resize." + container.attr("id"), resize);

//     function resize() {
//       var targetWidth = parseInt(container.style("width"));
//       svg.attr("width", targetWidth);
//       svg.attr("height", Math.round(targetWidth / aspect));
//     }
//   }

//   const createViz = () => {
//     const svg = d3.select('#vizView').append('svg');
//     const width = 700;
//     const height = 600;

//     const margin = {top: 0, right: 130, bottom: 0, left: 60};
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;
    
//     const tree = d3.tree().size([innerHeight, innerWidth]);

//     const g = svg
//       .attr('width', width)
//       .attr('height', height)
//       .call(responsivefy)
//       .append('g')
//         .attr('transform', `translate(${margin.left})`)
      
//     const root = d3.hierarchy(visualizeJSON);

//     const links = tree(root).links();
//     const LinkGenerator = d3.linkHorizontal()
//       .x(d => d.y)
//       .y(d => d.x)
    
//     g.selectAll('path').data(links)
//       .enter()
//       .append('path')
//       .attr('d', LinkGenerator)
//       .attr('fill', 'none')
//       .attr('stroke', '#DD399C')
//       .attr('stroke-width', 2)
//       .attr('stroke-opacity', '0.65')
        
//     const shapes = g.selectAll('shapes')
//       .data(root.descendants()).enter()

//     shapes.append('ellipse')
//       .filter(d => d.depth % 2 === 0)
//       .attr('class', 'ellipse')
//       .attr('cx', d => {
//         if (d.depth === 3) return d.y + 55;
//         return d.y;
//       })
//       .attr('cy', d => d.x)
//       .attr('rx', 50)
//       .attr('ry', 20)
//       .attr('stroke', 'rgba(0, 0, 0, 0.12')
//       .attr('stroke-width', 0.5)
//       .attr('fill', 'white')

//     shapes.append('rect')
//       .filter(d => d.depth % 2 === 1)
//       .attr('class', 'rect')
//       .attr('x', d => {
//         if (d.depth === 3) return d.y - 10;
//         return d.y - 60;
//       })
//       .attr('y', d => d.x - 15)
//       .attr('width', 120)
//       .attr('height', 30)
//       .attr('stroke', 'rgba(0, 0, 0, 0.12')
//       .attr('stroke-width', 0.5)
//       .attr('fill', 'white')

//     g.selectAll('text').data(root.descendants())
//     .enter().append('text')
//       .attr('x', d => d.y)
//       .attr('y', d => d.x)
//       .attr('dy', '0.32em')
//       .attr('text-anchor', d => d.depth === 3 ? 'start' : 'middle')
//       .text(d => {
//         if (d.depth === 0 || d.depth === 2) return d.data.name;
//         return `${d.data.name}: ${d.data.type}`;
//       })
//       .attr('font-family', 'Helvetica')
//       .attr('font-size', '0.8em')
//       .attr('cursor', 'pointer')

//     // GLOW effect
//     const defs = svg.append("defs");

//     const filter = defs.append("filter")
//       .attr("id","glow");
//     filter.append("feGaussianBlur")
//       .attr("stdDeviation","5")
//       .attr("result","coloredBlur");
    
//     const feMerge = filter.append("feMerge");
//     feMerge.append("feMergeNode")
//       .attr("in","coloredBlur");
//     feMerge.append("feMergeNode")
//       .attr("in","SourceGraphic");

//     d3.selectAll(".ellipse")
//       .style("filter", "url(#glow)");

//     d3.selectAll(".rect")
//       .style("filter", "url(#glow)");

//   }
  
//   useEffect(createViz,[])

//   return (
//     <Container>
//       <Viz id="vizView"></Viz>
//       <VisualizerSideBar></VisualizerSideBar>
//     </Container>   
    
//   );
// }

function VisualizeView() {

  const { state: { visualizeJSON } } = useContext(Store);

  const treeData = visualizeJSON;

  function createViz() {

    var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#vizView").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var i = 0,
        duration = 750,
        root;

    var treemap = d3.tree().size([height, width]);

    root = d3.hierarchy(treeData, function(d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    root.children.forEach(collapse);
    update(root);

    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update(source) {

      var treeData = treemap(root);
      var nodes = treeData.descendants();
      var links = treeData.descendants().slice(1);
      
      nodes.forEach(function(d){ d.y = d.depth * 180});

      var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

      var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
      .on('click', click);
      
      nodeEnter.append('ellipse')
        .attr('class', 'ellipse')
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        })

      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("text-anchor", 'middle')
        .text(function(d) {
          if (d.depth % 2 === 0) return d.data.name;
          return `${d.data.name}: ${d.data.type}`
        })
        .attr('font-size', '0.7em')
        .attr('cursor', 'pointer');

      var nodeUpdate = nodeEnter.merge(node);
      
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate.select('ellipse.node')
        .attr('r', 10)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');

      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select('ellipse')
        .attr('rx', 1e-6)
        .attr('ry', 1e-6);

      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

      var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        });

      var linkUpdate = linkEnter.merge(link);

      linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

      var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
          var o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove();

      nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s, d) {

        const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
    
        return path;
      }

      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }

      d3.selectAll('path')
        .attr('fill', 'none')
        .attr('stroke', '#DD399C')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', '0.65')

      d3.selectAll('ellipse')
        .attr('rx', 60)
        .attr('ry', 20)
        .attr('stroke', 'rgba(0, 0, 0, 0.18')
        .attr('stroke-width', 0.5)
        .attr('fill', 'white')

      // GLOW effect
      const defs = svg.append("defs");

      const filter = defs.append("filter")
        .attr("id","glow");
      filter.append("feGaussianBlur")
        .attr("stdDeviation","5")
        .attr("result","coloredBlur");
      
      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode")
        .attr("in","coloredBlur");
      feMerge.append("feMergeNode")
        .attr("in","SourceGraphic");

      d3.selectAll(".ellipse")
        .style("filter", "url(#glow)");

    }
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
