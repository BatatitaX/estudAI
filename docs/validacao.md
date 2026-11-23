# Validação da entrega

Verificação realizada em 22/09/2026.

## Compilação e fórmulas

- Build de produção Next.js: concluído, incluindo checagem TypeScript e geração das rotas.
- Testes das fórmulas: 5 grupos aprovados (`npm test`).
- Média simples e ponderada; notas e pesos inválidos.
- Nota necessária, múltiplas avaliações e nota impossível.
- Datas iguais, invertidas, ano bissexto, transição de horário e datas inválidas.
- Porcentagem, aumento, desconto, variação e divisor zero.

## Navegador

Navegação automatizada em Chromium sobre o build de produção local.

- 28 telas principais responderam com HTTP 200 em desktop (1440 px) e celular (390 px).
- Sem excesso de largura da página nessas duas resoluções.
- Home e painel com dados de demonstração inspecionados visualmente.
- Navegação móvel e troca de tela pelo menu lateral.
- Tema escuro persistido entre telas.
- Saída da sessão demonstrativa e redirecionamento do painel para login.
- Cadastro de perfil novo com espaço vazio.
- Matéria criada e nota adicionada pela interface.
- Tarefa criada, persistida após recarregar, concluída, editada e excluída com confirmação.
- Média calculada e resultado salvo.
- Nota necessária calculada (5,8 atual, meta 7: resultado 8,2).
- Flashcard revelado e avaliado, avançando ao próximo cartão.
- Pomodoro ativo mantido ao navegar; pausa e retomada disponíveis.
- Recuperação de sessão vencida ao recarregar; sem duplicação ao recarregar novamente. O teste antecipou o horário final no armazenamento para simular o tempo transcorrido.
- Plano semanal por regras gerado com cinco blocos.
- Backup JSON exportado e reimportado com confirmação.

## Limites da verificação

Não foram testados serviços de backend: eles não fazem parte desta entrega. Autenticação, envio de e-mail, IA, pagamentos, sincronização e notificações do sistema não estão integrados. A verificação responsiva não equivale a uma auditoria completa de acessibilidade nem a testes em todos os navegadores e dispositivos.

Os testes de interface foram executados durante a produção do projeto; os testes automatizados distribuídos no diretório `tests` cobrem as fórmulas.
