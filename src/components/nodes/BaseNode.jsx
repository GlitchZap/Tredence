import { Handle, Position } from '@xyflow/react';
import { cn } from '../../utils/cn';
import NodeIcon from './NodeIcon';

/**
 * BaseNode — Shared layout wrapper for all custom nodes.
 *
 * Provides:
 * - Glassmorphic card with color-coded accent border
 * - Icon badge with gradient background
 * - Label + description text
 * - Source/target handles based on config
 * - Selected state ring animation
 *
 * Props:
 * @param {object} config  — Node type config from nodeConfig.js
 * @param {object} data    — Node instance data (label, description, etc.)
 * @param {boolean} selected — Whether the node is currently selected
 */
function BaseNode({ config, data, selected }) {
  const { color, icon, hasSource, hasTarget, glowClass } = config;

  return (
    <div
      className={cn(
        'relative group min-w-[180px] max-w-[220px]',
        'rounded-xl border transition-all duration-200',
        'bg-surface-400 shadow-sm',
        selected
          ? 'border-surface-100 shadow-md scale-[1.02]'
          : 'border-surface-200 hover:border-surface-100',
        glowClass && selected && glowClass
      )}
    >
      {/* Color accent stripe at the top */}
      <div
        className="absolute top-0 left-3 right-3 h-[2px] rounded-full"
        style={{ backgroundColor: color, opacity: selected ? 0.8 : 0.4 }}
      />

      {/* Node Content */}
      <div className="px-4 py-3 flex items-start gap-3">
        {/* Icon Badge */}
        <div
          className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}22, ${color}11)`,
            border: `1px solid ${color}33`,
          }}
        >
          <NodeIcon name={icon} size={14} color={color} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-surface-50 truncate leading-tight">
            {data.label}
          </p>
          {data.description && (
            <p className="text-[10px] text-surface-50/40 mt-0.5 truncate leading-snug">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Status indicator dot — bottom-right */}
      <div
        className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-surface-300"
        style={{ backgroundColor: color, opacity: 0.6 }}
      />

      {/* Handles */}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-2.5 !h-2.5 !rounded-full !border-2"
          style={{
            background: color,
            borderColor: 'var(--color-surface-300)',
          }}
        />
      )}
      {hasSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-2.5 !h-2.5 !rounded-full !border-2"
          style={{
            background: color,
            borderColor: 'var(--color-surface-300)',
          }}
        />
      )}
    </div>
  );
}

export default BaseNode;
