import BaseNode from './BaseNode';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';

/**
 * EndNode — The workflow termination point.
 * Renders as a rose-accented node with only a target handle (incoming connections only).
 */
function EndNode({ data, selected }) {
  return <BaseNode config={NODE_TYPES_CONFIG.end} data={data} selected={selected} />;
}

export default EndNode;
