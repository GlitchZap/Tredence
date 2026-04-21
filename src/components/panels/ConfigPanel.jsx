import { useWorkflow } from '../../context/WorkflowContext';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';
import NodeIcon from '../nodes/NodeIcon';
import TaskForm from '../forms/TaskForm';
import ApprovalForm from '../forms/ApprovalForm';
import AutomatedForm from '../forms/AutomatedForm';

/**
 * ConfigPanel — Right-side panel displaying the selected node's configuration.
 *
 * Features:
 * - Slides in when a node is selected, hidden when nothing is selected
 * - Shows node type badge, label, description
 * - Renders node-type-specific form (Task, Approval, Automated)
 * - Close and Delete buttons
 */
function ConfigPanel() {
  const { selectedNode, updateNodeData, deleteNode, deselectNode } = useWorkflow();

  if (!selectedNode) return null;

  const config = NODE_TYPES_CONFIG[selectedNode.type];
  if (!config) return null;

  const { color, icon, label: typeLabel } = config;

  /** Generic handler for common fields */
  const handleChange = (field) => (e) => {
    updateNodeData(selectedNode.id, { [field]: e.target.value });
  };

  /** Handler passed to node-specific forms */
  const handleFormChange = (newData) => {
    updateNodeData(selectedNode.id, newData);
  };

  const handleDelete = () => {
    deleteNode(selectedNode.id);
  };

  /** Render the correct form for the node type */
  const renderForm = () => {
    switch (selectedNode.type) {
      case 'task':
        return <TaskForm data={selectedNode.data} onChange={handleFormChange} />;
      case 'approval':
        return <ApprovalForm data={selectedNode.data} onChange={handleFormChange} />;
      case 'automated':
        return <AutomatedForm data={selectedNode.data} onChange={handleFormChange} />;
      case 'start':
      case 'end':
        return (
          <div className="px-3 py-3 rounded-xl bg-surface-400/30 border border-white/[0.03]">
            <p className="text-[11px] text-surface-50/30 text-center">
              {typeLabel} nodes have no additional settings.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="relative flex-shrink-0 w-[320px] h-full animate-slide-right z-20">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-400 border-l border-surface-200 shadow-[var(--shadow-glass)]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-surface-200">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-300 border border-surface-200 shadow-sm"
            >
              <NodeIcon name={icon} size={14} color={color} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-surface-50/90">{typeLabel} Node</p>
              <p className="text-[10px] text-surface-50/35">Configure properties</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={deselectNode}
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-surface-50/30 hover:text-surface-50/70 hover:bg-surface-300/50
                       transition-all duration-200"
            aria-label="Close panel"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Node ID Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-300 border border-surface-200 text-surface-100">
              {selectedNode.id}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-300 border border-surface-200 text-surface-50">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {typeLabel}
            </span>
          </div>

          {/* Common Fields: Label + Description */}
          <div className="space-y-3">
            <FieldGroup label="Label">
              <input
                type="text"
                value={selectedNode.data.label || ''}
                onChange={handleChange('label')}
                placeholder="Node label"
                className="field-input"
              />
            </FieldGroup>

            <FieldGroup label="Description">
              <textarea
                value={selectedNode.data.description || ''}
                onChange={handleChange('description')}
                placeholder="Brief description..."
                rows={2}
                className="field-input resize-none"
              />
            </FieldGroup>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.04]" />

          {/* Type-specific form */}
          <div className="space-y-3">
            <p className="text-[10px] font-semibold text-surface-50/25 uppercase tracking-wider">
              {typeLabel} Settings
            </p>
            {renderForm()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t border-surface-200 flex items-center gap-2 bg-surface-300/50">
          <button
            onClick={handleDelete}
            className="flex-1 h-9 rounded-lg flex items-center justify-center gap-1.5
                       text-[12px] font-semibold text-rose-500 bg-surface-400 border border-surface-200 shadow-sm
                       hover:border-rose-500 hover:text-white hover:bg-rose-500
                       transition-all duration-200"
            aria-label="Delete Node"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
            Delete Node
          </button>
          <button
            onClick={deselectNode}
            className="flex-1 h-9 rounded-[8px] flex items-center justify-center
                       text-[12px] font-semibold text-white bg-primary-500 hover:bg-primary-600
                       transition-all duration-200 shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * FieldGroup — Reusable label + input wrapper for form fields.
 */
function FieldGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium text-surface-50/50 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}

export { FieldGroup };
export default ConfigPanel;
