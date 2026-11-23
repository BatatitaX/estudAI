# Estudaí

Plataforma web de apoio aos estudos, com ferramentas acadêmicas, organização pessoal e recursos de produtividade.

> **Estado atual:** protótipo frontend em Next.js. Esta versão permite explorar a interface e as funcionalidades implementadas no navegador. Ela **ainda não é** uma plataforma de produção baseada em microsserviços e não deve ser apresentada como se já possuísse autenticação real, persistência centralizada, pagamentos ou streaming integrado.

## Links do projeto

- **Repositório:** https://github.com/BatatitaX/estudAI
- **Arquitetura proposta e análise de aderência:** [docs/arquitetura.md](docs/arquitetura.md)
- **Relatório operacional:** [docs/relatorio-operacional.md](docs/relatorio-operacional.md)
- **Validação registrada anteriormente:** [docs/validacao.md](docs/validacao.md)
- **Contrato de integração do quiz:** [docs/quiz-integracao.md](docs/quiz-integracao.md)
- **Documento de arquitetura e especificação original do produto:** [docs/arquitetura-original.md](docs/arquitetura-original.md)

## Funcionalidades presentes no frontend

O repositório inclui páginas e componentes para ferramentas acadêmicas, painel de estudos, tarefas, matérias, notas, flashcards, Pomodoro, planejamento, recursos sociais e uma prévia do Estudaí+. O conjunto exato de recursos e seus limites deve ser conferido na interface e na documentação de validação.

### Limitações conhecidas

- Os dados da demonstração ficam no navegador; não há banco de dados de aplicação conectado nesta entrega.
- O fluxo de login/cadastro é demonstrativo, não autenticação segura de produção.
- O Estudaí+ é uma prévia, sem cobrança ou assinatura real.
- A geração de quizzes com IA depende de um backend externo autenticado que ainda precisa ser configurado.
- Não há microsserviços independentes, broker de eventos, API Gateway, pipeline de vídeo HLS/DASH ou CDN de mídia integrados no estado atual.

A arquitetura solicitada pela atividade está documentada como **arquitetura-alvo**, com as lacunas de implementação identificadas. Documentação arquitetural não substitui a implantação dos serviços.

## Tecnologias atuais

- Next.js 16 e React 19
- TypeScript
- Tailwind CSS 4
- Node.js para execução, checagem de tipos e testes

Confira as versões exatas em [package.json](package.json).

## Requisitos

- Node.js 20.9 ou superior
- npm
- Git (opcional, para clonar e contribuir)

## Executar localmente

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/BatatitaX/estudAI.git
cd estudAI
npm ci
npm run dev
```

Abra http://localhost:3000 no navegador.

No Windows PowerShell, se a política de execução bloquear `npm.ps1`, use:

```powershell
npm.cmd ci
npm.cmd run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Verificações

```bash
npm test
npm run typecheck
npm run build
```

Os testes automatizados disponíveis estão no diretório `tests/`. A documentação [docs/validacao.md](docs/validacao.md) registra uma validação anterior, datada de 22/09/2026; execute novamente os comandos acima no ambiente de entrega para confirmar o estado atual.

## Variáveis de ambiente

As integrações opcionais estão descritas em [.env.example](.env.example) e nos documentos correspondentes. Para usar configurações locais, crie um arquivo `.env.local` na raiz. **Nunca coloque chaves privadas em variáveis `NEXT_PUBLIC_*` nem envie segredos ao GitHub.**

## Documentação acadêmica

A atividade de arquitetura exige microsserviços orientados a eventos e componentes serverless para cargas elevadas. O documento [docs/arquitetura.md](docs/arquitetura.md) apresenta o esquema estrutural proposto, os domínios, os eventos, a estratégia de mídia e uma matriz que distingue o que existe do que ainda precisa ser construído.

O relatório [docs/relatorio-operacional.md](docs/relatorio-operacional.md) registra como executar e verificar a versão atual, seus limites e o link oficial do repositório para a entrega.

## Segurança e dados

Use apenas dados fictícios na demonstração. Não cadastre senhas reais nem informações pessoais sensíveis. Antes de uma implantação pública, é necessário implementar autenticação no servidor, autorização por papéis, persistência segura, validação de entrada, monitoramento, backups e controles de segurança para cada integração.

## Licença

Nenhuma licença de uso foi definida no repositório até o momento.
