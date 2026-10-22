# Aurion

Web app de organização financeira pessoal com horizonte diário e mensal, simulação de compras, diário, recorrências, parcelas, contas, cartões, metas, relatórios, backup JSON e exportação CSV.

## Executar

Abra `dist/index.html` em um navegador moderno ou execute `node preview.cjs` e abra http://127.0.0.1:4186. Para hospedar, publique o conteúdo de `dist/` em um serviço de arquivos estáticos (GitHub Pages, Firebase Hosting ou equivalente). Sem build ou dependências obrigatórias. A fonte Google Fonts é opcional e tem fallback local.

## Dados

O primeiro acesso usa demonstração fictícia. Use “Começar com meus dados” para zerar. Os dados ficam no localStorage do navegador, separados por origem e dispositivo. Use Configurações > Baixar backup regularmente. Não há backend, autenticação própria, sincronização, Open Finance, integração bancária, notificações em segundo plano ou aconselhamento automatizado. A proteção privada do endereço hospedado, quando disponível, é fornecida pelo Sites.

## Cálculos

Valores são inteiros em centavos. Parcelas distribuem o resto entre as primeiras parcelas, preservando o total. Recorrências mantêm o dia original, limitado ao último dia de meses curtos. O saldo confirmado inclui somente ocorrências marcadas como concluídas até hoje, desde a data inicial. O saldo projetado inclui também pendências. Compra no cartão afeta caixa no vencimento; no próprio dia do fechamento entra no próximo ciclo. Quando vencimento é menor ou igual ao fechamento, o vencimento ocorre no mês seguinte ao fechamento. Nenhuma API bancária valida essa convenção: ajuste o cadastro conforme seu cartão.

Previsão diária é gasto adicional ainda não lançado, aplicado a partir de hoje inclusive; não afeta o saldo confirmado. Evite cadastrar a mesma despesa na previsão diária e em um lançamento. A projeção depende dos dados informados, sem juros, inflação ou rendimentos implícitos. Metas são acompanhamento separado, sem movimentação automática do caixa. Edição/exclusão de recorrência afeta toda a série; para preservar o passado, encerre a recorrência e cadastre outra.

## Validação

`node test.cjs` verifica distribuição de centavos, meses curtos, confirmação, fechamento/vencimento, recorrência finita, previsão diária e simulação.

## Referências pesquisadas

- https://apps.apple.com/br/app/app-do-breno/id6751369081 — descrição oficial de diário, saldo futuro, cartões e economias.
- https://planilhadobreno.com.br/app-do-breno/ — apresentação oficial.
- https://www.youtube.com/watch?v=2wBRoff0E9A — demonstração pública examinada visualmente em 7:17, 10:56, 12:46 e 14:35. A segunda interface reproduz a organização visível: grade, colunas por tipo, meses lado a lado, menu compacto e cálculos mensais.

Implementação independente com marca Aurion. A interface foi reconstruída a partir dos quadros públicos observados. Equivalência integral de telas e regras internas não foi verificada.


