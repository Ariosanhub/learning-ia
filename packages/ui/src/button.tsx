import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors';
  const variants: Record<typeof variant, string> = {
    primary: 'bg-[color:var(--color-primary)] text-white hover:brightness-110',
    secondary: 'border border-slate-300 text-slate-700 hover:bg-slate-50'
  } as const;

  return <button className={`${base} ${variants[variant]}`} {...props} />;
};
