import { cn } from '../../utils/cn';

/**
 * ShinyText
 * Inspired by Reactbits.dev
 * Animates a highlighted shine across text using Tailwind gradient & animations.
 */
function ShinyText({ text, disabled = false, speed = 3, className = '' }) {
  return (
    <span
      className={cn(
        'inline-block bg-clip-text text-transparent bg-[length:200%_100%]',
        !disabled && 'animate-shine',
        /* Dark mode: dark dim text to bright white, Light mode: light dim text to dark slate */
        'bg-gradient-to-r from-surface-100 via-surface-50 to-surface-100',
        className
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}

export default ShinyText;
