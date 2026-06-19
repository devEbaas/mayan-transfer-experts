import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-xs font-bold text-text-secondary tracking-wide uppercase mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full border border-border-input rounded-[11px] px-3.5 py-3 text-[15px] text-navy bg-white
            focus:outline-none focus:border-teal focus:shadow-[0_0_0_3px_rgba(14,140,130,0.12)]
            ${error ? 'border-red-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
