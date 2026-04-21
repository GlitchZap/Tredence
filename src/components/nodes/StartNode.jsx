import BaseNode from './BaseNode';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';

/**
 * StartNode — The workflow entry point.
 * Renders as a green-accented node with only a source handle (outgoing connections only).
 */
function StartNode({ data, selected }) {
  return <BaseNode config={NODE_TYPES_CONFIG.start} data={data} selected={selected} />;
}

export default StartNode;
