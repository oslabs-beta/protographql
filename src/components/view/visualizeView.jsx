import React, { useContext, useEffect } from 'react';
import { Store } from '../../state/store';
import * as d3 from 'd3';
import styled from 'styled-components';
import VisualizerSideBar from '../sideBar/visualizerSidebar';

/*-------------------- Styled Components --------------------*/
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: 
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

function VisualizeView() {

  const { state: { visualizeJSON } } = useContext(Store);

  const treeData = visualizeJSON;

  function createViz() {

    function responsivefy(svg) {
      const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height"));
      svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMidYMid")
        .call(resize);
      d3.select(window).on("resize." + container.attr("id"), resize);

      function resize() {
        const targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", "calc(100vh - 70px)");
      }
    }

    const fillColor = "#F2EEF6";

    const margin = { top: 20, right: 120, bottom: 20, left: 80 },
      width = 700 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#vizView").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .call(responsivefy)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    let i = 0;
    const duration = 750;
    let root;

    const treemap = d3.tree().size([height, width]);

    root = d3.hierarchy(treeData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    function update(source) {

      const treeData = treemap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach(function (d) { d.y = d.depth * 180 });

      const node = svg.selectAll('g.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

      nodeEnter.append('ellipse')
        .attr('class', 'ellipse')
        .style("fill", function (d) {
          return d._children ? fillColor : "#fff";
        })

      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("text-anchor", 'middle')
        .text(function (d) {
          if (d.depth % 2 === 0) return d.data.name;
          return `${d.data.name}: ${d.data.type}`
        })
        .attr('font-size', '0.7em')
        .attr('cursor', 'pointer');

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      nodeUpdate.select('ellipse.node')
        .style("fill", function (d) {
          return d._children ? fillColor : "#fff";
        })
        .attr('cursor', 'pointer');

      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select('ellipse')
        .attr('rx', 1e-6)
        .attr('ry', 1e-6);

      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      const link = svg.selectAll('path.link')
        .data(links, function (d) { return d.id; });

      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function (d) {
          const o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        });

      const linkUpdate = linkEnter.merge(link);

      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent) });

      const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          const o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove();

      nodes.forEach(function (d) {
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
        .attr('stroke-opacity', '1')

      d3.selectAll('ellipse')
        .attr('rx', 66)
        .attr('ry', 16)
        .attr('stroke', 'rgba(0, 0, 0, 0.18')
        .attr('stroke-width', 0.5)
        .attr('fill', 'white')

      // GLOW effect
      const defs = svg.append("defs");
      const colors = ["#A852E5", "#14BDEB", "#0D18E8"];

      //set color (white glow) for parent node
      const filter0 = defs.append("filter")
        .attr("id", "glow0");
      filter0.append("feGaussianBlur")
        .attr("stdDeviation", "5")
        .attr("result", "coloredBlur");
      const feMerge0 = filter0.append("feMerge");
      feMerge0.append("feMergeNode")
        .attr("in", "coloredBlur");
      feMerge0.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // set color for queries
      const filter1 = defs.append("filter")
        .attr("id", "glow1");

      filter1.append("feMorphology")
        .attr("operator", "dilate")
        .attr("radius", 1.5)
        .attr("in", "SourceAlpha")
        .attr("result", "thicken");

      filter1.append("feGaussianBlur")
        .attr("in", "thicken")
        .attr("stdDeviation", "2")
        .attr("result", "blurred");

      filter1.append("feFlood")
        .attr("flood-color", colors[0])
        .attr("result", "glowColor")

      filter1.append("feComposite")
        .attr("in", "glowColor")
        .attr("in2", "blurred")
        .attr("operator", "in")
        .attr("result", "softGlow_colored")

      const feMerge1 = filter1.append("feMerge");
      feMerge1.append("feMergeNode")
        .attr("in", "softGlow_colored");
      feMerge1.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // set color for types
      const filter2 = defs.append("filter")
        .attr("id", "glow2");

      filter2.append("feMorphology")
        .attr("operator", "dilate")
        .attr("radius", 1.5)
        .attr("in", "SourceAlpha")
        .attr("result", "thicken");

      filter2.append("feGaussianBlur")
        .attr("in", "thicken")
        .attr("stdDeviation", "2")
        .attr("result", "blurred");

      filter2.append("feFlood")
        .attr("flood-color", colors[1])
        .attr("result", "glowColor")

      filter2.append("feComposite")
        .attr("in", "glowColor")
        .attr("in2", "blurred")
        .attr("operator", "in")
        .attr("result", "softGlow_colored")

      const feMerge2 = filter2.append("feMerge");
      feMerge2.append("feMergeNode")
        .attr("in", "softGlow_colored");
      feMerge2.append("feMergeNode")
        .attr("in", "SourceGraphic");

      // set color for queryable
      const filter3 = defs.append("filter")
        .attr("id", "glow3");

      filter3.append("feMorphology")
        .attr("operator", "dilate")
        .attr("radius", 1.5)
        .attr("in", "SourceAlpha")
        .attr("result", "thicken");

      filter3.append("feGaussianBlur")
        .attr("in", "thicken")
        .attr("stdDeviation", "2")
        .attr("result", "blurred");

      filter3.append("feFlood")
        .attr("flood-color", colors[2])
        .attr("result", "glowColor")

      filter3.append("feComposite")
        .attr("in", "glowColor")
        .attr("in2", "blurred")
        .attr("operator", "in")
        .attr("result", "softGlow_colored")

      const feMerge3 = filter3.append("feMerge");
      feMerge3.append("feMergeNode")
        .attr("in", "softGlow_colored");
      feMerge3.append("feMergeNode")
        .attr("in", "SourceGraphic");


      d3.selectAll(".ellipse")
        .style("filter", (d) => {
          if (d.depth === 0) return "url(#glow0)";
          if (d.depth === 1) return "url(#glow1)";
          if (d.depth === 2) return "url(#glow2)";
          if (d.depth === 3) return "url(#glow3)";
        })
        .style("fill", function (d) {
          return d._children ? fillColor : "#fff";
        });

    }
  }

  useEffect(createViz, [])

  return (
    <Container>
      <Viz id="vizView"></Viz>
      <VisualizerSideBar />
    </Container>   
    );
  }



export default VisualizeView;