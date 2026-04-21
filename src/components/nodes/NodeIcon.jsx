/**
 * NodeIcon — Renders an SVG icon based on the icon name.
 * Keeps all node icons centralized so they stay consistent.
 */
function NodeIcon({ name, size = 16, color = 'currentColor', className = '' }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  };

  switch (name) {
    case 'play':
      return (
        <svg {...props}>
          <polygon points="6 3 20 12 6 21 6 3" fill={color} stroke="none" />
        </svg>
      );

    case 'stop':
      return (
        <svg {...props}>
          <rect x="6" y="6" width="12" height="12" rx="2" fill={color} stroke="none" />
        </svg>
      );

    case 'clipboard':
      return (
        <svg {...props}>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      );

    case 'shield-check':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case 'bolt':
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={color} fillOpacity="0.15" />
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

export default NodeIcon;
