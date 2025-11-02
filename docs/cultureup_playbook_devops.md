# Playbook DevOps & Implantações - CultureUP

## 1. Infraestrutura de Referência
- **Cluster Kubernetes** (EKS/GKE) com 3 nós t3.medium (ASSUNÇÃO inicial).
- **PostgreSQL gerenciado** (RDS/GCP Cloud SQL) com extensão `pg_trgm` e backups automáticos.
- **Redis** gerenciado (Elasticache/Memorystore) para cache e filas.
- **Object Storage** compatível S3 para arquivos e exports.
- **CI/CD**: GitHub Actions → ArgoCD (deploy) → K8s.

## 2. Pipeline CI/CD
1. `lint-test.yml`: executa `pnpm lint`, `pnpm test`, `pnpm --filter @cultureup/web test:e2e` com Playwright headless.
2. `build.yml`: gera imagens docker `cultureup-backend` e `cultureup-web` com tags `git-sha`.
3. `deploy.yml`: publica manifestos Helm/ksops para cluster staging; produção via aprovação manual.

## 3. Manifests Kubernetes (base)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cultureup-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cultureup-backend
  template:
    metadata:
      labels:
        app: cultureup-backend
    spec:
      containers:
        - name: backend
          image: registry.example.com/cultureup-backend:latest
          ports:
            - containerPort: 3000
          envFrom:
            - secretRef:
                name: cultureup-backend-secrets
---
apiVersion: v1
kind: Service
metadata:
  name: cultureup-backend
spec:
  selector:
    app: cultureup-backend
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
```

Frontend segue padrão semelhante com `Deployment` + `Service` + `Ingress` (NGINX) para `web.cultureup.app`.

## 4. Observabilidade
- **Logs**: Fluent Bit → CloudWatch/Stackdriver.
- **Métricas**: Prometheus + Grafana (dashboards: latência API, consumo CPU/memória, uso Redis).
- **Tracing**: OpenTelemetry Collector enviando para Tempo/Jaeger.
- **Alertas**: Grafana OnCall + Slack (#cultureup-alertas).

## 5. Backups & DR
- PostgreSQL: snapshots diários (retenção 14 dias) + PITR.
- Redis: backups automáticos a cada 12h.
- Object Storage: versionamento habilitado.
- Runbook restauração (ver seção 7).

## 6. Segurança Operacional
- IAM com princípio de menor privilégio.
- Secrets via AWS Secrets Manager ou HashiCorp Vault.
- Política de rotação de chaves (90 dias).
- Auditoria: CloudTrail + logs de aplicação assinados.

## 7. Runbooks
### 7.1 Backup/Restore
1. Identificar incidente e abrir ticket no Jira (`INC-###`).
2. Restaurar snapshot PostgreSQL para instância temporária.
3. Validar integridade com scripts Prisma (`prisma migrate status`).
4. Promover instância restaurada e atualizar `DATABASE_URL` no Secret.
5. Rodar `kubectl rollout restart deployment/cultureup-backend`.
6. Registrar pós-mortem em até 48h.

### 7.2 Incidente crítico (latência > 1s)
1. PagerDuty alerta on-call.
2. Validar dashboards (Grafana) e logs (Sentry).
3. Habilitar autoscale horizontal (`kubectl scale deployment/cultureup-backend --replicas=4`).
4. Avaliar filas Redis e event bus (lag > 100 msgs → adicionar worker).
5. Comunicar status no canal #cultureup-status a cada 15 min.

## 8. Perguntas para Refinar
1. Já existe preferência por Helm vs. Kustomize?
2. Qual provedor para monitoramento sintético?
3. Quais integrações de alerta (Slack, MS Teams, SMS) são mandatórias?
4. Qual janela de manutenção aceitável para releases?
5. Há requisitos de segregação de ambientes (dev/stg/prod) em contas distintas?

## 9. Métricas Semanais
- Lead time de deploy (commit → produção).
- Taxa de sucesso de deploys (% sem rollback).
- Tempo médio de recuperação (MTTR) de incidentes críticos.
