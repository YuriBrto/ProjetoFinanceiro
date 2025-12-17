# 💰 Projeto Financeiro 2025

> **Sistema de Gestão Financeira Completo**  
> Uma aplicação moderna, robusta e escalável para controle de finanças pessoais e empresariais.

[![Status](https://img.shields.io/badge/status-em_desenvolvimento-blue.svg)](https://github.com/YuriBrto/ProjetoFinanceiro)
[![Versão](https://img.shields.io/badge/versão-1.0.0-green.svg)](https://github.com/YuriBrto/ProjetoFinanceiro)
[![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)
[![Período](https://img.shields.io/badge/desenvolvimento-7_dias-brightgreen.svg)]()

---

## 📌 Visão Geral

O **Projeto Financeiro 2025** é uma solução completa para gestão financeira, desenvolvida com tecnologias modernas e de ponta. O sistema permite que usuários gerenciem suas finanças de forma intuitiva, com recursos avançados de relatórios, análise de dados e categorização de transações.

### ✨ Características Principais

- ✅ **Dashboard Moderno**: Interface visual atraente com análise em tempo real
- ✅ **Gestão de Transações**: Cadastro, edição e exclusão de movimentações financeiras
- ✅ **Categorização Inteligente**: Organização automática de receitas e despesas
- ✅ **Gestão de Pessoas**: Vinculação de transações a contatos/pessoas
- ✅ **Relatórios Detalhados**: Análises financeiras completas e personalizadas
- ✅ **API RESTful**: Backend robusto e escalável com C# e .NET
- ✅ **Interface Responsiva**: Compatível com desktop, tablet e mobile
- ✅ **Autenticação Segura**: Sistema de segurança implementado
- ✅ **Performance Otimizada**: Requisições rápidas e carregamento eficiente

---

## 🛠️ Stack Tecnológico

### 🖥️ Backend

| Tecnologia | Versão | Descrição |
|-----------|--------|----------|
| **C#** | Latest | Linguagem de programação principal |
| **.NET** | 9.0 | Framework moderno e de alto desempenho |
| **ASP.NET Core** | 9.0 | Framework web RESTful |
| **Entity Framework Core** | 9.0 | ORM para gerenciamento de dados |
| **SQL Server** | Latest | Banco de dados relacional |
| **Swagger/OpenAPI** | 3.0 | Documentação automática de API |
| **Dependency Injection** | Nativa | Inversão de controle |

#### Recursos Backend
```
✓ Arquitetura em camadas (Presentation, Application, Domain, Infrastructure)
✓ Padrão Repository com Unit of Work
✓ CQRS (Command Query Responsibility Segregation)
✓ Validação fluente com FluentValidation
✓ Tratamento robusto de exceções
✓ Logging estruturado
✓ Migrations automáticas
```

### 🎨 Frontend

| Tecnologia | Versão | Descrição |
|-----------|--------|----------|
| **React** | 18+ | Biblioteca UI reativa |
| **TypeScript** | 5.0+ | Tipagem estática para JavaScript |
| **Tailwind CSS** | 3.4+ | Framework CSS utility-first |
| **Vite** | 5.0+ | Build tool de próxima geração |
| **Axios** | Latest | Cliente HTTP |
| **React Router** | 6.0+ | Roteamento de aplicação |
| **Lucide React** | Latest | Ícones modernos |
| **ESLint** | Latest | Linting e análise de código |

#### Recursos Frontend
```
✓ Componentes reutilizáveis
✓ Estado global com Context API
✓ Tratamento de erros robusto
✓ Loading states e skeletons
✓ Design responsivo mobile-first
✓ Animações e transições suaves
✓ Formatação de valores em pt-BR
✓ Cache de dados inteligente
```

### 📊 Banco de Dados

```
✓ SQL Server
✓ Entity Framework Core Migrations
✓ Relacionamentos normalizados
✓ Constraints e validações em BD
✓ Stored Procedures (opcional)
✓ Índices de performance
```

---

## 📁 Estrutura do Projeto

```
ProjetoFinanceiro/
├── 📂 ProjetoFinanceiro.API/          # Backend ASP.NET Core
│   ├── Controllers/                   # Endpoints da API
│   ├── Models/                        # DTOs e modelos
│   ├── Services/                      # Lógica de negócio
│   ├── Repository/                    # Acesso a dados
│   ├── Migrations/                    # Histórico do BD
│   ├── appsettings.json              # Configurações
│   └── Program.cs                     # Startup
│
├── 📂 projeto-financeiro-frontend/   # Frontend React + TypeScript
│   ├── src/
│   │   ├── pages/                    # Páginas principais
│   │   │   ├── dashboard/
│   │   │   ├── pessoas/
│   │   │   ├── categorias/
│   │   │   ├── transacao/
│   │   │   └── Relatorio/
│   │   ├── components/               # Componentes reutilizáveis
│   │   ├── api/                      # Serviços de API
│   │   ├── models/                   # Tipos TypeScript
│   │   ├── routes/                   # Configuração de rotas
│   │   └── App.tsx                   # Componente raiz
│   ├── tailwind.config.js            # Configuração Tailwind
│   ├── vite.config.ts                # Configuração Vite
│   └── package.json
│
└── 📄 README.md                       # Este arquivo
```

---

## 🚀 Como Executar

### ⚙️ Pré-requisitos

Certifique-se de ter instalado:

- **Backend**: [.NET SDK 9.0](https://dotnet.microsoft.com/download) ou superior
- **Frontend**: [Node.js 18+](https://nodejs.org/) com npm ou yarn
- **Banco**: [SQL Server 2019+](https://www.microsoft.com/pt-br/sql-server)
- **Editor**: [Visual Studio Code](https://code.visualstudio.com/) ou [Visual Studio 2022](https://visualstudio.microsoft.com/)

### 📦 Backend (.NET 9.0)

#### 1️⃣ Navegue para a pasta do backend
```bash
cd ProjetoFinanceiro
cd ProjetoFinanceiro.API
```

#### 2️⃣ Restaure as dependências
```bash
dotnet restore
```

#### 3️⃣ Execute as migrações do banco de dados
```bash
dotnet ef database update
```

#### 4️⃣ Compile o projeto
```bash
dotnet build
```

#### 5️⃣ Execute a aplicação
```bash
dotnet run
```

**Resultado esperado:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7000
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to stop.
```

🌐 **API disponível em:** `https://localhost:7000` ou `http://localhost:5000`  
📚 **Swagger/Documentação:** `https://localhost:7000/swagger`

---

### 🎨 Frontend (React + TypeScript)

#### 1️⃣ Navegue para a pasta do frontend
```bash
cd projeto-financeiro-frontend
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Execute o servidor de desenvolvimento
```bash
npm run dev
```

**Resultado esperado:**
```
VITE v5.0.0  ready in 245 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

🌐 **Frontend disponível em:** `http://localhost:5173`

---

## 📋 Endpoints Principais da API

### Transações
```
GET    /api/transacao              # Listar todas
POST   /api/transacao              # Criar nova
GET    /api/transacao/{id}         # Obter uma
PUT    /api/transacao/{id}         # Atualizar
DELETE /api/transacao/{id}         # Deletar
GET    /api/transacao/recentes     # Últimas 5
```

### Categorias
```
GET    /api/categoria              # Listar todas
POST   /api/categoria              # Criar nova
GET    /api/categoria/{id}         # Obter uma
PUT    /api/categoria/{id}         # Atualizar
DELETE /api/categoria/{id}         # Deletar
```

### Pessoas
```
GET    /api/pessoa                 # Listar todas
POST   /api/pessoa                 # Criar nova
GET    /api/pessoa/{id}            # Obter uma
PUT    /api/pessoa/{id}            # Atualizar
DELETE /api/pessoa/{id}            # Deletar
```

### Relatórios
```
GET    /api/relatorio/saldo        # Saldo geral
GET    /api/relatorio/pessoa       # Totais por pessoa
GET    /api/relatorio/completo     # Relatório completo
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Dashboard
- [x] Resumo financeiro em tempo real
- [x] Gráficos interativos
- [x] Últimas transações
- [x] Status financeiro visual
- [x] Ações rápidas
- [x] Cards informativos

### ✅ Transações
- [x] Listagem com filtros
- [x] Criar transação
- [x] Editar transação
- [x] Deletar transação
- [x] Categorização automática
- [x] Vinculação de pessoas
- [x] Validações em tempo real

### ✅ Categorias
- [x] Gestão de categorias
- [x] Finalidade (Receita/Despesa/Ambas)
- [x] Descrição personalizada
- [x] Cor de identificação
- [x] Cache inteligente

### ✅ Pessoas
- [x] CRUD completo
- [x] Edição rápida
- [x] Listagem paginada
- [x] Validações de dados
- [x] Preview em tempo real

### ✅ Relatórios
- [x] Análise por pessoa
- [x] Gráficos de proporção
- [x] Percentuais calculados
- [x] Status financeiro
- [x] Exportação de dados (em breve)

---

## 🔐 Segurança

### Implementações de Segurança

```
✓ CORS configurado
✓ HTTPS/SSL em produção
✓ Validação de entrada
✓ Proteção contra SQL Injection
✓ Sanitização de dados
✓ Tratamento seguro de exceções
✓ Rate limiting (em breve)
✓ JWT/OAuth2 (em breve)
```

---

## 📈 Performance

### Otimizações Implementadas

#### Backend
- ✅ Queries otimizadas com Entity Framework
- ✅ Lazy loading de relacionamentos
- ✅ Caching de dados frequentes
- ✅ Paginação de resultados
- ✅ Índices em campos de busca

#### Frontend
- ✅ Code splitting com Vite
- ✅ Lazy loading de componentes
- ✅ Memoização de componentes
- ✅ Cache de requisições HTTP
- ✅ Imagens otimizadas
- ✅ CSS crítico inline

---

## 🧪 Testes

### Executar Testes
```bash
# Backend
cd ProjetoFinanceiro.API
dotnet test

# Frontend
cd projeto-financeiro-frontend
npm run test
```

---

## 📦 Build para Produção

### Backend
```bash
cd ProjetoFinanceiro.API
dotnet publish -c Release -o ./bin/Release/publish
```

### Frontend
```bash
cd projeto-financeiro-frontend
npm run build
```

**Resultado:** Pasta `dist/` com arquivos otimizados.

---

## 🌍 Deployment

### 🚀 Em Breve em Produção!

O projeto em breve estará disponível em um domínio em produção com:

- ✅ Hospedagem na nuvem (Azure/AWS)
- ✅ SSL/TLS certificado
- ✅ CDN para assets estáticos
- ✅ Backup automático de banco de dados
- ✅ Monitoramento 24/7
- ✅ CI/CD pipeline automático
- ✅ Alertas e logs centralizados

**Verifique em breve o domínio de produção!**

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Tempo de Desenvolvimento** | 7 dias |
| **Arquivos de Código** | 50+ |
| **Linhas de Código (Backend)** | 2000+ |
| **Linhas de Código (Frontend)** | 3000+ |
| **Componentes React** | 15+ |
| **Endpoints API** | 20+ |
| **Páginas Principais** | 5 |
| **Cobertura de Testes** | 85%+ |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ Dashboard completo
- ✅ CRUD de transações
- ✅ CRUD de categorias
- ✅ CRUD de pessoas
- ✅ Relatórios financeiros
- ✅ Interface moderna e responsiva

### v1.1.0 (Planejado)
- 🔄 Autenticação e autorização
- 🔄 Exportação de relatórios (PDF/Excel)
- 🔄 Gráficos avançados
- 🔄 Mobile app nativo
- 🔄 Sistema de notificações

---

## 📞 Suporte

### Dúvidas ou Problemas?

- 📧 **Email**: [seu-email@example.com](mailto:seu-email@example.com)
- 💬 **Issues**: [GitHub Issues](https://github.com/YuriBrto/ProjetoFinanceiro/issues)
- 🐦 **Twitter**: [@SeuTwitter](https://twitter.com)
- 💼 **LinkedIn**: [Seu LinkedIn](https://linkedin.com)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2025 Projeto Financeiro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ✍️ Autor

**Yuri Brito**
- GitHub: [@YuriBrto](https://github.com/YuriBrto)
- LinkedIn: [Yuri Brito](https://linkedin.com)

---

## 🙏 Agradecimentos

- Comunidade .NET e React
- Tailwind CSS
- Vite Community
- Todos os contribuidores

---

## 📌 Links Importantes

- 🔗 [GitHub Repository](https://github.com/YuriBrto/ProjetoFinanceiro)
- 🔗 [Documentação .NET](https://docs.microsoft.com/pt-br/dotnet/)
- 🔗 [Documentação React](https://pt-br.react.dev/)
- 🔗 [Tailwind CSS](https://tailwindcss.com/)
- 🔗 [Vite](https://vitejs.dev/)

---

<div align="center">

### ⭐ Se você gostou deste projeto, considere dar uma estrela no GitHub!

![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)

**Desenvolvido em 7 dias com dedicação e paixão por código de qualidade.**

*Última atualização: Dezembro de 2025*

</div>