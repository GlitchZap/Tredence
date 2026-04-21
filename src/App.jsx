import { ReactFlowProvider } from '@xyflow/react';
import { WorkflowProvider } from './context/WorkflowContext';
import { ThemeProvider } from './context/ThemeProvider';
import WorkflowCanvas from './components/WorkflowCanvas';
import Sidebar from './components/sidebar/Sidebar';
import ConfigPanel from './components/panels/ConfigPanel';

/**
 * App — Root component.
 * Layout: Sidebar (left) | Canvas (center) | ConfigPanel (right, conditional)
 *
 * ReactFlowProvider must wrap everything that uses useReactFlow().
 * WorkflowProvider must be inside ReactFlowProvider (it uses useReactFlow).
 */
function App() {
  return (
    <ThemeProvider>
      <ReactFlowProvider>
        <WorkflowProvider>
          <div className="h-screen w-screen flex bg-surface-500 overflow-hidden text-surface-50">
            {/* Left Sidebar — Node Palette */}
            <Sidebar />

            {/* Main Canvas Area */}
            <main className="flex-1 relative">
              <WorkflowCanvas />
            </main>

            {/* Right Panel — Node Configuration */}
            <ConfigPanel />
          </div>
        </WorkflowProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}

export default App;
