# CultureUP - PRD v1

## 1. Contexto e Problema
Empresas em crescimento enfrentam dificuldade para alinhar objetivos estratégicos, execução operacional e engajamento de pessoas em uma única plataforma. As soluções existentes (ClickUp, Qulture.Rocks, Monday.com) resolvem partes isoladas do problema, exigindo integrações manuais, duplicação de informações e dificultando uma visão única de performance.

## 2. Personas Primárias
- **CEO/Founder**: precisa de visibilidade holística do progresso estratégico e saúde cultural.
- **CHRO/People Ops**: busca conduzir rituais de feedback, 1:1s e desenvolvimento individual com dados integrados.
- **Head de Operações/PMO**: necessita garantir execução disciplinada, gestão de projetos e indicadores de produtividade.
- **People Manager**: conduz times híbridos, precisa acompanhar entregas, metas, clima e feedbacks contínuos.

## 3. Jobs-to-be-Done
1. Consolidar planejamento estratégico, OKRs e execução diária em um hub único.
2. Acompanhar andamento de squads e health-checks com dashboards em tempo real.
3. Cultivar uma cultura de feedback contínuo com histórico e rituais de 1:1s.
4. Automatizar alertas de risco, prazos vencidos e progresso de metas.
5. Facilitar onboarding de novas pessoas e promover autonomia com templates prontos.

## 4. Proposta de Valor
"CultureUP integra gestão de trabalho, OKRs e pessoas em um workspace inteligente que transforma cultura em performance." A plataforma entrega visão 360º da empresa, automações inteligentes, experiência inspirada em ClickUp com módulos people-first de Qulture.Rocks e rituais guiados.

## 5. Escopo MVP (ASSUNÇÃO: foco no mercado brasileiro mid-market, 100-500 colaboradores)
### Funcionalidades Essenciais
1. Estrutura multi-tenant com hierarquia Workspace → Space → Folder → List → Task/Subtask.
2. Views: Tabela, Kanban, Gantt, Timeline, Workload, Mind Map, Map, Box/Activity.
3. Colaboração: Docs rich-text com comentários inline, @menções, permissões e páginas públicas.
4. OKRs: Objetivos trimestrais, KRs numéricos/percentuais/monetários/task-linked, progresso automático por tarefas.
5. Pessoas: feedback contínuo, elogios públicos alinhados a valores, 1:1s com cadência e pautas, PDI básico, pesquisas de pulso.
6. Automations: triggers de criação/atualização de tarefas, datas críticas, progresso de OKR, feedback recebido, 1:1 agendado com ações de notificação, atribuição e webhooks.
7. Integrações: Google/Microsoft SSO, CSV/XLSX import, iCal, webhooks, API pública REST e event bus.
8. AI Assist MVP: geração de tarefas, resumo de comentários, pauta de 1:1, feedback com tom configurável, insight de progresso de OKR.

### Experiências Críticas
- Criar objetivo com KRs e acompanhar progresso autoatualizado.
- Registrar elogio público alinhado a valor e visualizar no feed e perfil.
- Agendar 1:1 quinzenal com pauta, notas, follow-ups e lembretes.
- Construir automação "due_at < hoje" + "priority alta" com ação Slack + atribuição.
- Criar doc colaborativo e vincular a tarefa/OKR.

## 6. Restrições e Exclusões
- Sem marketplace de apps no MVP.
- Docs sem coedição simultânea real-time (somente bloqueio otimista).
- Automations limitadas a 5 triggers e 6 ações.
- Busca avançada via Postgres trigram (OpenSearch fase 2).

## 7. KPIs de Sucesso (semanais)
- Taxa de ativação: % de contas que criam ≥3 tarefas, salvam ≥1 view e enviam ≥1 feedback.
- Número médio de feedbacks enviados por usuário ativo.
- % de objetivos com KRs atualizados na última semana.

## 8. Métricas de Produto (mensais)
- Tasks criadas por organização.
- Tempo mediano de ciclo das tarefas concluídas.
- Adesão a 1:1s (realizados / agendados).
- Net Promoter Score (ASSUNÇÃO: pesquisa trimestral).

## 9. Roadmap (90 dias)
- **Semana 1-2**: Discovery, PRD, design system tokens, arquitetura técnica, setup monorepo.
- **Semana 3-5**: Autenticação SSO, multi-tenant, CRUD tasks, views Tabela/Kanban, docs MVP.
- **Semana 6-8**: OKRs MVP, feedbacks + elogios, 1:1s, automations triggers iniciais, AI Assist básico.
- **Semana 9-10**: Gantt, Timeline, Workload, Mind Map, Map, import/export, integrações iniciais.
- **Semana 11-12**: QA/E2E, observabilidade, LGPD, playbooks, lançamento beta fechado.

## 10. Pricing & Modelo Comercial (ASSUNÇÃO)
- **Freemium**: até 10 usuários, 3 Spaces, automations limitadas, sem export avançado.
- **Pro (R$39/usuário/mês)**: integrações completas, automations ilimitadas, AI Assist ampliado.
- **Enterprise (custom)**: SCIM, SSO avançado, suporte dedicado, SLA 99,9%.

## 11. Lançamento & Go-to-Market
- Beta fechado com 5 empresas piloto (indústria tecnologia/serviços).
- Programa de onboarding guiado com Customer Success remoto.
- Conteúdo: webinars "Cultura que performa", whitepaper comparativo ClickUp + Qulture.

## 12. Riscos & Mitigações
- **Complexidade técnica**: modularizar arquitetura, priorizar backbone antes de features avançadas.
- **Adoção baixa de feedbacks**: onboarding gamificado, templates e nudge por e-mail.
- **Conformidade LGPD**: DPO contratado, privacy by design desde o MVP.
- **Escalabilidade**: testes de carga, uso de filas, observabilidade desde o início.

## 13. Dependências
- Bibliotecas OSS (TipTap, React Flow, React Gantt). Avaliar licenças permissivas.
- Serviços externos: Google/Microsoft OAuth, AWS S3 compatível, Redis, Postgres gerenciado.
- Suporte jurídico para DPA e termos de uso.

## 14. Critérios de Aceite (amostra)
- Gestor cria objetivo com KRs percentuais e task-linked, progresso autoatualizado ao completar tarefas.
- Líder envia elogio público e aparece no feed e perfil do colaborador.
- Par de 1:1 registra pauta, notas, ações e exporta resumo.
- Admin configura automação "due_at < hoje" + prioridade alta → notifica Slack + atribui responsável + loga firing.

## 15. Backlog Prioritário (RICE)
| Item | Descrição | Reach | Impact | Confidence | Effort | RICE |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Autenticação multi-tenant com SSO Google/Microsoft | 600 | 3 | 0.8 | 5 | 288 |
| 2 | CRUD Tasks + Views Tabela/Kanban | 600 | 3 | 0.7 | 7 | 180 |
| 3 | Docs rich-text com comentários | 500 | 2 | 0.7 | 5 | 140 |
| 4 | OKRs MVP (objetivos + KRs) | 400 | 3 | 0.6 | 6 | 120 |
| 5 | Feedback contínuo + elogios | 350 | 3 | 0.6 | 6 | 105 |
| 6 | 1:1s com pautas e follow-ups | 300 | 3 | 0.6 | 6 | 90 |
| 7 | Automations triggers iniciais | 300 | 2 | 0.6 | 6 | 60 |
| 8 | AI Assist geração de tarefas | 250 | 2 | 0.5 | 5 | 50 |
| 9 | Import CSV/XLSX | 280 | 1 | 0.6 | 4 | 42 |
| 10 | Gantt/Timeline/Workload views | 250 | 2 | 0.5 | 7 | 35.7 |
| 11 | Mind Map / Map view | 220 | 1 | 0.5 | 6 | 18.3 |
| 12 | Webhooks outbound | 200 | 2 | 0.5 | 5 | 20 |
| 13 | API pública REST (OpenAPI) | 200 | 2 | 0.5 | 6 | 16.7 |
| 14 | PDI MVP | 180 | 1 | 0.4 | 5 | 14.4 |
| 15 | Pesquisas de pulso básicas | 180 | 1 | 0.4 | 5 | 14.4 |
| 16 | Observabilidade (OTel, Grafana) | 600 | 2 | 0.5 | 8 | 75 |
| 17 | RBAC avançado (Owner/Admin/Member/Guest) | 600 | 2 | 0.6 | 6 | 120 |
| 18 | Templates e onboarding guiado | 400 | 2 | 0.5 | 5 | 80 |
| 19 | Automations notificações Slack | 280 | 2 | 0.5 | 4 | 70 |
| 20 | Export CSV/XLSX | 260 | 1 | 0.5 | 4 | 32.5 |
| 21 | Audit log com rastreabilidade | 600 | 2 | 0.6 | 7 | 102.9 |
| 22 | Integração iCal | 240 | 1 | 0.5 | 4 | 30 |
| 23 | Event bus interno | 400 | 2 | 0.4 | 8 | 40 |
| 24 | AI Assist resumo de comentários | 250 | 2 | 0.4 | 6 | 33.3 |
| 25 | AI Assist pauta 1:1 e feedback | 250 | 2 | 0.4 | 6 | 33.3 |

## 16. Perguntas para Refinar
1. Qual o segmento prioritário (tech, serviços, indústria) e ticket médio desejado?
2. Quais integrações de comunicação (Slack, Teams) são obrigatórias no MVP?
3. Há requisitos específicos de auditoria ou certificações (ISO, SOC2) no curto prazo?
4. Qual a cadência ideal de entregas para o conselho/investidores?
5. Como serão tratados dados sensíveis de feedback e 1:1 (criptografia adicional?)

## 17. Métricas para acompanhar (próxima semana)
- Número de entrevistas de discovery realizadas.
- % de telas-chave prototipadas no design system.
- Tempo médio para provisionar novo tenant no ambiente dev.
