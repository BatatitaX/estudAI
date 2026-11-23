# 🎓 Estudaí — Documento de Arquitetura e Especificação

> **Estudaí — Seu espaço para estudar melhor, se organizar e acompanhar seu progresso.**

---

## 1. Visão do Produto

O **Estudaí** será uma plataforma web gratuita voltada para estudantes do ensino médio, técnico e superior.

A proposta não é competir diretamente com plataformas educacionais tradicionais. O Estudaí será um **canivete suíço do estudante**: um conjunto de ferramentas simples, rápidas e úteis para resolver pequenas necessidades acadêmicas.

### Objetivo principal

Criar um produto digital que:

- possa ser utilizado sem cadastro;
- atraia usuários por busca orgânica, redes sociais e compartilhamentos;
- ofereça ferramentas gratuitas;
- incentive o usuário a criar uma conta para salvar seu progresso;
- tenha potencial de monetização por anúncios;
- futuramente ofereça uma assinatura Estudaí+;
- possa incorporar inteligência artificial;
- seja escalável sem depender da venda individual para clientes.

### Princípio central

> **O usuário chega ao Estudaí para resolver uma coisa e descobre que pode resolver várias outras no mesmo lugar.**

---

# 2. Problema

Estudantes frequentemente precisam de pequenas ferramentas para:

- calcular médias;
- descobrir quanto precisam tirar em uma prova;
- organizar tarefas;
- controlar tempo de estudo;
- acompanhar provas;
- criar flashcards;
- montar cronogramas;
- revisar conteúdos;
- calcular porcentagens;
- calcular datas;
- organizar matérias.

Essas necessidades normalmente são resolvidas utilizando vários sites, calculadoras, aplicativos e planilhas diferentes.

O Estudaí pretende centralizar essas necessidades em uma única plataforma.

---

# 3. Público-Alvo

### Público principal

- estudantes do ensino médio;
- estudantes de cursos técnicos;
- estudantes universitários;
- estudantes de cursos profissionalizantes;
- pessoas estudando para provas e concursos em fases futuras.

### Público inicial recomendado

Começar focando em:

> **estudantes do ensino médio e faculdade.**

O produto pode ser expandido posteriormente.

---

# 4. Proposta de Valor

## Para o usuário

> **Ferramentas gratuitas para organizar seus estudos, aprender melhor e acompanhar seu progresso em um só lugar.**

### Diferenciais

- gratuito para começar;
- ferramentas rápidas;
- não exige cadastro para funções básicas;
- interface jovem e moderna;
- organização centralizada;
- gamificação;
- possibilidade de salvar progresso;
- futuramente, recursos de IA.

---

# 5. Modelo Geral do Produto

```text
                         ESTUDAÍ
                            │
          ┌─────────────────┼─────────────────┐
          ↓                 ↓                 ↓
      FERRAMENTAS         ESTUDOS          PROGRESSO
          │                 │                 │
       gratuito          pessoal         gamificado
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ↓
                       MONETIZAÇÃO
                  anúncios + Estudaí+
```

---

# 6. Arquitetura Geral de Navegação

```text
ESTUDAÍ
│
├── 🏠 Home
│
├── 🛠️ Ferramentas
│   │
│   ├── 📊 Calculadora de Média
│   ├── 🎯 Quanto Preciso Tirar?
│   ├── 📅 Calculadora de Datas
│   ├── ⏱️ Pomodoro
│   ├── ⏳ Contador de Provas
│   ├── 📐 Calculadoras
│   │   ├── Porcentagem
│   │   ├── Média
│   │   ├── Regra de 3
│   │   └── Conversores
│   │
│   └── 🧠 Geradores
│       ├── Flashcards
│       ├── Questões
│       └── Resumos
│
├── 📚 Meu Estudo
│   │
│   ├── Dashboard
│   ├── Matérias
│   ├── Tarefas
│   ├── Calendário
│   ├── Plano de Estudos
│   ├── Flashcards
│   └── Anotações
│
├── 📊 Meu Progresso
│   ├── Tempo estudado
│   ├── Sequência
│   ├── XP
│   ├── Conquistas
│   └── Estatísticas
│
├── 🤖 IA
│   ├── Gerar resumo
│   ├── Gerar questões
│   ├── Gerar flashcards
│   └── Explicar conteúdo
│
├── 👤 Conta
│   ├── Perfil
│   ├── Preferências
│   ├── Notificações
│   └── Assinatura
│
└── 💜 Estudaí+
    ├── Benefícios
    ├── Assinar
    └── Gerenciar assinatura
```

---

# 7. Home

A Home deve explicar o produto em poucos segundos.

## Estrutura sugerida

```text
ESTUDAÍ                         Ferramentas   Entrar

             Estudar pode ser mais fácil. 💜

       Ferramentas para organizar seus estudos,
       aprender melhor e acompanhar seu progresso.

                 [ COMEÇAR AGORA ]

-------------------------------------------------

              O que você precisa hoje?

      📊 Calcular minha média
      ⏱️ Começar Pomodoro
      📅 Organizar meus estudos
      🧠 Criar flashcards

-------------------------------------------------

              FERRAMENTAS POPULARES

   📊 Média    ⏱️ Pomodoro    📅 Datas    🧠 Cards
```

## Objetivos da Home

1. Explicar o Estudaí.
2. Apresentar as principais ferramentas.
3. Incentivar o uso sem cadastro.
4. Direcionar para ferramentas populares.
5. Incentivar cadastro depois do primeiro uso.

---

# 8. Área de Ferramentas

A área de ferramentas será um dos principais motores de aquisição orgânica.

O usuário deve poder acessar ferramentas básicas sem criar conta.

## Primeiras ferramentas

### 8.1 Calculadora de Média

Permitir:

- média simples;
- média ponderada;
- múltiplas avaliações;
- pesos diferentes;
- resultado final;
- indicação em relação à média necessária.

Exemplo:

```text
MATEMÁTICA

Nota 1: 7,5
Nota 2: 6,0
Trabalho: 8,0

[ CALCULAR ]

Média: 7,1
```

### CTA após resultado

> Quer salvar sua média? Crie sua conta gratuitamente.

---

## 8.2 Quanto Preciso Tirar?

Usuário informa:

- média necessária;
- nota atual;
- quantidade de avaliações restantes;
- pesos, quando aplicável.

Exemplo:

```text
Média necessária: 7,0
Nota atual: 5,8
Avaliações restantes: 1

Resultado:

Você precisa tirar aproximadamente 8,2
na próxima avaliação.
```

Essa ferramenta deve possuir página própria para SEO.

---

## 8.3 Pomodoro

Temporizador padrão:

```text
25:00

FOCO

[ INICIAR ]
```

Opções:

- foco;
- pausa curta;
- pausa longa;
- configurações;
- iniciar/pausar;
- reiniciar.

Usuários autenticados poderão salvar sessões.

---

## 8.4 Contador de Dias

Funções:

- dias entre duas datas;
- dias restantes para uma prova;
- dias restantes para aniversário;
- dias restantes para evento;
- data futura;
- data passada.

Exemplos de páginas:

```text
/calculadora-de-dias
/contador-de-dias
/quantos-dias-faltam
```

---

## 8.5 Calculadora de Porcentagem

Permitir:

- X% de Y;
- aumento percentual;
- desconto percentual;
- variação percentual.

---

# 9. Futuras Ferramentas

## Matemática

- regra de três;
- média;
- porcentagem;
- juros;
- conversores;
- calculadora científica simplificada.

## Organização

- cronograma;
- checklist;
- calendário;
- contador de provas;
- contador de trabalhos.

## Aprendizado

- flashcards;
- gerador de questões;
- gerador de resumos;
- revisão espaçada.

## Produtividade

- Pomodoro;
- cronômetro;
- contador de tempo estudado;
- metas diárias.

---

# 10. Dashboard

O dashboard será a área principal dos usuários autenticados.

Exemplo:

```text
Olá, estudante! 👋

Bora estudar?

--------------------------------

🔥 Sequência
7 dias

⏱️ Tempo estudado
8h 42min

✅ Tarefas
12/18

--------------------------------

PRÓXIMA PROVA

📐 Matemática Discreta

25 SET

Faltam 4 dias

[ VER PLANO ]

--------------------------------

CONTINUE ESTUDANDO

┌──────────────────┐
│ ⏱️ Pomodoro      │
│ 25 minutos       │
│                  │
│ [ COMEÇAR ]      │
└──────────────────┘
```

## Informações do dashboard

- saudação;
- streak;
- XP;
- nível;
- tempo estudado;
- tarefas pendentes;
- próxima prova;
- matérias;
- acesso rápido às ferramentas.

---

# 11. Matérias

O usuário poderá cadastrar matérias.

## Dados

```text
Nome
Cor
Descrição
Professor
Meta
```

Exemplo:

```text
Matemática Discreta
Programação Web
Estrutura de Dados
Banco de Dados
Inglês
```

Cada matéria poderá conter:

- tarefas;
- provas;
- notas;
- flashcards;
- sessões de estudo;
- anotações.

---

# 12. Tarefas

To-do focado em estudantes.

Exemplo:

```text
HOJE

☐ Fazer lista de matemática
☑ Estudar estruturas de dados
☐ Terminar trabalho de programação
☐ Revisar flashcards
```

## Dados da tarefa

- título;
- descrição;
- matéria;
- data;
- prioridade;
- status;
- data de criação;
- data de conclusão.

---

# 13. Provas

O usuário cadastra:

```text
Nome
Matéria
Data
Nota mínima
Conteúdos
```

Exemplo:

```text
MATEMÁTICA DISCRETA

📅 30/09

🎯 Nota mínima: 7,0

📚 Conteúdos:
• Relações binárias
• Fechos
• Grafos
• Lógica proposicional
```

O sistema calcula:

> Faltam 9 dias.

---

# 14. Plano de Estudos

O usuário informa:

- matérias;
- datas das provas;
- conteúdos;
- disponibilidade diária;
- tempo disponível.

O sistema poderá gerar um plano.

Exemplo:

```text
SEGUNDA

18:00 — Matemática
19:00 — Estrutura de Dados

TERÇA

18:00 — Programação
19:00 — Matemática
```

Na primeira versão, o planejamento pode utilizar regras simples.

A geração automática com IA será futura.

---

# 15. Flashcards

## Estrutura

```text
Deck
│
├── Card 1
├── Card 2
├── Card 3
└── Card 4
```

## Interface

```text
┌───────────────────────────┐
│                           │
│ O que é uma relação       │
│ binária?                  │
│                           │
│      [ REVELAR ]          │
│                           │
└───────────────────────────┘

       ← Difícil    Fácil →
```

O sistema poderá registrar:

- acerto;
- erro;
- dificuldade;
- última revisão;
- quantidade de revisões.

---

# 16. Anotações

Futuramente o usuário poderá criar notas associadas a matérias.

Exemplo:

```text
Matemática Discreta

Título:
Relações Binárias

Conteúdo:
Uma relação binária...
```

---

# 17. Gamificação

O Estudaí utilizará gamificação para aumentar retenção.

## XP

Exemplos:

```text
Completar sessão de estudo → +20 XP
Concluir tarefa → +30 XP
Responder questão → +10 XP
Completar meta diária → +50 XP
```

## Níveis

```text
NÍVEL 08

1.620 / 2.000 XP

██████████████░░
```

## Streak

```text
🔥 12 dias
```

## Conquistas

Exemplos:

- 🏆 Primeira sessão;
- 📚 10 horas estudadas;
- 🔥 7 dias seguidos;
- 🧠 100 questões;
- 🎯 5 metas concluídas;
- ⚡ 5 sessões em um dia.

---

# 18. IA

A IA não deve fazer parte do MVP inicial.

Ela será adicionada depois que o produto básico estiver validado.

## Funcionalidades futuras

### Texto → resumo

Usuário cola um conteúdo e recebe um resumo estruturado.

### Texto → flashcards

Geração automática de flashcards.

### Texto → questões

Geração de perguntas e alternativas.

### Explicação simplificada

Exemplo:

> Explique como se eu tivesse 5 anos.

### Plano de estudos

A IA poderá considerar:

- matérias;
- datas;
- dificuldade;
- tempo disponível;
- histórico de estudo.

---

# 19. Cadastro

O usuário poderá utilizar ferramentas básicas sem cadastro.

Para funcionalidades persistentes:

```text
Nome
E-mail
Senha
```

Futuramente:

> Continuar com Google.

## Estratégia

Não bloquear o visitante imediatamente.

Fluxo:

```text
Visitante
   ↓
Usa ferramenta
   ↓
Obtém resultado
   ↓
CTA: "Salvar meu resultado"
   ↓
Cadastro
   ↓
Dashboard
```

---

# 20. Monetização

O modelo de negócio será baseado em três fontes principais.

## 20.1 Publicidade

Ferramentas gratuitas poderão exibir anúncios.

Evitar:

- pop-ups excessivos;
- anúncios durante o uso de ferramentas;
- publicidade que prejudique a experiência.

Priorizar espaços naturais:

```text
Ferramenta
↓
Resultado
↓
Espaço publicitário
↓
Conteúdo relacionado
```

---

## 20.2 Estudaí+

Plano futuro:

### R$ 9,90/mês — valor inicial de referência

Possíveis benefícios:

- sem anúncios;
- estatísticas avançadas;
- recursos de IA;
- mais armazenamento;
- temas personalizados;
- funcionalidades avançadas;
- sincronização ampliada.

O preço deverá ser validado posteriormente.

---

## 20.3 Produtos digitais

Possibilidades:

- planner acadêmico;
- templates de estudo;
- packs de flashcards;
- planners digitais;
- materiais de organização;
- kits para estudantes.

---

# 21. Estratégia de SEO

SEO será uma das principais estratégias de aquisição.

O Estudaí não deve depender apenas da Home.

Cada ferramenta importante deve possuir sua própria página indexável.

## Exemplos

```text
/calculadora-media
/calculadora-media-faculdade
/calculadora-media-escolar
/quanto-preciso-tirar
/pomodoro
/contador-de-dias
/calculadora-porcentagem
/calculadora-regra-de-tres
```

## Estrutura das páginas

Cada página deverá possuir:

1. título específico;
2. descrição;
3. ferramenta;
4. resultado;
5. explicação;
6. FAQ;
7. ferramentas relacionadas;
8. CTA para cadastro.

---

# 22. Estratégia de Conteúdo

O Estudaí pode utilizar:

- Google;
- TikTok;
- Instagram;
- Pinterest;
- YouTube Shorts.

## Exemplos de conteúdos

### Vídeo 1

> "Se você está na faculdade, olha essa ferramenta."

Demonstra a calculadora de média.

### Vídeo 2

> "Descubra quanto você precisa tirar na próxima prova."

### Vídeo 3

> "3 ferramentas gratuitas que todo estudante deveria conhecer."

### Vídeo 4

> "Você está estudando sem usar Pomodoro?"

---

# 23. Funil de Aquisição

```text
                    GOOGLE
                      │
                 "calculadora
                    de média"
                      ↓
                   ESTUDAÍ
                      ↓
              Usa a ferramenta
                      ↓
               Obtém resultado
                      ↓
            "Salvar meu resultado"
                      ↓
                  Cadastro
                      ↓
                 Dashboard
                      ↓
            Outras ferramentas
                      ↓
               Retorno ao site
                      ↓
              ┌───────┴───────┐
              ↓               ↓
           Anúncios       Estudaí+
```

---

# 24. Arquitetura Técnica

## Stack recomendada

### Frontend

- Next.js;
- TypeScript;
- Tailwind CSS.

### Backend

- Supabase.

### Banco

- PostgreSQL.

### Autenticação

- Supabase Auth.

### Deploy

- Vercel.

### Analytics

- Google Analytics.

### SEO

- Google Search Console.

### Futuro

- API de IA;
- gateway de pagamento;
- plataforma de anúncios;
- PWA;
- notificações.

---

# 25. Arquitetura Técnica Geral

```text
                         VERCEL
                           │
                        Next.js
                           │
          ┌────────────────┼────────────────┐
          │                │                │
        UI/Páginas       API Routes       SEO
          │                │
          │                ↓
          │             Supabase
          │                │
          │        ┌───────┴───────┐
          │        ↓               ↓
          │    PostgreSQL         Auth
          │
          ↓
      Tailwind CSS
```

---

# 26. Banco de Dados

## users

```text
id
name
email
avatar
created_at
```

## subjects

```text
id
user_id
name
color
description
created_at
```

## tasks

```text
id
user_id
subject_id
title
description
due_date
priority
completed
created_at
```

## exams

```text
id
user_id
subject_id
name
date
minimum_grade
```

## grades

```text
id
user_id
subject_id
exam_id
grade
weight
```

## study_sessions

```text
id
user_id
subject_id
started_at
ended_at
duration
type
```

## flashcard_decks

```text
id
user_id
subject_id
title
description
```

## flashcards

```text
id
deck_id
question
answer
difficulty
```

## achievements

```text
id
name
description
icon
requirement
```

## user_achievements

```text
user_id
achievement_id
unlocked_at
```

---

# 27. Estrutura de Pastas

```text
estudai/
│
├── app/
│   ├── page.tsx
│   │
│   ├── ferramentas/
│   │   ├── page.tsx
│   │   ├── calculadora-media/
│   │   ├── quanto-preciso-tirar/
│   │   ├── pomodoro/
│   │   ├── contador-dias/
│   │   └── porcentagem/
│   │
│   ├── login/
│   ├── cadastro/
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── materias/
│   │   ├── tarefas/
│   │   ├── provas/
│   │   └── progresso/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── footer/
│   ├── cards/
│   └── tools/
│
├── lib/
│   ├── supabase/
│   ├── calculations/
│   ├── utils/
│   └── seo/
│
├── types/
│
├── public/
│   ├── icons/
│   └── images/
│
└── styles/
```

---

# 28. Identidade Visual

A identidade deve transmitir:

- juventude;
- tecnologia;
- organização;
- leveza;
- produtividade;
- acolhimento.

## Paleta inicial

| Uso | Cor |
|---|---|
| Primária | `#7C5CFC` |
| Secundária | `#A78BFA` |
| Destaque | `#FFD166` |
| Fundo | `#F8F7FC` |
| Texto | `#252238` |
| Branco | `#FFFFFF` |

## Direção visual

- cards arredondados;
- bastante espaço em branco;
- ícones simples;
- microinterações;
- elementos de gamificação;
- aparência moderna;
- responsividade mobile-first.

---

# 29. MVP — Versão 1.0

O MVP deve ser pequeno.

## Páginas

```text
1. /
2. /calculadora-media
3. /quanto-preciso-tirar
4. /pomodoro
5. /contador-de-dias
6. /calculadora-porcentagem
7. /login
8. /cadastro
9. /dashboard
```

## Funcionalidades

- Home;
- ferramentas gratuitas;
- cadastro;
- login;
- matérias;
- tarefas;
- tempo estudado;
- dashboard básico.

---

# 30. Versão 1.5

Adicionar:

- calendário;
- provas;
- flashcards;
- XP;
- streak;
- conquistas;
- estatísticas básicas.

---

# 31. Versão 2.0

Adicionar:

- IA;
- resumos;
- questões;
- flashcards automáticos;
- plano de estudos automático;
- explicação de conteúdos.

---

# 32. Versão 3.0

Adicionar:

- Estudaí+;
- pagamentos;
- anúncios;
- estatísticas avançadas;
- PWA;
- notificações;
- sincronização ampliada.

---

# 33. Roadmap de Desenvolvimento

## Sprint 1 — Fundação

- criar projeto Next.js;
- configurar TypeScript;
- configurar Tailwind;
- criar identidade visual;
- configurar Git;
- configurar Vercel;
- configurar Supabase.

## Sprint 2 — Home

- Navbar;
- Hero;
- ferramentas populares;
- seção de benefícios;
- CTA;
- Footer.

## Sprint 3 — Ferramentas

Implementar:

1. calculadora de média;
2. quanto preciso tirar;
3. Pomodoro;
4. contador de dias;
5. porcentagem.

## Sprint 4 — Autenticação

- cadastro;
- login;
- logout;
- sessão;
- proteção de rotas.

## Sprint 5 — Dashboard

- visão geral;
- matérias;
- tarefas;
- tempo estudado.

## Sprint 6 — SEO

- metadata;
- sitemap;
- robots.txt;
- páginas individuais;
- FAQ;
- conteúdo relacionado;
- Search Console.

## Sprint 7 — Lançamento

- testes;
- responsividade;
- acessibilidade;
- analytics;
- publicação;
- divulgação.

---

# 34. Estratégia de Validação

O primeiro objetivo não é ganhar dinheiro imediatamente.

O primeiro objetivo é conseguir:

> **100 usuários reais.**

Depois analisar:

- quais ferramentas recebem mais acessos;
- quais ferramentas são mais utilizadas;
- quanto tempo os usuários permanecem;
- quais páginas recebem tráfego;
- quantos usuários criam conta;
- quais funcionalidades fazem o usuário voltar.

A partir desses dados, priorizar desenvolvimento.

---

# 35. Métricas Importantes

## Aquisição

- visitantes;
- usuários novos;
- origem do tráfego;
- tráfego orgânico.

## Engajamento

- ferramentas utilizadas;
- sessões;
- tempo no site;
- páginas por sessão.

## Conversão

- cadastro;
- retorno;
- criação de matérias;
- criação de tarefas.

## Retenção

- usuários que retornam;
- streak;
- sessões semanais.

## Monetização

- receita de anúncios;
- usuários Estudaí+;
- receita média por usuário;
- conversão para plano pago.

---

# 36. Princípios de Desenvolvimento

### 1. Mobile-first

A maioria dos estudantes poderá acessar pelo celular.

### 2. Velocidade

Ferramentas precisam abrir rapidamente.

### 3. Simplicidade

Uma ferramenta deve ser compreendida sem tutorial.

### 4. Acessibilidade

- contraste adequado;
- navegação por teclado;
- labels;
- textos claros.

### 5. SEO desde o início

Não deixar SEO para depois.

### 6. Componentização

Reutilizar:

- cards;
- botões;
- inputs;
- modais;
- headers;
- tool layouts.

### 7. Segurança

- validação de dados;
- regras do Supabase;
- Row Level Security;
- proteção de rotas;
- não expor credenciais.

---

# 37. Visão de Longo Prazo

A visão futura do Estudaí é:

```text
                         ESTUDAÍ
                            │
       ┌────────────────────┼────────────────────┐
       ↓                    ↓                    ↓
   FERRAMENTAS           ESTUDOS              COMUNIDADE
       │                    │                    │
       ↓                    ↓                    ↓
 Calculadoras          Planner              Desafios
 Pomodoro              Tarefas              Rankings
 Conversores           Flashcards           Conquistas
 Geradores             Provas
       │                    │
       └────────────────────┼────────────────────┘
                            ↓
                           IA
                            │
               ┌────────────┼────────────┐
               ↓            ↓            ↓
             Resumo      Questões     Explicação
                            │
                            ↓
                       ESTUDAÍ+
                            │
                  ┌─────────┴─────────┐
                  ↓                   ↓
                Ads               Assinatura
```

---

# 38. Prioridade Absoluta

Não construir tudo de uma vez.

A primeira versão deve provar três coisas:

### 1. Pessoas encontram o Estudaí.

### 2. Pessoas usam as ferramentas.

### 3. Pessoas voltam.

Somente depois:

> escalar funcionalidades → melhorar retenção → monetizar → expandir.

---

# 39. Primeira Versão Resumida

O primeiro Estudaí será:

```text
┌─────────────────────────────┐
│          ESTUDAÍ            │
│                             │
│   Estudar pode ser fácil.   │
│                             │
│ [ Calculadora de Média ]    │
│ [ Quanto Preciso Tirar? ]   │
│ [ Pomodoro ]                │
│ [ Contador de Dias ]        │
│ [ Porcentagem ]             │
│                             │
│        [ Entrar ]           │
└─────────────────────────────┘
```

Depois:

```text
Ferramentas
     ↓
Cadastro
     ↓
Dashboard
     ↓
Matérias
     ↓
Tarefas
     ↓
Provas
     ↓
Flashcards
     ↓
Gamificação
     ↓
IA
     ↓
Estudaí+
```

---

# 40. Conceito Final

O Estudaí não deve começar como uma plataforma gigantesca.

Ele deve começar como:

> **um conjunto de ferramentas gratuitas que resolvem problemas reais de estudantes.**

Essas ferramentas atraem tráfego.

O tráfego gera usuários.

Os usuários geram dados de uso.

Os dados indicam quais funcionalidades merecem investimento.

As funcionalidades aumentam retenção.

A retenção cria oportunidades de monetização.

E, somente então, o Estudaí evolui para uma plataforma completa.

## 🌱 Estratégia

```text
FERRAMENTA
    ↓
TRÁFEGO
    ↓
USUÁRIO
    ↓
CADASTRO
    ↓
RETENÇÃO
    ↓
MONETIZAÇÃO
    ↓
ESCALA
```

**Estudaí — estudar, organizar e evoluir em um só lugar.**
