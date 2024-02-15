import { useGameStore } from '@/store';
import { useCreate, useDelete, useList, useUpdate } from '@refinedev/core';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

const useWheelOfFortune = ({ options, onWinning, color }: any) => {
  const { wheelData } = useGameStore();
  const wheelRef: any = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIndices, setWinningIndices] = useState([]);

  const { mutate } = useCreate();
  const { mutate: updateMutate } = useUpdate();
  const { mutate: deleteMutate } = useDelete();
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_MEMORY_GAME!,
    filters: [
      {
        field: 'id',
        operator: 'eq',
        value: wheelData?.id,
      },
    ],
  });

  useEffect(() => {
    const winningIndices = options
      .map((option: any, index: number) => {
        if (option.label !== 'Perdu') {
          return index;
        }
      })
      .filter((index: number | undefined) => index !== undefined);

    // Utilisez le tableau winningIndices comme vous le souhaitez
    setWinningIndices(winningIndices);

    // Determine the winning time
    const randomWinningTime = async () => {
      const attempts = wheelData?.numberWinners?.attempts!;
      const winners = wheelData?.numberWinners?.winners!;

      const indices = new Set();
      while (indices.size < attempts && indices.size < winners) {
        const winningAttempt = Math.floor(Math.random() * attempts) + 1;
        indices.add(winningAttempt);
      }

      if (data?.total === 0) {
        await mutate({
          resource: process.env.NEXT_PUBLIC_SANITY_MEMORY_GAME!,
          values: {
            id: wheelData?.id,
            winningTime: Array.from(indices),
            winners: 0,
            attempts: 0,
          },
        });
      }
    };

    randomWinningTime();
  }, [data]);

  const memoryGame = data?.data[0];

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
  const spinWheel = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    var ps = 360 / options.length,
      rng = Math.floor(Math.random() * 1440 + 360);

    rotationsTrack.current.newRotation = Math.round(rng / ps) * ps;

    pickedRef.current = Math.round(options.length - (rotationsTrack.current.newRotation % 360) / ps);
    pickedRef.current = pickedRef.current >= options.length ? pickedRef.current % options.length : pickedRef.current;

    if (memoryGame?.winningTime?.includes(memoryGame?.attempts as never)) {
      const validWinningIndices = winningIndices.filter((index: number) => index < options.length);
      pickedRef.current = validWinningIndices[Math.floor(Math.random() * validWinningIndices.length)];
    } else {
      if (winningIndices.includes(pickedRef.current as never)) {
        const validIndices = options
          .map((_: any, index: number) => index)
          .filter((index: never) => !winningIndices.includes(index));
        pickedRef.current = validIndices[Math.floor(Math.random() * validIndices.length)];
      } else {
        pickedRef.current = options.length - 1;
      }
    }
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
      .on('end', async () => {
        onWinning(options[pickedRef.current]);
        rotationsTrack.current.oldRotation = rotationsTrack.current.newRotation;
        setIsSpinning(false);

        // Get data from kv storage
        if (memoryGame?.attempts === wheelData?.numberWinners?.winners) {
          return await deleteMutate({
            resource: process.env.NEXT_PUBLIC_SANITY_MEMORY_GAME!,
            id: memoryGame?._id,
          });
        }

        if (data?.winners === wheelData?.numberWinners?.winners) {
          return;
        }

        await updateMutate({
          resource: process.env.NEXT_PUBLIC_SANITY_MEMORY_GAME!,
          values: {
            attempts: memoryGame?.attempts! + 1,
            winners: options[pickedRef.current].label === 'Perdu' ? memoryGame?.winners : memoryGame?.winners! + 1,
          },
          id: memoryGame?._id,
        });
      });
  };

  // Initialize the wheel
  useEffect(() => {
    drawWheel(options);
  }, [options]);

  return { wheelRef, spinWheel, isSpinning };
};

export default useWheelOfFortune;
