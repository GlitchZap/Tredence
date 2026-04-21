/**
 * nodeConfig.js — Single source of truth for all workflow node types.
 * Each entry defines the visual identity, default data, and handle configuration
 * for a node type used across the canvas, sidebar, and forms.
 */

export const NODE_TYPES_CONFIG = {
  start: {
    type: 'start',
    label: 'Start',
    description: 'Entry point of the workflow',
    color: '#10b981',       // emerald
    bgGradient: 'from-emerald-500/20 to-emerald-600/10',
    borderColor: 'border-emerald-500/30',
    glowClass: 'glow-emerald',
    icon: 'play',
    hasSource: true,
    hasTarget: false,
    maxCount: 1,            // Only one start node allowed
    defaultData: {
      label: 'Start',
      description: 'Workflow begins here',
    },
  },

  task: {
    type: 'task',
    label: 'Task',
    description: 'Manual task assigned to a person',
    color: '#6366f1',       // primary indigo
    bgGradient: 'from-primary-500/20 to-primary-600/10',
    borderColor: 'border-primary-500/30',
    glowClass: 'glow-primary',
    icon: 'clipboard',
    hasSource: true,
    hasTarget: true,
    maxCount: Infinity,
    defaultData: {
      label: 'New Task',
      description: '',
      assignee: '',
      priority: 'medium',
      dueInDays: 3,
    },
  },

  approval: {
    type: 'approval',
    label: 'Approval',
    description: 'Requires manager or team approval',
    color: '#f59e0b',       // amber
    bgGradient: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/30',
    glowClass: '',
    icon: 'shield-check',
    hasSource: true,
    hasTarget: true,
    maxCount: Infinity,
    defaultData: {
      label: 'Approval Gate',
      description: '',
      approver: '',
      approvalType: 'single',  // 'single' | 'multi'
      requiredApprovals: 1,
    },
  },

  automated: {
    type: 'automated',
    label: 'Automated',
    description: 'Automated action (email, API, etc.)',
    color: '#06b6d4',       // cyan
    bgGradient: 'from-cyan-500/20 to-cyan-600/10',
    borderColor: 'border-cyan-500/30',
    glowClass: '',
    icon: 'bolt',
    hasSource: true,
    hasTarget: true,
    maxCount: Infinity,
    defaultData: {
      label: 'Automation',
      description: '',
      actionType: 'email',   // 'email' | 'webhook' | 'notification'
      config: {},
    },
  },

  end: {
    type: 'end',
    label: 'End',
    description: 'Terminal point of the workflow',
    color: '#f43f5e',       // rose
    bgGradient: 'from-rose-500/20 to-rose-600/10',
    borderColor: 'border-rose-500/30',
    glowClass: 'glow-rose',
    icon: 'stop',
    hasSource: false,
    hasTarget: true,
    maxCount: 1,            // Only one end node allowed
    defaultData: {
      label: 'End',
      description: 'Workflow ends here',
    },
  },
};

/**
 * Ordered list of node types for the sidebar.
 */
export const NODE_TYPE_LIST = Object.values(NODE_TYPES_CONFIG);
