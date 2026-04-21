import { FieldGroup } from '../panels/ConfigPanel';

/**
 * TaskForm — Configuration form for Task nodes.
 *
 * Fields:
 * - Assignee (text input)
 * - Priority (select: low / medium / high / critical)
 * - Due in Days (number input)
 */
function TaskForm({ data, onChange }) {
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-3">
      <FieldGroup label="Assignee">
        <input
          type="text"
          value={data.assignee || ''}
          onChange={handleChange('assignee')}
          placeholder="e.g. John Doe, HR Team"
          className="field-input"
        />
      </FieldGroup>

      <FieldGroup label="Priority">
        <select
          value={data.priority || 'medium'}
          onChange={handleChange('priority')}
          className="field-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </FieldGroup>

      <FieldGroup label="Due in Days">
        <input
          type="number"
          value={data.dueInDays ?? 3}
          onChange={handleChange('dueInDays')}
          min={1}
          max={90}
          className="field-input"
        />
      </FieldGroup>

      {/* Priority visual indicator */}
      <PriorityIndicator priority={data.priority || 'medium'} />
    </div>
  );
}

/**
 * PriorityIndicator — Visual bar showing the selected priority level.
 */
function PriorityIndicator({ priority }) {
  const levels = {
    low:      { color: '#10b981', width: '25%', label: 'Low Priority' },
    medium:   { color: '#f59e0b', width: '50%', label: 'Medium Priority' },
    high:     { color: '#f97316', width: '75%', label: 'High Priority' },
    critical: { color: '#f43f5e', width: '100%', label: 'Critical Priority' },
  };

  const level = levels[priority] || levels.medium;

  return (
    <div className="px-3 py-2.5 rounded-xl bg-surface-400/30 border border-white/[0.03]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-surface-50/40">Priority Level</span>
        <span
          className="text-[10px] font-semibold"
          style={{ color: level.color }}
        >
          {level.label}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-500/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: level.width, backgroundColor: level.color }}
        />
      </div>
    </div>
  );
}

export default TaskForm;
