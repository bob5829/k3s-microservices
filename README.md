# K3S 微服务实战项目

基于 K3s (Kubernetes) 的 Node.js + Python Flask 微服务项目，涵盖从 Docker 容器化到生产级 K3s 集群部署的完整实践。

## 项目架构

```
用户浏览器 (HTTPS)
    ↓
Traefik Ingress (统一入口)
    ├─ /         → Node.js (HPA 1~5 副本)
    └─ /python   → Python Flask
    ↓
MariaDB (StatefulSet + PVC 持久存储)
    ↓
Prometheus 采集 → Grafana 可视化
```

## 目录结构

```
K3S/
├── apps/                    # 应用源码 + Dockerfile
│   ├── node-app/            # Node.js 应用
│   │   ├── server.js
│   │   └── Dockerfile
│   ├── py-app/              # Python Flask 应用
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── web/                 # 静态 Web
│       ├── index.html
│       └── Dockerfile
│
├── k8s/                     # Kubernetes 部署文件
│   ├── node-app-deploy.yaml
│   ├── node-app-svc.yaml
│   ├── py-app-deploy.yaml
│   ├── py-app-svc.yaml
│   ├── configmap.yaml       # 配置分离
│   ├── secret.yaml          # 密钥管理
│   ├── ingress.yaml         # 统一入口路由
│   ├── pvc.yaml             # 持久存储
│   ├── statefulset.yaml     # 有状态应用
│   ├── mariadb.yaml         # 数据库部署
│   └── monitoring.yaml      # Prometheus + Grafana
│
├── helm/                    # Helm Charts
│   └── mychart/             # 项目 Chart（一条命令全量部署）
│
├── docker-compose.yml       # 本地 Compose 编排
├── docs/                    # 学习笔记文档
└── scripts/                 # 工具脚本
```

## 技术栈

| 层 | 技术 |
|----|------|
| 运行时 | Node.js / Python Flask |
| 容器 | Docker |
| 编排 | Kubernetes (K3s) |
| 网络 | Traefik Ingress |
| 存储 | PVC + StatefulSet |
| 数据库 | MariaDB |
| 配置 | ConfigMap + Secret |
| 弹性 | HPA 自动扩缩容 + 健康检查 |
| 监控 | Prometheus + Grafana |
| 包管理 | Helm |

## 快速开始

### 本地 Docker Compose

```bash
docker compose up -d --build
# 访问 http://localhost:3000
```

### K3s 集群部署

```bash
# 1. 创建集群
k3d cluster create mycluster

# 2. 构建并导入镜像
cd apps/node-app && docker build -t node-app:latest . && cd ../..
cd apps/py-app   && docker build -t py-app:latest .   && cd ../..
k3d image import node-app:latest py-app:latest -c mycluster

# 3. 部署
kubectl apply -f k8s/

# 4. 访问
kubectl port-forward svc/node-app 3000:3000
# 打开 http://localhost:3000
```

### Helm 一键部署

```bash
helm install my-app ./helm/mychart
```

## 学习路径

1. Docker 基础 → Dockerfile → Compose
2. K3s 集群 → Pod/Deployment → Service
3. ConfigMap/Secret → Ingress → Helm
4. 资源限制 → 健康检查 → HPA
5. PVC → StatefulSet → 数据库实战
6. Prometheus + Grafana 监控
7. CI/CD (待完成)

## 文档

- [Docker 与 K3s 实操学习笔记](docs/Docker与K3s实操学习笔记.docx)
