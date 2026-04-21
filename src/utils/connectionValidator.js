import { NODE_TYPES_CONFIG } from '../constants/nodeConfig';

/**
 * isValidConnection — Validates whether a proposed edge connection is allowed.
 *
 * Rules:
 * 1. No self-connections (source === target)
 * 2. No duplicate edges between the same source/target pair
 * 3. Source node must have a source handle configured
 * 4. Target node must have a target handle configured
 * 5. End nodes cannot be a source (no outgoing edges)
 * 6. Start nodes cannot be a target (no incoming edges)
 *
 * @param {object} connection — { source, target, sourceHandle, targetHandle }
 * @param {Array}  nodes      — Current nodes array
 * @param {Array}  edges      — Current edges array
 * @returns {boolean}
 */
export function isValidConnection(connection, nodes, edges) {
  const { source, target } = connection;

  // Rule 1: No self-connections
  if (source === target) return false;

  // Rule 2: No duplicate edges
  const isDuplicate = edges.some(
    (edge) => edge.source === source && edge.target === target
  );
  if (isDuplicate) return false;

  // Find nodes
  const sourceNode = nodes.find((n) => n.id === source);
  const targetNode = nodes.find((n) => n.id === target);
  if (!sourceNode || !targetNode) return false;

  // Look up configs
  const sourceConfig = NODE_TYPES_CONFIG[sourceNode.type];
  const targetConfig = NODE_TYPES_CONFIG[targetNode.type];
  if (!sourceConfig || !targetConfig) return false;

  // Rule 3 & 5: Source must allow outgoing connections
  if (!sourceConfig.hasSource) return false;

  // Rule 4 & 6: Target must allow incoming connections
  if (!targetConfig.hasTarget) return false;

  return true;
}
