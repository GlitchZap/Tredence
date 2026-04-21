/**
 * workflowSerializer.js
 * Utilities for formatting and exporting workflow definitions.
 */

/**
 * serializeWorkflow — Strips React Flow UI data and formats as a clean JSON schema.
 */
export function serializeWorkflow(nodes, edges) {
  // Strip out UI-specific fields (position, measured, selected, etc.)
  const cleanNodes = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    data: { ...node.data },
  }));

  const cleanEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return {
    manifest: {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      nodeCount: cleanNodes.length,
      edgeCount: cleanEdges.length,
    },
    workflow: {
      nodes: cleanNodes,
      edges: cleanEdges,
    },
  };
}

/**
 * downloadJson — Triggers a browser download of the passed object.
 */
export function downloadJson(data, filename = 'workflow-export.json') {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
