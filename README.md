# AURION — Finanças pessoais

## Entrega
Interface responsiva profissional, meta de R$ 5.000 até 31/12/2026, registro de entradas, despesas, depósitos e resgates, limites por categoria, simulador de compras e exportação CSV.

**Estado atual:** funciona em modo local no navegador (localStorage). Os arquivos Firebase são um ponto de partida para a próxima etapa. **Ainda não há autenticação, gravação Firestore, integração Nubank, notificações ou sincronização entre aparelhos.** Não use o app como extrato bancário real.

## Testar
Abra `public/index.html` no navegador. Para publicar, crie um projeto no Firebase, instale Firebase CLI e execute `firebase login`, `firebase use --add` e `firebase deploy --only hosting`. Isso publica somente o site; os dados continuarão locais.

## Firebase
O arquivo `firestore.rules` bloqueia todo acesso até trocar `SEU_UID_AQUI` pelo UID real do usuário no Firebase Authentication. As regras são restritivas por padrão, mas **não há integração Firestore no frontend ainda**. Não publique regras permissivas.

## Próximas integrações
1. Google Auth + Firestore para sincronização privada entre dispositivos.
2. Provedor Open Finance autorizado e com cobertura Nubank comprovada; webhooks validados no backend.
3. Alertas de compras e resumo às 22h30 via push, após configurar permissões e tokens.
4. Previsões com faturas, recorrências e contas futuras; categorização inteligente.

Nunca coloque tokens bancários, chaves privadas ou credenciais no GitHub.

## Identidade Aurion
Nome do produto: **Aurion** (com U). Assinatura visual: **V** romano estilizado em verde, mantendo o restante da identidade original verde-escuro. Não usar temática greco-romana na interface.
