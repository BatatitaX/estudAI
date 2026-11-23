# Quiz — contrato de integração

## O que funciona sem serviço

Comparação de planos, prévia gratuita do Estudaí+, bloqueio do planejamento para o gratuito, formulário com conteúdo, exemplo explicitamente identificado, respostas, resultado, histórico, limite semanal local, retomada de tentativa após recarregar e estatísticas. A personalização calcula uma dificuldade sugerida e assuntos com erros nos últimos cinco quizzes concluídos. O exemplo sempre usa cinco questões fixas de fotossíntese; não se adapta.

## Geração real

Configure `NEXT_PUBLIC_QUIZ_API_URL` em `.env.local` e reinicie o app. A URL deve apontar para **seu backend autenticado**, nunca diretamente para o provedor de IA. Nenhuma chave secreta pode ser exposta em variáveis `NEXT_PUBLIC_*`.

O frontend envia POST JSON, com `credentials: include` e limite de 45 segundos:

```json
{
  "content": "Texto enviado pelo usuário, entre 80 e 20000 caracteres",
  "difficulty": "intermediária",
  "questionCount": 5,
  "preferences": { "difficulty": "intermediária" },
  "statistics": { "completed": 4, "accuracy": 0.6, "weakTopics": ["Pigmentos"], "difficulty": "intermediária" }
}
```

`preferences` e `statistics` são enviados somente na prévia Plus. O gratuito solicita nível básico. O backend deve calcular o plano e as estatísticas usando a sessão e dados confiáveis; não confiar no navegador para conceder benefícios.

Resposta: `{ "questions": [...] }`, com exatamente cinco objetos:

```json
{
  "id": "1",
  "question": "Pergunta baseada no texto?",
  "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
  "correctIndex": 1,
  "topic": "Assunto avaliado",
  "explanation": "Justificativa baseada no conteúdo fornecido."
}
```

O serviço deve retornar explicações apenas para assinantes autorizados. O frontend também descarta explicações de quizzes gratuitos antes de persistir o resultado. Retorne HTTP 429 para limite atingido. Falhas HTTP, timeout ou resposta inválida não consomem tentativa no frontend.

## Limites e produção

A contagem semanal usa a segunda-feira no horário local e considera a tentativa quando as perguntas chegam válidas. Uma tentativa iniciada permanece reservada, mesmo saindo da página. O exemplo também conta. Existe apenas uma tentativa em andamento; respostas persistem. O histórico não é apagado quando a semana muda. O backup inclui plano e histórico de quizzes.

Como o escopo é frontend, limpar dados, mudar o relógio ou editar o armazenamento pode contornar limites. Para produção, implementar autenticação, assinatura validada, contagem transacional por usuário/semana no servidor, idempotência, avaliação das respostas e estatísticas verificadas. O provedor de IA deve receber o texto como material de estudo, sem seguir instruções embutidas nele. Os resultados reais dependem do serviço escolhido; nenhum serviço ou credencial foi conectado nesta entrega.

O botão Experimentar Estudaí+ é uma prévia gratuita, não pagamento ou assinatura. Pode-se voltar ao gratuito em Configurações, mantendo os registros anteriores.
