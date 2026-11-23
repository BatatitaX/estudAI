# Espaços de publicidade

Esta entrega inclui apenas reservas visuais brancas, identificadas como Publicidade. Nenhum script, cookie ou pedido ao Google é executado. Os espaços aparecem somente no plano gratuito. O componente central remove todos os espaços no Estudaí+, inclusive nas páginas públicas durante o uso nesse navegador.

## Posicionamentos

- `home-middle`: entre ferramentas e benefícios na página inicial.
- `home-bottom`: entre benefícios e chamada final na página inicial.
- `tools-directory`: depois do catálogo de ferramentas.
- `tool-bottom`: depois do conteúdo das calculadoras e conversores.
- `dashboard-top` e `dashboard-bottom`: antes e depois do conteúdo nas páginas de visão geral, matérias, tarefas, provas, calendário, plano e progresso.

Login, cadastro, recuperação, perfil, configurações, planos comerciais, páginas institucionais, quiz, revisão de flashcards e Pomodoro não recebem espaços. Os blocos são parte do fluxo da página, sem sobreposições ou anúncios fixos junto dos botões. Os tamanhos reservados se adaptam ao celular.

## Integração futura com Google AdSense

1. Cadastrar e aprovar o domínio na conta AdSense.
2. Criar unidades de display manuais e associar seus IDs reais aos posicionamentos acima. O atributo `data-ad-placement` é interno, não um ID de anúncio do Google.
3. Substituir o conteúdo de `AdSlot` pela unidade oficial. Carregar o script uma única vez; inicializar cada unidade montada uma única vez, considerando a navegação do Next.js. Não atualizar anúncios em mudanças do cronômetro ou estado de estudo.
4. Usar o publisher ID e os slot IDs reais; não inserir IDs fictícios ou chaves privadas. Configurar o ads.txt com os dados fornecidos pela conta, quando solicitado.
5. Antes de veicular, configurar as opções de privacidade e consentimento aplicáveis ao público e atualizar a política de privacidade. Se forem habilitados anúncios automáticos, revisar exclusões para preservar as telas sem anúncios e evitar inserções duplicadas.
6. Validar tamanhos, ausência de sobreposição e navegação em desktop e celular no domínio aprovado. Não clicar nos próprios anúncios.

O ZIP não ativa monetização: a aprovação da conta, a configuração e a entrega de anúncios dependem do Google.

Referências oficiais:
- https://support.google.com/adsense/answer/1346295?hl=pt-BR
- https://support.google.com/adsense/answer/9183363?hl=pt-BR
