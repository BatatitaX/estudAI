# Relatório operacional — Estudaí

**Projeto:** Estudaí — plataforma de apoio aos estudos  
**Repositório oficial:** https://github.com/BatatitaX/estudAI  
**Data do relatório:** 23/11/2026  
**Finalidade:** registrar a forma de execução, verificações disponíveis, estado atual e limitações da entrega acadêmica.

## 1. Identificação e objetivo

O Estudaí é uma aplicação web voltada a estudantes, reunindo ferramentas acadêmicas e recursos de organização e produtividade. A entrega versionada neste repositório utiliza Next.js, React e TypeScript.

## 2. Estado operacional verificado por inspeção do repositório

O repositório contém código de frontend, configurações de projeto, testes automatizados e documentos de integração/validação. O arquivo `package.json` define scripts para desenvolvimento, build, checagem de tipos e testes.

Esta inspeção foi realizada nos arquivos versionados. Os comandos de build e testes não foram executados como parte desta inspeção remota; portanto, este relatório não afirma que uma execução nova tenha sido aprovada em 23/11/2026.

A documentação [validacao.md](validacao.md) registra uma validação anterior, datada de 22/09/2026, com build, testes de fórmulas e verificações de interface. Essa evidência é histórica e deve ser repetida no ambiente de entrega antes da apresentação final.

## 3. Requisitos de execução

- Node.js 20.9 ou superior.
- npm.
- Navegador moderno.

## 4. Procedimento operacional

### Instalação e execução de desenvolvimento

```bash
git clone https://github.com/BatatitaX/estudAI.git
cd estudAI
npm ci
npm run dev
```

Acessar http://localhost:3000.

No Windows PowerShell, caso `npm.ps1` seja bloqueado:

```powershell
npm.cmd ci
npm.cmd run dev
```

### Verificações antes da entrega

```bash
npm test
npm run typecheck
npm run build
```

Critérios esperados: comandos finalizam com código de saída zero, sem falhas de testes, erros de TypeScript ou erros de build. Registrar a data e os resultados reais da execução no relatório após rodar os comandos localmente.

### Execução de produção local

```bash
npm run build
npm start
```

## 5. Dados e configuração

A versão atual funciona como protótipo frontend e usa dados no navegador. Não há banco de dados de aplicação conectado nesta entrega. As integrações opcionais e suas variáveis estão descritas em [.env.example](../.env.example) e na [documentação de integração do quiz](quiz-integracao.md).

Não incluir segredos no repositório. Usar apenas dados fictícios durante a demonstração.

## 6. Limitações e riscos conhecidos

1. Login e cadastro não equivalem a autenticação de produção; a autorização segura precisa ocorrer no servidor.
2. Não há persistência centralizada de usuários, cursos ou progresso.
3. Estudaí+ é uma prévia sem pagamento ou assinatura real.
4. Geração real de quizzes com IA exige um backend autenticado configurado separadamente.
5. Não foram identificados serviços de microsserviços independentes, broker de eventos, API Gateway, bancos de servidor, infraestrutura serverless ou pipeline de vídeo HLS/DASH/CDN integrados.
6. A validação histórica não substitui testes atuais no ambiente final nem uma auditoria completa de segurança, acessibilidade, carga e compatibilidade.

Por essas razões, o sistema deve ser descrito como protótipo funcional de frontend, não como uma plataforma EaD pronta para operação comercial.

## 7. Arquitetura exigida pela disciplina

A arquitetura-alvo com microsserviços orientados a eventos, estratégia serverless, tecnologias por camada e pipeline de mídia está descrita em [arquitetura.md](arquitetura.md). O documento separa explicitamente os componentes propostos dos que estão presentes no repositório atual.

A implementação dessa arquitetura exige desenvolvimento e implantação adicionais; sua documentação isolada não comprova funcionamento dos serviços.

## 8. Checklist de liberação da entrega

- [ ] Executar `npm ci`.
- [ ] Executar `npm test` e registrar o resultado.
- [ ] Executar `npm run typecheck` e registrar o resultado.
- [ ] Executar `npm run build` e registrar o resultado.
- [ ] Abrir a aplicação e demonstrar os principais fluxos.
- [ ] Revisar se não há arquivos `.env`, tokens, senhas ou outros segredos versionados.
- [ ] Conferir o README e os links de documentação no GitHub.
- [ ] Se a avaliação exigir a arquitetura de microsserviços em funcionamento, implementar e testar os serviços, broker, persistência, gateway, serverless e pipeline de mídia antes de declarar conformidade.

## 9. Link oficial para o relatório da disciplina

**Repositório GitHub:** https://github.com/BatatitaX/estudAI

**Documentação arquitetural:** https://github.com/BatatitaX/estudAI/blob/main/docs/arquitetura.md

**Relatório operacional:** https://github.com/BatatitaX/estudAI/blob/main/docs/relatorio-operacional.md
