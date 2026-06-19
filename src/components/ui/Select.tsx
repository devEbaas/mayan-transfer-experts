import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-xs font-bold text-text-secondary tracking-wide uppercase mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full appearance-none border border-border-input rounded-[11px]
              px-3.5 py-3 pr-9 text-[15px] text-navy bg-white cursor-pointer
              focus:outline-none focus:border-teal focus:shadow-[0_0_0_3px_rgba(14,140,130,0.12)]
              ${error ? 'border-red-400' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none text-xs">
            ▼
          </span>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
