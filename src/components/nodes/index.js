import StartNode from './StartNode';
import TaskNode from './TaskNode';
import ApprovalNode from './ApprovalNode';
import AutomatedNode from './AutomatedNode';
import EndNode from './EndNode';

/**
 * nodeTypes — Registry mapping React Flow node type strings to components.
 * Pass this to <ReactFlow nodeTypes={nodeTypes} /> so the canvas
 * knows how to render each custom node type.
 *
 * IMPORTANT: This object must be stable (defined outside the component)
 * to prevent React Flow from re-mounting nodes on every render.
 */
const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export default nodeTypes;
