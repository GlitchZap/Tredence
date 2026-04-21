import { useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import nodeTypes from './nodes';
import edgeTypes from './edges';
import { useWorkflow } from '../context/WorkflowContext';
import { serializeWorkflow, downloadJson } from '../utils/workflowSerializer';
import SimulatorModal from './panels/SimulatorModal';
import ShinyText from './ui/ShinyText';
import ThemeToggle from './ui/ThemeToggle';
import MovingBorderButton from './ui/MovingBorderButton';

/**
 * WorkflowCanvas — Pure rendering component.
 * All state and logic lives in WorkflowContext.
 * This component just wires the context to ReactFlow props.
 */
function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onIsValidConnection,
    onNodeClick,
    onPaneClick,
    onSelectionChange,
    onDragOver,
    onDrop,
  } = useWorkflow();

  const [showSimulator, setShowSimulator] = useState(false);

  const handleExport = () => {
    const serialized = serializeWorkflow(nodes, edges);
    downloadJson(serialized, 'hr-workflow.json');
  };

  return (
    <div className="w-full h-full relative">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 h-14 bg-surface-400 border-b border-surface-200 shadow-[var(--shadow-glass)] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div>
            <h1 className="text-[14px] font-bold tracking-tight text-surface-50 leading-tight">
              FlowCraft
            </h1>
            <p className="text-[10px] text-surface-100 font-medium tracking-wide">HR Workflow Designer</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-[1px] h-4 bg-surface-200 mx-1" />
            <span className="text-[11px] text-surface-100 font-medium tracking-wider uppercase">
              {nodes.length} nodes · {edges.length} connections
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-soft shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          
          <div className="flex items-center gap-2">
            <MovingBorderButton
              onClick={() => setShowSimulator(true)}
              disabled={nodes.length === 0}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Simulate
            </MovingBorderButton>
            <button
              onClick={handleExport}
              disabled={nodes.length === 0}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 tracking-wide
                ${nodes.length === 0 
                  ? 'bg-surface-300/30 text-surface-50/20 cursor-not-allowed border border-transparent'
                  : 'bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 hover:text-primary-300'
                }`}
            >
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={onIsValidConnection}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onSelectionChange={onSelectionChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        className="bg-surface-500"
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          type: 'custom',
          animated: false,
        }}
        connectionLineStyle={{
          strokeWidth: 2,
          stroke: 'rgba(129, 140, 248, 0.6)',
        }}
        connectionLineType="smoothstep"
      >
        <Background
          variant="dots"
          gap={20}
          size={1}
          color="rgba(99, 102, 241, 0.15)"
        />
        <Controls
          position="bottom-left"
          showInteractive={false}
          className="!bottom-6 !left-6"
        />
        <MiniMap
          position="bottom-right"
          className="!bottom-6 !right-6"
          nodeColor={(node) => {
            const colorMap = {
              start: '#10b981',
              task: '#6366f1',
              approval: '#f59e0b',
              automated: '#06b6d4',
              end: '#f43f5e',
            };
            return colorMap[node.type] || '#6366f1';
          }}
          maskColor="rgba(13, 19, 33, 0.8)"
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Empty State Overlay */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-600/20 to-accent-cyan/10 border border-primary-500/20 flex items-center justify-center glow-primary">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <path d="M10 6.5h4" />
                <path d="M6.5 10v4" />
                <path d="M17.5 10v4" />
                <path d="M10 17.5h4" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-surface-50/80 mb-2">Start Building Your Workflow</h2>
            <p className="text-sm text-surface-50/40 max-w-xs">
              Drag nodes from the sidebar to create your HR automation workflow.
            </p>
          </div>
        </div>
      )}

      {/* Simulator Modal */}
      {showSimulator && <SimulatorModal onClose={() => setShowSimulator(false)} />}
    </div>
  );
}

export default WorkflowCanvas;;
