# CultureUP — Plano Integrado de Branding, Produto e Lançamento

## 1. Sincronização Inicial do Hub de Orquestração
- [UX/UI] → Consolidar identidade visual com base na paleta e tipografia definidas, garantindo consistência entre web e mobile.
- [Front-end] → Mapear componentes reutilizáveis inspirados em ClickUp, Qulture.Rocks e Monday (Sidebar, Dashboard, Boards, Tabela de tarefas, Configurações).
- [Back-end] → Modelar arquitetura multi-tenant escalável (Node.js + NestJS ou Python + FastAPI) com autenticação modular e integrações futuras (Google, Microsoft, Power BI).
- [DevOps] → Planejar infraestrutura em nuvem (AWS Free Tier / Railway) com pipelines CI/CD e observabilidade básica.
- [Estratégia Comercial] → Definir ICP (CEOs, líderes de RH, operações) e plano de aquisição Freemium → Paid.
- [Marketing] → Criar narrativa "Cultura que performa" e plano de conteúdo baseado em dados.
- [Suporte] → Desenhar playbook de onboarding e CSM leve via canais gratuitos (e-mail + chat in-app).

## 2. Identidade Visual Estratégica
### 2.1 DNA da Marca
- **Propósito:** Integrar pessoas, processos e tecnologia para acelerar resultados.
- **Visão:** Ser a plataforma brasileira referência em inteligência cultural com dados executivos.
- **Tom de voz:** Inspirador, executivo, orientado a métricas.

### 2.2 Paleta de Cores
| Uso | Hex | Nome | Significado |
| --- | --- | --- | --- |
| Primária | `#006A6A` | Azul Petróleo | Confiança, tecnologia e estabilidade |
| CTA / Destaques | `#FF7A00` | Laranja Energia | Ação, inovação e senso de urgência |
| Suporte (sucesso) | `#00C896` | Verde Menta | Indicadores positivos, crescimento |
| Alerta | `#FF5C5C` | Vermelho Claro | Riscos e pendências críticas |
| Fundo neutro | `#F5F7F8` | Cinza Azulado | Leveza, foco em dados |
| Texto | `#1C1C1E` | Grafite Profundo | Autoridade e contraste |

### 2.3 Tipografia
- **Títulos e destaques:** Poppins Bold
- **Subtítulos / Navegação:** Manrope SemiBold
- **Texto corrido:** Inter Regular
- **Slogan:** Manrope Light Italic — "Elevando Cultura. Potencializando Resultados."

### 2.4 Conceito de Logo
- Letra "U" estilizada como seta ascendente integrando três pontos conectados.
- Versões: horizontal (logotipo + tagline), vertical (logotipo sobre o ícone), ícone isolado (app/favicon).
- Aplicações: fundos sólidos nas cores primária e neutra, versão monocromática branca e grafite.

## 3. Arquitetura de Produto (MVP)
### 3.1 Stack Recomendada
- **Front-end:** React + Next.js (App Router) com Tailwind CSS; UI kit inspirado em ClickUp (Sidebar flutuante, views personalizáveis).
- **Mobile:** React Native Expo para replicar dashboards essenciais.
- **Back-end:** Node.js (NestJS) com Prisma ORM e PostgreSQL (Supabase/Railway). Alternativa: FastAPI + SQLModel.
- **Autenticação:** Clerk ou Auth0 free tier → alternativa: NextAuth + OAuth Google/Microsoft.
- **Integrações:** Conectores para Google Workspace (Gmail, Calendar), Microsoft 365, Power BI (embed), Webhooks.
- **Infraestrutura:** AWS Free Tier (API Gateway + Lambda) ou Railway (monolito) + S3 para assets.
- **Observabilidade:** Logtail/BetterStack (free), Sentry (starter) e cronjobs com GitHub Actions.

### 3.2 Módulos Principais
1. **Workspace & Times:** Gestão multiempresa, squads, papéis e permissões.
2. **Processos:** Workflows Kanban/List, automações simples, templates reutilizáveis.
3. **Pessoas:** Perfis de colaboradores, OKRs individuais, feedbacks contínuos.
4. **Performance & Cultura:** Dashboards de clima, eNPS, produtividade e engajamento.
5. **Integrações:** Importação de dados (CSV, Google Sheets), sincronização com Power BI e alertas por e-mail.
6. **Automations Freemium:** Regras básicas (trigger → ação) liberadas no plano gratuito para gerar hábito.

### 3.3 Fluxo de Dados
- Coleta → Processamento → Insights: dados de tarefas, feedbacks, processos e integrações alimentam um "Culture Graph" central (PostgreSQL + tabelas de métricas). KPIs renderizados no front com gráficos Recharts/ECharts.

## 4. Roadmap de Implementação (90 dias)
| Fase | Sprint | Entregas | Líder | Dependências |
| --- | --- | --- | --- | --- |
| Descoberta | S1 | Pesquisa com ICP, mapping features essenciais | Estratégia Comercial | — |
| Design | S2-S3 | Design system, protótipo navegável estilo ClickUp/Qulture | UX/UI | Input de Estratégia |
| Fundacional | S4-S5 | Setup repos, auth, estrutura multi-tenant, CI/CD | Back-end + DevOps | Design system |
| MVP Front | S6-S7 | Dashboard Overview, Lista, Kanban, Cadastro de pessoas | Front-end | APIs básicas |
| Insights | S8 | Módulo de KPIs (clima, performance), alertas | Back-end + Front | Dados consolidados |
| Integrações | S9 | Power BI embed, Google OAuth, email notifications | Back-end | MVP estável |
| Beta + Feedback | S10 | Onboarding guiado, analytics de uso, ajustes | Marketing + Suporte | MVP completo |

## 5. Plano de Features (MVP vs. Próximos Releases)
### 5.1 MVP (Plano Gratuito)
- Dashboard "Visão 360" com widgets customizáveis.
- Múltiplas visualizações de processos: Lista, Board, Timeline light.
- Cadastro de colaboradores, trilhas de desenvolvimento, feedback rápido.
- Integração nativa com Power BI (embed) + webhooks e e-mail.
- Automations básicas: avisos de tarefas atrasadas, alertas de clima.
- Template Center com modelos pré-configurados de rituais culturais.

### 5.2 Release 2 (Pós-Traction)
- OKRs avançados, AI co-pilot para insights de people analytics.
- Integrações com Slack, Teams, Jira, Notion.
- Relatórios personalizáveis e export PDF.
- Marketplace de templates criado pela comunidade.

### 5.3 Release 3 (Escala)
- Módulo Finance + People (análise de rentabilidade por squad).
- Benchmarks e score de maturidade cultural (dados agregados).
- Automations ilimitadas e fluxos condicionais complexos.

## 6. Estrutura Comercial e Go-to-Market
### 6.1 Modelo Freemium
- **Plano Free:** até 20 usuários, 3 processos ativos, dashboards padrão, integrações básicas.
- **Plano Growth (R$ 29/u/mês):** usuários ilimitados, automations avançadas, integrações premium, suporte prioritário.
- **Plano Enterprise:** customizações, SSO, consultoria de cultura.

### 6.2 Aquisição e Conteúdo
- Webinars mensais com cases de transformação cultural.
- Newsletter "CultureUP Insights" com benchmarks.
- Conteúdo comparativo (ClickUp vs CultureUP) focando em "People + Process + Performance".
- Parcerias com consultorias de RH para co-selling.

### 6.3 Sucesso do Cliente
- Onboarding auto-service com checklists gamificados.
- Health Score calculado via engajamento e clima.
- Suporte multicanal: e-mail, knowledge base, comunidade no Discord.

## 7. Estimativa de Custos (12 meses)
| Item | Custo Mensal (R$) | Observações |
| --- | --- | --- |
| Infraestrutura (Railway + Supabase + S3) | 800 | Escalável conforme uso |
| Ferramentas de Design (Figma, Nucleo) | 120 | Plano time pequeno |
| Observabilidade (Sentry, Logtail) | 80 | Planos iniciais |
| Automação Marketing (HubSpot Starter) | 210 | CRM + e-mail nurturing |
| Domínio + SSL + Landing | 30 | Cloudflare + Vercel |
| Reservas contingência | 260 | 10% buffer |
| **Total estimado** | **1.500** | Pode variar ±20% |

## 8. Principais Riscos e Mitigações
| Risco | Impacto | Mitigação |
| --- | --- | --- |
| MVP complexo demais | Alto | Foco em "Visão 360" + Pessoas + Processos + KPIs essenciais |
| Baixa adoção pós-onboarding | Médio | Playbook de engajamento + automations de valor imediato |
| Dependência de integrações externas | Médio | Roadmap incremental, feature flags e monitoramento |
| Custos de infraestrutura | Médio | Uso agressivo de free tiers e auto-escalonamento sob demanda |
| Competição direta | Alto | Diferenciação via cultura + performance integrada e narrativa brasileira |

## 9. Próximos Passos
1. Validar protótipo do logo e design system com 5 potenciais clientes.
2. Configurar workspace no Figma e repositórios Git (front/back) com guideline compartilhado.
3. Iniciar desenvolvimento do MVP (Sprint S4 do roadmap) priorizando dashboards e módulo de pessoas.
4. Produzir landing page teaser com lista de espera e conteúdo "Cultura que performa".
5. Planejar roteiro de soft launch com parceiros (consultorias e HR tech communities).

---
**Observação:** Caso deseje, podemos avançar para a geração visual do logo 1.0 mantendo o conceito "U ascendente" alinhado ao design system descrito acima.
