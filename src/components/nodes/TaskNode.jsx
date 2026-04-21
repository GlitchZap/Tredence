import BaseNode from './BaseNode';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';

/**
 * TaskNode — A manual task assigned to a team member.
 * Renders as an indigo-accented node with both source and target handles.
 */
function TaskNode({ data, selected }) {
  return <BaseNode config={NODE_TYPES_CONFIG.task} data={data} selected={selected} />;
}

export default TaskNode;
