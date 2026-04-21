import { useState, useEffect } from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { serializeWorkflow } from '../../utils/workflowSerializer';
import { mockApi } from '../../api/mockApi';

/**
 * SimulatorModal — Sandbox UI testing the current workflow graph.
 *
 * It extracts the DAG, hits the mock API to simulate an execution trace, 
 * and renders the success/error logs in a timeline view.
 */
function SimulatorModal({ onClose }) {
  const { nodes, edges } = useWorkflow();
  const [isRunning, setIsRunning] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const runSimulation = async () => {
      try {
        const payload = serializeWorkflow(nodes, edges);
        const res = await mockApi.simulateWorkflow(payload.workflow);
        if (mounted) setResult(res);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setIsRunning(false);
      }
    };

    runSimulation();
    
    return () => { mounted = false; };
  }, [nodes, edges]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-surface-500/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-surface-400 border border-surface-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="h-14 px-5 border-b border-surface-200 flex items-center justify-between bg-surface-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-300 flex items-center justify-center text-surface-50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-surface-50">Execution Simulator</h2>
              <p className="text-[10px] text-surface-50/50">Testing active workflow logic</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-50/40 hover:text-surface-50 hover:bg-surface-300/50 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 bg-surface-500 flex-1 overflow-y-auto max-h-[60vh]">
          {isRunning && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-2 border-primary-500/20 border-t-primary-400 rounded-full animate-spin mb-4" />
              <p className="text-sm text-surface-50/70 font-medium">Running Simulation...</p>
              <p className="text-[11px] text-surface-50/40 mt-1">Tracing graph path via mock API</p>
            </div>
          )}

          {error && !isRunning && (
            <div className="p-5 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 text-center animate-fade-in">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-[13px] font-semibold text-rose-400 mb-1">Execution Failed</h3>
              <p className="text-[11px] text-surface-50/60">{error}</p>
            </div>
          )}

          {result && !isRunning && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse-soft" />
                  Success
                </span>
                <span className="text-[11px] text-surface-50/40">
                  {result.totalSteps} steps completed trace
                </span>
              </div>

              {/* Graphical Timeline Log */}
              <div className="space-y-0 text-left relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent">
                {result.logs.map((log, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-2">
                    {/* Icon Marker */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-surface-300 bg-surface-400 group-[.is-active]:bg-primary-500/20 group-[.is-active]:border-primary-500/40 text-surface-50/60 group-[.is-active]:text-primary-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    
                    {/* Event Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/[0.04] bg-surface-400/50 shadow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[12px] font-semibold text-surface-50">{log.label}</h4>
                        <time className="text-[10px] font-medium text-surface-50/30">
                          {log.duration}ms
                        </time>
                      </div>
                      <div className="text-[11px] text-surface-50/50 flex flex-col gap-1">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-surface-300 w-max uppercase tracking-wider">
                          Type: {log.nodeType}
                        </span>
                        <span>{log.detail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-14 px-5 border-t border-surface-200 flex items-center justify-end bg-surface-300">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-300/60 text-surface-50/80 text-[12px] font-medium hover:bg-surface-300 hover:text-surface-50 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulatorModal;
