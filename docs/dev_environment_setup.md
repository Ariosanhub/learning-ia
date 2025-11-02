# Guia de Ambiente de Desenvolvimento QtureApp

Este guia explica, passo a passo, como preparar o ambiente local, executar o playground estático e solucionar o erro `pnpm install` → `403` que pode ocorrer em redes restritas.

## 1. Pré-requisitos

1. **Node.js 18 LTS** (recomendado instalar via [nvm](https://github.com/nvm-sh/nvm)).
2. **pnpm 8**: `npm install -g pnpm@8` ou `corepack enable` + `corepack prepare pnpm@8 --activate`.
3. **Docker + Docker Compose** (para subir Postgres, Redis e serviços auxiliares quando rodar o backend NestJS).
4. **Git** e acesso ao repositório.

> Dica: confirme as versões com `node -v`, `pnpm -v` e `docker --version`.

## 2. Clonar o repositório

```bash
git clone https://github.com/<sua-conta>/learning-ia.git
cd learning-ia
```

## 3. Corrigindo o erro `pnpm install` 403 (npm registry bloqueado)

Alguns ambientes corporativos ou sandboxes bloqueiam o registro padrão do npm, resultando em erros `403` durante `pnpm install`. Siga os passos abaixo:

1. **Forçar o registry público** somente para este projeto:
   ```bash
   pnpm config set registry https://registry.npmjs.org
   pnpm config set @nestjs:registry https://registry.npmjs.org
   pnpm config set @types:registry https://registry.npmjs.org
   ```

2. **Caso continue com 403**, crie um arquivo `.npmrc` na raiz do projeto com o conteúdo:
   ```ini
   registry=https://registry.npmjs.org/
   @nestjs:registry=https://registry.npmjs.org/
   @types:registry=https://registry.npmjs.org/
   strict-ssl=false
   ```
   Use `strict-ssl=false` apenas se estiver atrás de um proxy interceptador. Remova assim que possível.

3. **Ambientes totalmente offline**: utilize um cache local/Artifactory. Exportamos a lista de dependências em `pnpm-lock.yaml`; basta publicar os pacotes necessários no registry privado e repetir o passo 1 apontando para o novo host.

4. Teste novamente:
   ```bash
   pnpm install
   ```

## 4. Scripts principais (monorepo)

Após a instalação das dependências:

```bash
# Iniciar backend NestJS com watch
pnpm --filter @cultureup/backend dev

# Iniciar frontend Next.js
pnpm --filter @cultureup/web dev

# Rodar mobile (Expo)
pnpm --filter @cultureup/mobile start

# Rodar todos os testes unitários
pnpm test
```

> Os comandos utilizam [pnpm workspaces](https://pnpm.io/workspaces). Use `pnpm -r <comando>` para executar algo em todos os pacotes.

## 5. Subindo a stack completa com Docker

Quando quiser uma experiência mais próxima da produção:

```bash
# Gera containers de Postgres, Redis e serviços web/backend
cp .env.example .env   # se disponível; ajuste variáveis necessárias
pnpm install          # garante node_modules sincronizados
docker compose up --build
```

O backend ficará disponível em `http://localhost:3001` e o frontend em `http://localhost:3000` (ajuste conforme docker-compose). Logs podem ser acompanhados com `docker compose logs -f api` ou `docker compose logs -f web`.

## 6. Playground estático (igual ao demo da lovable.dev)

Para testar imediatamente sem compilar nada:

1. Localize `apps/web/public/demo/index.html`.
2. Clique duas vezes para abrir no navegador ou rode um servidor estático rápido:
   ```bash
   pnpm dlx serve apps/web/public/demo -l 4173
   ```
3. A página salva os dados no `localStorage`; use o botão **Limpar dados** para resetar.
4. Para publicar, suba o arquivo em GitHub Pages, Netlify Drop ou Vercel drag-and-drop.

## 7. Estrutura sugerida para debugging

- **Logs do backend**: utilize `pnpm --filter @cultureup/backend dev -- --log-level debug` para inspecionar requests.
- **Banco de dados**: conecte no Postgres do Docker via `psql postgresql://cultureup:cultureup@localhost:5432/cultureup` (ajuste usuário/senha conforme `.env`).
- **Storybook/Componentes** (futuro): `pnpm --filter @cultureup/web storybook`.

## 8. Automatizações úteis

```bash
# Rodar lint e testes antes de commitar
pnpm lint
pnpm test

# Gerar build de produção
pnpm --filter @cultureup/web build
pnpm --filter @cultureup/backend build
```

## 9. Próximos passos

- Configurar variáveis de ambiente no `.env` para SSO, integrações e storage.
- Implementar `pnpm postinstall` com fallback para registries espelhados caso o projeto rode em air-gapped.
- Adicionar vídeos curtos demonstrando a abertura do playground e o fluxo completo de feedbacks.

## 10. FAQ rápido

| Problema | Como resolver |
| --- | --- |
| `ERR_PNPM_FETCH_403` | Refaça a etapa 3 (configurar registry) e confira proxies corporativos. |
| `pnpm: command not found` | Ative o Corepack (`corepack enable`) ou instale `npm install -g pnpm`. |
| `docker compose up` falha com porta ocupada | Pare serviços existentes (`lsof -i :3000`) ou altere portas no `docker-compose.yml`. |
| Navegador não salva dados do playground | Certifique-se de não estar no modo anônimo; o `localStorage` é limpo ao fechar. |

---

**Perguntas para refinar**
1. Deseja que o projeto já inclua `.npmrc` com registry configurado por padrão?
2. Há necessidade de script automático para baixar dependências e abrir o demo em um clique?
3. Quer automatizar publicação do playground (ex.: GitHub Actions → Pages)?

**Métricas para acompanhar na próxima semana**
- Tempo médio para um colaborador configurar o ambiente (objetivo: < 20 minutos).
- Número de erros `pnpm install` reportados após seguir o guia.
- Quantidade de acessos únicos ao playground estático.
