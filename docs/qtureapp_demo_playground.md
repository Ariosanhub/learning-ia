# QtureApp Playground Estático

Esta página foi criada para que você consiga **testar e demonstrar** rapidamente a experiência do QtureApp sem depender da instalação completa do monorepo ou da infraestrutura SaaS.

## Como usar

1. Navegue até `apps/web/public/demo/index.html` e abra o arquivo no navegador (Chrome, Edge, Safari ou Firefox).
2. Caso queira compartilhar com outras pessoas, hospede o arquivo em qualquer serviço estático gratuito (GitHub Pages, Netlify Drop, Vercel drag-and-drop, etc.).
3. Todas as interações (tarefas, OKRs, feedbacks) ficam salvas no `localStorage` do navegador. Use o botão **Limpar dados** para reiniciar a simulação.

## O que está incluído

- **Kanban simplificado** com backlog, em progresso e concluído.
- **Formulário de OKRs** com Key Results editáveis e barra de progresso.
- **Painel de Feedbacks/Elogios/1:1s** para registrar interações contínuas.
- **Landing page bilíngue/trilíngue** (pt/en/es) com planos de assinatura (30 dias grátis → US$ 5 → US$ 15 → US$ 25) para alinhar com a estratégia comercial.

## Próximos passos sugeridos

- Reutilizar o conteúdo do arquivo como base para a landing page real em Next.js e publicar em `qtureapp.com`.
- Conectar os formulários com o backend NestJS assim que os endpoints do MVP estiverem disponíveis.
- Adicionar captura de métricas (por exemplo, via Plausible ou PostHog) para medir engajamento.

## Limitações conhecidas

- Não há autenticação ou multi-tenant (apenas uma organização fictícia).
- Visualizações avançadas (Timeline, Workload, Mapas) ainda não estão presentes neste playground.
- Integrações (Power BI, Slack, e-mail) são apenas mencionadas na cópia e não funcionais nesta versão estática.

> ASSUNÇÃO: este playground será utilizado para validação rápida de UX e pitch comercial antes do desenvolvimento completo da stack SaaS.
