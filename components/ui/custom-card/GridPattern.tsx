import { useId } from 'react';
import z from 'zod';

// Grid pattern
const gridPatternSchema = z.object({
  width: z.number().default(8),
  height: z.number().default(8),
  className: z.string().optional(),
});

// Pattern props
const patternSchema = z.array(
  z.object({
    x: z.string().default("50%"),
    y: z.number().default(0),
    squares: z.array(z.array(z.number())).optional(),
  })
);

// Types
type GridPatternProps = z.infer<typeof gridPatternSchema>;
type PatternProps = z.infer<typeof patternSchema>;

// Patterns to choose from  (x, y, squares)
const patterns: PatternProps = [
  {
    x: "50%",
    y: 16,
    squares: [
      [0, 1],
      [1, 3],
    ],
  },
  {
    x: "50%",
    y: 18,
    squares: [
      [1, 2],
      [2, 4],
    ],
  },
  {
    x: "50%",
    y: 20,
    squares: [
      [0, 2],
      [2, 5],
    ],
  },
  {
    x: "50%",
    y: 22,
    squares: [
      [1, 1],
      [3, 4],
    ],
  },
  {
    x: "50%",
    y: 24,
    squares: [
      [0, 3],
      [3, 6],
    ],
  },
  {
    x: "50%",
    y: 26,
    squares: [
      [2, 1],
      [4, 3],
    ],
  },
  {
    x: "50%",
    y: 28,
    squares: [
      [1, 4],
      [4, 7],
    ],
  },
  {
    x: "50%",
    y: 30,
    squares: [
      [0, 5],
      [5, 8],
    ],
  },
  {
    x: "50%",
    y: 32,
    squares: [
      [3, 2],
      [6, 4],
    ],
  },
  {
    x: "50%",
    y: 34,
    squares: [
      [2, 3],
      [5, 5],
    ],
  },
];

export default function GridPattern({ width, height, className}: GridPatternProps) {
  const patternId = useId();

  // Get a random pattern
  const { x, y, squares } = patterns[Math.floor(Math.random() * patterns.length)];

  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
