# Atualização de planos e cadastro

- Plano de estudos movido para Estudaí+, com bloqueio da rota no plano gratuito e preservação dos blocos anteriores.
- Quizzes gratuitos: três tentativas por semana, sem explicação das respostas.
- Quizzes Plus: tentativas ilimitadas, explicações e personalização baseada nas preferências e nos últimos cinco resultados.
- Tela com conteúdo do usuário, carregamento, erros, exemplo identificado, respostas, resultado, histórico e retomada.
- Cadastro com Senha e Confirmar senha; divergências impedem prosseguir.
- Remoção de termos de implementação dos textos da interface, mantendo os limites da apresentação em linguagem simples.
- Busca com uma única borda e compatibilidade com o tema próprio do app por meio de darkreader-lock no HTML inicial.
- Tema claro/escuro também disponível no cabeçalho das páginas públicas.

A assinatura é uma prévia gratuita. A geração real depende do serviço descrito em `quiz-integracao.md`. O exemplo não usa IA. A autenticação permanece ilustrativa, conforme o escopo de frontend.

## Validação

- Build Next.js com checagem TypeScript aprovado.
- Nove testes de fórmulas, semana, estatísticas e contrato de geração aprovados.
- Navegador: confirmação de senha, bloqueio do planejamento no gratuito, três tentativas, persistência ao recarregar, ausência de explicações gratuitas, quarta tentativa Plus e explicações Plus aprovados.
- Testes do contrato de IA usam respostas simuladas: não validam um provedor real.
- Teste de interface com serviço simulado confirmou o envio do conteúdo, dificuldade adaptativa e estatísticas Plus.
- Telas de planos, cadastro, quiz e planejamento verificadas em 1366 px e 390 px, sem excesso de largura.
- Sem erros de console no fluxo final de desenvolvimento.
- Persistência ajustada para gravar o estado antes da próxima pintura, preservando o resultado ao recarregar imediatamente.
