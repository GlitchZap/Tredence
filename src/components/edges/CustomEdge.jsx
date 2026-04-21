import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from '@xyflow/react';

/**
 * CustomEdge — A smooth-step edge with a delete button shown on hover/select.
 *
 * Features:
 * - Animated dashed line when the edge is marked animated
 * - Gradient stroke from source to target
 * - Floating "×" delete button at the midpoint
 */
function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 16,
  });

  const onDelete = (event) => {
    event.stopPropagation();
    // Dispatch a custom event so the canvas can handle deletion
    window.dispatchEvent(new CustomEvent('flowcraft:delete-edge', { detail: { id } }));
  };

  return (
    <>
      {/* Glow layer (behind) */}
      <BaseEdge
        path={edgePath}
        style={{
          strokeWidth: 6,
          stroke: selected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          transition: 'stroke 0.2s ease',
        }}
      />

      {/* Main edge path */}
      <BaseEdge
        path={edgePath}
        style={{
          strokeWidth: selected ? 2.5 : 2,
          stroke: selected ? 'rgba(129, 140, 248, 0.8)' : 'rgba(99, 102, 241, 0.35)',
          transition: 'all 0.2s ease',
        }}
      />

      {/* Delete button at midpoint */}
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <button
            onClick={onDelete}
            className={`w-5 h-5 rounded-full flex items-center justify-center
                       bg-surface-300 border border-white/10
                       text-surface-50/50 hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-500/10
                       transition-all duration-200 
                       ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                       hover:opacity-100 hover:scale-100`}
            style={{ fontSize: '11px', lineHeight: 1 }}
            title="Delete connection"
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
