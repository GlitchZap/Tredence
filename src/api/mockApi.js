/**
 * mockApi.js — Frontend mock API layer.
 * Simulates backend network requests with realistic latency.
 */

// Helper to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  /**
   * GET /automations
   * Simulates fetching available automation templates/types from a server.
   */
  getAutomations: async () => {
    await delay(600); // 600ms latency
    return [
      { id: 'email', name: 'Send Email', category: 'Communication' },
      { id: 'webhook', name: 'Trigger Webhook', category: 'Developer' },
      { id: 'notification', name: 'Push Notification', category: 'Communication' },
    ];
  },

  /**
   * POST /simulate
   * Takes a serialized workflow (nodes + edges), traces the execution path,
   * and returns a simulated execution log.
   */
  simulateWorkflow: async (workflowJson) => {
    await delay(1200); // Simulate processing time

    const { nodes = [], edges = [] } = workflowJson;

    if (nodes.length === 0) {
      throw new Error('Cannot simulate an empty workflow.');
    }

    const startNode = nodes.find((n) => n.type === 'start');
    if (!startNode) {
      throw new Error('Workflow is missing a Start node.');
    }

    const endNode = nodes.find((n) => n.type === 'end');
    if (!endNode) {
      throw new Error('Workflow is missing an End node.');
    }

    // A real backend would traverse the DAG (Directed Acyclic Graph).
    // For this mock, we'll build a simple execution log of the nodes
    // sorted by how they are connected in edges (naive topological trace).
    const executionLogs = [];
    const visited = new Set();
    
    let currentNodeId = startNode.id;
    let stepCount = 1;

    while (currentNodeId) {
      if (visited.has(currentNodeId)) {
        throw new Error(`Infinite loop detected at node: ${currentNodeId}`);
      }
      visited.add(currentNodeId);

      const node = nodes.find((n) => n.id === currentNodeId);
      if (!node) break;

      // Simulate step execution logic based on type
      let durationMs = 0;
      let statusInfo = 'Completed automatically';

      if (node.type === 'task') {
        durationMs = 200;
        statusInfo = `Assigned to ${node.data?.assignee || 'Unassigned'} (Priority: ${node.data?.priority || 'medium'})`;
      } else if (node.type === 'approval') {
        durationMs = 400;
        statusInfo = `Approved by ${node.data?.approver || 'Manager'}`;
      } else if (node.type === 'automated') {
        durationMs = 800;
        statusInfo = `Action: ${node.data?.actionType || 'email'} executed successfully`;
      }

      executionLogs.push({
        step: stepCount++,
        nodeId: node.id,
        nodeType: node.type,
        label: node.data?.label || node.type,
        status: 'success',
        detail: statusInfo,
        duration: durationMs,
      });

      // Find the next node via outgoing edge
      const outgoingEdge = edges.find((e) => e.source === currentNodeId);
      currentNodeId = outgoingEdge ? outgoingEdge.target : null;
    }

    return {
      status: 'success',
      totalSteps: executionLogs.length,
      logs: executionLogs,
    };
  },
};
