import BaseNode from './BaseNode';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';

/**
 * AutomatedNode — An automated action (email, webhook, notification).
 * Renders as a cyan-accented node with both source and target handles.
 */
function AutomatedNode({ data, selected }) {
  return <BaseNode config={NODE_TYPES_CONFIG.automated} data={data} selected={selected} />;
}

export default AutomatedNode;
