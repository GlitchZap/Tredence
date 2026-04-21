import { useState } from 'react';
import { NODE_TYPE_LIST } from '../../constants/nodeConfig';
import NodeCard from './NodeCard';

/**
 * Sidebar — Left panel containing the draggable node palette.
 *
 * Features:
 * - Collapsible via toggle button
 * - Lists all node types as draggable cards
 * - Grouped under "Node Palette" heading
 */
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex-shrink-0 h-full transition-all duration-300 ease-out z-20
                  ${collapsed ? 'w-[52px]' : 'w-[260px]'}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface-400 border-r border-surface-200 shadow-md" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-surface-200">
          {!collapsed && (
            <div className="animate-fade-in">
              <h2 className="text-[13px] font-semibold text-surface-50/90">Node Palette</h2>
              <p className="text-[10px] text-surface-50/35">Drag to canvas</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-surface-50/40 hover:text-surface-50/70 hover:bg-surface-300/50
                       transition-all duration-200"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Node Cards — only visible when expanded */}
        {!collapsed && (
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 animate-fade-in">
            {/* Workflow Nodes Section */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-surface-50/25 uppercase tracking-wider px-1 mb-2">
                Workflow Nodes
              </p>
              <div className="space-y-1.5">
                {NODE_TYPE_LIST.map((config) => (
                  <NodeCard key={config.type} config={config} />
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="mt-6 px-3 py-3 rounded-xl bg-primary-500/[0.06] border border-primary-500/10">
              <p className="text-[10px] text-primary-300/70 leading-relaxed">
                <span className="font-semibold text-primary-300/90">Tip:</span> Drag a node onto the canvas to add it. Connect nodes by dragging from one handle to another.
              </p>
            </div>
          </div>
        )}

        {/* Collapsed icon strip */}
        {collapsed && (
          <div className="flex-1 flex flex-col items-center gap-2 pt-4 animate-fade-in">
            {NODE_TYPE_LIST.map((config) => (
              <div
                key={config.type}
                className="w-9 h-9 rounded-lg flex items-center justify-center
                           hover:bg-surface-300/50 transition-colors cursor-pointer"
                style={{
                  background: `${config.color}10`,
                  border: `1px solid ${config.color}20`,
                }}
                title={config.label}
              >
                <NodeIcon name={config.icon} size={14} color={config.color} />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

/* Need NodeIcon in collapsed mode */
import NodeIcon from '../nodes/NodeIcon';

export default Sidebar;
