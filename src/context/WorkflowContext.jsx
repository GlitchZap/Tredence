import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import { NODE_TYPES_CONFIG } from '../constants/nodeConfig';
import { isValidConnection } from '../utils/connectionValidator';

const WorkflowContext = createContext(null);

/** Counter for generating unique node IDs */
let nodeIdCounter = 0;
const getNextNodeId = (type) => `${type}-${++nodeIdCounter}`;

/**
 * WorkflowProvider — Centralizes all workflow state and operations.
 *
 * Provides:
 * - nodes / edges state
 * - selectedNode (the full node object, or null)
 * - addNode, updateNodeData, deleteNode
 * - onConnect, onDragOver, onDrop
 *
 * Must be rendered INSIDE <ReactFlowProvider>.
 */
export function WorkflowProvider({ children }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const { screenToFlowPosition } = useReactFlow();

  /** Derive the selected node object from the ID */
  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId) || null
    : null;

  /** Handle node selection changes */
  const onSelectionChange = useCallback(({ nodes: selectedNodes }) => {
    if (selectedNodes.length === 1) {
      setSelectedNodeId(selectedNodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  }, []);

  /** Click on a node to select it */
  const onNodeClick = useCallback((_event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  /** Click on empty canvas to deselect */
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  /** Close the panel programmatically */
  const deselectNode = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  /** Validate + create new edge connections */
  const onConnect = useCallback(
    (connection) => {
      if (!isValidConnection(connection, nodes, edges)) return;
      const newEdge = {
        ...connection,
        type: 'custom',
        animated: false,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes, edges, setEdges]
  );

  /** Connection validation for React Flow cursor feedback */
  const onIsValidConnection = useCallback(
    (connection) => isValidConnection(connection, nodes, edges),
    [nodes, edges]
  );

  /** Allow drops on the canvas */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /** Handle node drop from sidebar */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow-type');
      if (!type) return;

      const config = NODE_TYPES_CONFIG[type];
      if (!config) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getNextNodeId(type),
        type,
        position,
        data: { ...config.defaultData },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  /** Update a node's data fields (used by the form panel) */
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  /** Delete a node and its connected edges */
  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      if (selectedNodeId === nodeId) setSelectedNodeId(null);
    },
    [setNodes, setEdges, selectedNodeId]
  );

  /** Listen for edge deletion events from CustomEdge */
  useEffect(() => {
    const handleDeleteEdge = (event) => {
      const { id } = event.detail;
      setEdges((eds) => eds.filter((e) => e.id !== id));
    };
    window.addEventListener('flowcraft:delete-edge', handleDeleteEdge);
    return () => window.removeEventListener('flowcraft:delete-edge', handleDeleteEdge);
  }, [setEdges]);

  const value = {
    // State
    nodes,
    edges,
    selectedNode,
    // Node change handlers (for ReactFlow)
    onNodesChange,
    onEdgesChange,
    onConnect,
    onIsValidConnection,
    onNodeClick,
    onPaneClick,
    onSelectionChange,
    onDragOver,
    onDrop,
    // Actions
    updateNodeData,
    deleteNode,
    deselectNode,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

/**
 * useWorkflow — Hook to access workflow context.
 * Must be used within a <WorkflowProvider>.
 */
export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
