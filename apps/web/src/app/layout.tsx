import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'CultureUP Workspace',
  description: 'Workspace all-in-one para gestão de pessoas, processos e tecnologia.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-surface text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
