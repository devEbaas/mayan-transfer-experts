import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'paypal' | 'card' | 'ghost' | 'whatsapp';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    'bg-teal text-white hover:bg-teal-dark shadow-[0_12px_24px_-8px_rgba(14,140,130,0.6)]',
  secondary: 'bg-navy text-white hover:bg-navy-dark',
  outline:
    'bg-white border-[1.5px] border-border-input text-navy hover:border-teal hover:text-teal',
  paypal: 'bg-paypal text-[#13287e] hover:brightness-[0.97] font-extrabold',
  card: 'bg-card-purple text-white hover:bg-[#2f26b3]',
  ghost: 'bg-transparent text-text-secondary hover:text-navy',
  whatsapp: 'bg-whatsapp text-white hover:brightness-95',
};

export default function Button({
  variant = 'primary',
  fullWidth,
  loading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        border-none rounded-xl px-6 py-3.5 text-[15px] font-bold cursor-pointer
        transition-colors duration-150 flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${styles[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
