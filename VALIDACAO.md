# Validação da entrega

## Executado

- Testes do motor financeiro: distribuição exata de centavos nas parcelas, meses curtos, confirmação, fechamento e vencimento do cartão, recorrência finita, previsão e simulação.
- Testes da fila de sincronização: agrupamento de alterações, edição durante gravação, bloqueio de sobrescrita em conflito, retenção após falha de rede e encerramento de sessão durante gravação.
- Conferência de sintaxe dos módulos.
- Teste no navegador: configuração ausente mantém a nuvem desabilitada, apresenta mensagem explícita e permite a demonstração; a demonstração abre a grade e os formulários.

## Pendente no projeto real

Não foi fornecida configuração Web de um projeto Aurion e não havia projeto com esse nome na lista da conta consultada. Nenhum projeto foi criado ou alterado. Nenhum dado financeiro foi enviado ao Firebase durante esta preparação. A validação ponta a ponta depende de configurar o app Web e publicar as regras.

Antes de usar dados reais:

1. Entre em dois dispositivos com a mesma conta, registre um lançamento de teste e confira a atualização.
2. Entre com outra conta e confirme que ela começa vazia.
3. No Rules Playground do Firestore, simule GET em `/aurionUsers/UID_A/data/main`: sem autenticação deve negar; autenticado como UID_A deve permitir; autenticado como UID_B deve negar. LIST deve ser negado.
4. Confira no aplicativo os estados “salvando”, “sincronizado” e “alterações pendentes” ao desligar e religar a conexão.
5. Faça backup antes de importar dados da versão anterior.

As regras fornecidas usam UID, chave de proprietário e revisão incremental, e negam todos os demais caminhos. O conteúdo financeiro fica em JSON validado no cliente; as regras validam a estrutura externa, o tamanho, o proprietário e a revisão, sem interpretar o JSON. As regras não foram executadas em emulador nesta preparação.
