import NodeIcon from '../nodes/NodeIcon';

/**
 * NodeCard — A draggable card representing a node type in the sidebar.
 *
 * On drag start, stores the node type in dataTransfer so the canvas
 * can read it on drop and create the correct node.
 *
 * @param {object} config — Node type config from nodeConfig.js
 */
function NodeCard({ config }) {
  const { type, label, description, color, icon } = config;

  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow-type', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-grab active:cursor-grabbing
                 bg-surface-400 border border-surface-200 shadow-[var(--shadow-glass)]
                 hover:border-surface-100 hover:shadow-md
                 transition-all duration-200 select-none"
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 bg-surface-300 border border-surface-200 shadow-sm"
      >
        <NodeIcon name={icon} size={15} color={color} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-surface-50/90 leading-tight">{label}</p>
        <p className="text-[10px] text-surface-50/35 mt-0.5 leading-snug truncate">{description}</p>
      </div>

      {/* Drag hint */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        className="flex-shrink-0 text-surface-50/15 group-hover:text-surface-50/30 transition-colors"
      >
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </div>
  );
}

export default NodeCard;
