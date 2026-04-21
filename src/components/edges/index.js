import CustomEdge from './CustomEdge';

/**
 * edgeTypes — Registry mapping React Flow edge type strings to components.
 * Must be defined at module level (outside any component) for stability.
 */
const edgeTypes = {
  custom: CustomEdge,
};

export default edgeTypes;
