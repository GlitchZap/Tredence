import { cn } from '../../utils/cn';

/**
 * MovingBorderButton
 * Inspired by Aceternity UI.
 * Features a spinning conic-gradient underneath a solid card mask.
 */
function MovingBorderButton({ children, onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex h-8 overflow-hidden rounded-[8px] p-[1px] focus:outline-none focus:ring-2 focus:ring-surface-200 focus:ring-offset-2',
        disabled ? 'cursor-not-allowed opacity-50 grayscale' : 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200',
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--surface-300)_0%,var(--color-primary-500)_50%,var(--surface-300)_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[7px] bg-surface-500 px-3 py-1 text-[11px] font-semibold text-surface-50 glass-strong shrink-0 z-10 transition-colors gap-1.5">
        {children}
      </span>
    </button>
  );
}

export default MovingBorderButton;
