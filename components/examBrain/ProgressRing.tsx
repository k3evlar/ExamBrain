interface ProgressRingProps {
  percent: number
  size?: number
  stroke?: number
}

export function ProgressRing({ percent, size = 36, stroke = 3 }: ProgressRingProps) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E8E4DE"
        strokeWidth={stroke}
      />
      {/* Progress */}
      <circle
        className="progress-ring-circle"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#5C7A5C"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="9"
        fontFamily="var(--font-jetbrains-mono)"
        fill="#1C1917"
      >
        {percent}%
      </text>
    </svg>
  )
}
