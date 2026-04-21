import { FieldGroup } from '../panels/ConfigPanel';

/**
 * AutomatedForm — Configuration form for Automated action nodes.
 *
 * Fields:
 * - Action Type (select: email / webhook / notification)
 * - Dynamic config fields based on action type
 */
function AutomatedForm({ data, onChange }) {
  const handleChange = (field) => (e) => {
    onChange({ [field]: e.target.value });
  };

  const handleConfigChange = (field) => (e) => {
    onChange({
      config: { ...data.config, [field]: e.target.value },
    });
  };

  const actionType = data.actionType || 'email';

  return (
    <div className="space-y-3">
      <FieldGroup label="Action Type">
        <select
          value={actionType}
          onChange={handleChange('actionType')}
          className="field-select"
        >
          <option value="email">📧 Send Email</option>
          <option value="webhook">🔗 Webhook Call</option>
          <option value="notification">🔔 Push Notification</option>
        </select>
      </FieldGroup>

      {/* Dynamic fields per action type */}
      {actionType === 'email' && (
        <EmailFields config={data.config || {}} onChange={handleConfigChange} />
      )}
      {actionType === 'webhook' && (
        <WebhookFields config={data.config || {}} onChange={handleConfigChange} />
      )}
      {actionType === 'notification' && (
        <NotificationFields config={data.config || {}} onChange={handleConfigChange} />
      )}

      {/* Action type info */}
      <ActionInfo type={actionType} />
    </div>
  );
}

/** Email-specific config fields */
function EmailFields({ config, onChange }) {
  return (
    <>
      <FieldGroup label="Recipient Email">
        <input
          type="email"
          value={config.to || ''}
          onChange={onChange('to')}
          placeholder="e.g. candidate@example.com"
          className="field-input"
        />
      </FieldGroup>
      <FieldGroup label="Subject">
        <input
          type="text"
          value={config.subject || ''}
          onChange={onChange('subject')}
          placeholder="e.g. Your Application Status"
          className="field-input"
        />
      </FieldGroup>
      <FieldGroup label="Template">
        <select
          value={config.template || 'offer'}
          onChange={onChange('template')}
          className="field-select"
        >
          <option value="offer">Offer Letter</option>
          <option value="rejection">Rejection Notice</option>
          <option value="onboarding">Onboarding Welcome</option>
          <option value="custom">Custom Template</option>
        </select>
      </FieldGroup>
    </>
  );
}

/** Webhook-specific config fields */
function WebhookFields({ config, onChange }) {
  return (
    <>
      <FieldGroup label="Webhook URL">
        <input
          type="url"
          value={config.url || ''}
          onChange={onChange('url')}
          placeholder="https://api.example.com/webhook"
          className="field-input"
        />
      </FieldGroup>
      <FieldGroup label="HTTP Method">
        <select
          value={config.method || 'POST'}
          onChange={onChange('method')}
          className="field-select"
        >
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
        </select>
      </FieldGroup>
      <FieldGroup label="Headers (JSON)">
        <textarea
          value={config.headers || ''}
          onChange={onChange('headers')}
          placeholder='{"Authorization": "Bearer token"}'
          rows={2}
          className="field-input resize-none font-mono text-[11px]"
        />
      </FieldGroup>
    </>
  );
}

/** Notification-specific config fields */
function NotificationFields({ config, onChange }) {
  return (
    <>
      <FieldGroup label="Channel">
        <select
          value={config.channel || 'slack'}
          onChange={onChange('channel')}
          className="field-select"
        >
          <option value="slack">Slack</option>
          <option value="teams">Microsoft Teams</option>
          <option value="in-app">In-App Notification</option>
        </select>
      </FieldGroup>
      <FieldGroup label="Message">
        <textarea
          value={config.message || ''}
          onChange={onChange('message')}
          placeholder="Notification message text..."
          rows={3}
          className="field-input resize-none"
        />
      </FieldGroup>
    </>
  );
}

/** Info card for the selected action type */
function ActionInfo({ type }) {
  const info = {
    email:        { icon: '📧', title: 'Email Action', desc: 'Sends an automated email using the selected template.' },
    webhook:      { icon: '🔗', title: 'Webhook Action', desc: 'Makes an HTTP request to an external API endpoint.' },
    notification: { icon: '🔔', title: 'Notification', desc: 'Sends a notification via the selected channel.' },
  };

  const current = info[type] || info.email;

  return (
    <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/10">
      <span className="text-base mt-0.5">{current.icon}</span>
      <div>
        <p className="text-[11px] font-semibold text-cyan-400/80">{current.title}</p>
        <p className="text-[10px] text-surface-50/30 leading-relaxed mt-0.5">{current.desc}</p>
      </div>
    </div>
  );
}

export default AutomatedForm;
