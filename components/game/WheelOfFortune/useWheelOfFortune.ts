import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

const useWheelOfFortune = ({ options, onWinning, color }: any) => {
  const wheelRef: any = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const rotationsTrack = useRef({
    oldRotation: 0,
    newRotation: 0,
  });

  const pickedRef = useRef(100000);

  // Function to draw the wheel
  const drawWheel = (data: any) => {
    // Clear any existing SVG to prevent duplicates
    d3.select(wheelRef.current).select('svg').remove();

    const padding = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 10,
    };

    const containerWidth = wheelRef.current.offsetWidth;
    const containerHeight = wheelRef.current.offsetHeight;

    const w = containerWidth - padding.left - padding.right + 340;
    const h = containerHeight - padding.top - padding.bottom;
    const r = Math.min(w, h) / 2;

    // Create the SVG container
    const svg = d3
      .select(wheelRef.current)
      .append('svg')
      .attr('width', w + padding.left + padding.right)
      .attr('height', h + padding.top + padding.bottom);
    console.log(window.innerWidth);

    const translateX = window.innerWidth < 380 ? w / 1.45 + padding.left : w / 1.55 + padding.left;

    // Create a group to hold the pie chart
    const container = svg
      .append('g')
      .attr('class', 'chartholder')
      .attr('transform', `translate(${translateX}, ${h / 2 + padding.top})`);

    const vis = container.append('g');

    container
      .append('circle')
      .attr('r', r) // radius of the wheel
      .attr('stroke', '#444444') // border color
      .attr('stroke-width', '20px') // border thickness
      .attr('fill', 'none'); // no fill color

    // Setup the pie generator
    const pie = d3
      .pie()
      .sort(null)
      .value(() => 1);

    // Define the arc generator
    const arc: any = d3.arc().outerRadius(r).innerRadius(0);

    // Bind data to the g elements
    const arcs = vis.selectAll('g.slice').data(pie(data)).join('g').attr('class', 'slice');

    // Draw the arcs
    arcs
      .append('path')
      .attr('fill', (d, i) => (i % 2 === 0 ? color : '#fff'))
      .attr('d', arc);

    // Add labels to the arcs
    arcs
      .append('text')
      .attr('transform', (d) => {
        // Calculate the angle for the rotation
        const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) - 90;
        // Get the centroid of the segment
        const centroid = arc.centroid(d);
        // Return the transform attribute with translation and rotation
        return `translate(${centroid}) rotate(${angle})`;
      })
      .attr('text-anchor', 'middle')
      .text((d, i) => data[i].label)
      .style('fill', (d, i) => (i % 2 === 0 ? '#fff' : '#9b6f4a'))
      .style('font-size', '18px')
      .style('font-weight', '600')
      .style('pointer-events', 'none');

    svg
      .append('g')
      .attr('transform', 'translate(' + (w + padding.left + padding.right) + ',' + (h / 2 + padding.top) + ')')
      .attr('stroke', '#444444') // border color
      .attr('stroke-width', '10px') // border thickness
      .append('path')
      .attr('d', 'M-' + r * 0.4 + ',0L0,' + r * 0.12 + 'L0,-' + r * 0.12 + 'Z')
      .attr('fill', '#FCD36D');
  };

  // Function to spin the wheel
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    var ps = 360 / options.length,
      rng = Math.floor(Math.random() * 1440 + 360);

    rotationsTrack.current.newRotation = Math.round(rng / ps) * ps;

    pickedRef.current = Math.round(options.length - (rotationsTrack.current.newRotation % 360) / ps);
    pickedRef.current = pickedRef.current >= options.length ? pickedRef.current % options.length : pickedRef.current;

    rotationsTrack.current.newRotation += 90 - Math.round(ps / 2);

    // Rotate the wheel
    const container = d3.select(wheelRef.current).select('.chartholder').select('g');

    container
      .transition()
      .duration(3000)
      .attrTween('transform', () => {
        const interpolate = d3.interpolate(
          rotationsTrack.current.oldRotation % 360,
          rotationsTrack.current.newRotation
        );
        return (t) => `rotate(${interpolate(t)})`;
      })
      .on('end', () => {
        onWinning(options[pickedRef.current]);
        rotationsTrack.current.oldRotation = rotationsTrack.current.newRotation;
        setIsSpinning(false);
      });
  };

  // Initialize the wheel
  useEffect(() => {
    drawWheel(options);
  }, [options]);

  return { wheelRef, spinWheel, isSpinning };
};

export default useWheelOfFortune;
