# Riscos Prioritários & Próximos Passos

## 1. Riscos
1. **Escopo MVP inflado**
   - *Impacto*: atraso no lançamento beta.
   - *Mitigação*: roadmap fatiado por épicos, feature flags e medição semanal de capacidade.
2. **Integrações SSO/Slack demoradas**
   - *Impacto*: queda na ativação inicial.
   - *Mitigação*: priorizar Google SSO e webhooks genéricos no MVP; Slack nativo na Sprint 3.
3. **Adoção baixa de feedback contínuo**
   - *Impacto*: churn e baixa diferenciação.
   - *Mitigação*: onboarding gamificado, templates e nudge semanal automatizado.
4. **Complexidade LGPD**
   - *Impacto*: risco legal e reputacional.
   - *Mitigação*: DPA com clientes piloto, revisão jurídica, criptografia campo-a-campo.
5. **Observabilidade insuficiente**
   - *Impacto*: difícil diagnosticar incidentes.
   - *Mitigação*: instrumentar OpenTelemetry desde Sprint 1, alertas SLO.

## 2. Próximos Passos (Semana 1)
1. Validar PRD e backlog com stakeholders → ajustar RICE.
2. Montar squad núcleo (Tech Lead, PM, Designer, Backend, Frontend).
3. Iniciar setup do monorepo local + pipelines CI.
4. Criar protótipo high-fidelity inspirado em lovable.dev para Dashboard.
5. Planejar entrevistas com clientes-alvo (3 CEOs, 3 Heads People).

## 3. Perguntas para Refinar
1. Qual orçamento disponível para infra inicial (12 meses)?
2. Há exigência de certificações (ISO27001, SOC2) até o lançamento?
3. Precisamos de suporte offline completo no mobile no MVP?
4. Qual timeline de integração Power BI profunda (dataset incremental)?
5. Há necessidade de white-label (domínio customizado) já no beta?

## 4. Métricas Semanais
- % de tarefas do Sprint 0 concluídas.
- Nº de feedbacks coletados nas entrevistas.
- Tempo médio de build no CI após ajustes.
