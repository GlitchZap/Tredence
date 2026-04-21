import BaseNode from './BaseNode';
import { NODE_TYPES_CONFIG } from '../../constants/nodeConfig';

/**
 * ApprovalNode — A gate requiring manager or team approval.
 * Renders as an amber-accented node with both source and target handles.
 */
function ApprovalNode({ data, selected }) {
  return <BaseNode config={NODE_TYPES_CONFIG.approval} data={data} selected={selected} />;
}

export default ApprovalNode;
