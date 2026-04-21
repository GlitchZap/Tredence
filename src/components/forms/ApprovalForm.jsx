import { FieldGroup } from '../panels/ConfigPanel';

/**
 * ApprovalForm — Configuration form for Approval nodes.
 *
 * Fields:
 * - Approver (text input)
 * - Approval Type (select: single / multi)
 * - Required Approvals (number, visible only for multi)
 */
function ApprovalForm({ data, onChange }) {
  const handleChange = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-3">
      <FieldGroup label="Approver">
        <input
          type="text"
          value={data.approver || ''}
          onChange={handleChange('approver')}
          placeholder="e.g. Manager, Department Head"
          className="field-input"
        />
      </FieldGroup>

      <FieldGroup label="Approval Type">
        <select
          value={data.approvalType || 'single'}
          onChange={handleChange('approvalType')}
          className="field-select"
        >
          <option value="single">Single Approver</option>
          <option value="multi">Multiple Approvers</option>
        </select>
      </FieldGroup>

      {data.approvalType === 'multi' && (
        <FieldGroup label="Required Approvals">
          <input
            type="number"
            value={data.requiredApprovals ?? 1}
            onChange={handleChange('requiredApprovals')}
            min={1}
            max={10}
            className="field-input"
          />
        </FieldGroup>
      )}

      {/* Approval type info card */}
      <ApprovalInfo type={data.approvalType || 'single'} />
    </div>
  );
}

/**
 * ApprovalInfo — Contextual card explaining the selected approval type.
 */
function ApprovalInfo({ type }) {
  const info = {
    single: {
      icon: '👤',
      title: 'Single Approval',
      desc: 'One designated approver must approve to proceed.',
    },
    multi: {
      icon: '👥',
      title: 'Multi Approval',
      desc: 'Multiple approvers required. All must approve to proceed.',
    },
  };

  const current = info[type] || info.single;

  return (
    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-surface-300 border border-surface-200 shadow-sm">
      <span className="text-base mt-0.5">{current.icon}</span>
      <div>
        <p className="text-[11px] font-semibold text-surface-50">{current.title}</p>
        <p className="text-[10px] text-surface-100 leading-relaxed mt-0.5">{current.desc}</p>
      </div>
    </div>
  );
}

export default ApprovalForm;
