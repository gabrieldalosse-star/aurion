# Aurion V2 — Planejamento financeiro

Interface mobile-first inspirada nas **funções gerais** das capturas fornecidas (totais, saldos, tags, horizonte), sem copiar a identidade visual ou elementos proprietários do outro aplicativo. Preto e verde Aurion, símbolo V.

## Funcional no protótipo
- Saldo inicial, receitas, despesas, compras no cartão, depósitos e resgates, categorias, recorrências mensais, limites, horizonte diário para três meses, decisão de compra, meta de R$ 5 mil até 31/12/2026.
- Exportação e importação de CSV Aurion. Dados ficam **somente no localStorage do navegador**, não sincronizam entre aparelhos.
- Não há credenciais bancárias, autenticação Firebase, push, conexão Open Finance nem importação de extrato bancário real nesta versão. As regras do Firestore bloqueiam todo acesso por padrão.

## Abrir e publicar
- Abra `public/index.html` no navegador para testar (ou use servidor estático local).
- GitHub Pages: configure Pages com a pasta `public` usando workflow próprio, ou copie o conteúdo de `public` para a raiz do branch publicado. O arquivo `firebase.json` não é necessário no Pages.
- Firebase Hosting: instale `firebase-tools`, execute `firebase login`, `firebase use aurion-788d9` e `firebase deploy --only hosting`. **Não faça deploy das regras de Firestore deste protótipo sobre um banco em produção sem revisar**, pois elas bloqueiam todas as operações.
- O `firebaseConfig` fornecido anteriormente não foi embutido porque esta versão é uma demonstração local. Integração Firebase requer implementar Auth + SDK + regras restritas ao UID, não apenas colar config.

## Arquitetura proposta para Open Finance
1. Frontend (Firebase Hosting) com Google Auth, dados no Firestore por UID.
2. Cloud Functions/Run como backend seguro, Secret Manager para credenciais do provedor.
3. Pluggy ou Belvo, após contrato/consentimento, conexão do Nubank por Open Finance. Pluggy documenta cobertura de contas, cartões e investimentos; Caixinhas podem aparecer como CDB conforme o produto e o consentimento.
4. Webhook validado no servidor, sincronização idempotente por IDs de provedor, armazenamento de horário da última atualização e status pendente/confirmado.
5. Modelo de lançamentos separando conta, cartão, fatura, transferências e investimento para não duplicar despesa no pagamento da fatura.
6. Motor de previsão com lançamentos confirmados + compromissos futuros + recorrências, e FCM com consentimento e integração iOS/PWA para notificações.

**Atualização não é em tempo real garantido.** Limites do Open Finance e do provedor determinam a frequência. O preço do integrador e a viabilidade para uso pessoal devem ser confirmados antes da contratação.

**Importante:** o horizonte atual usa o saldo inicial como base e soma todos os lançamentos desde a data de referência. Compras de cartão são tratadas como compromissos na data da compra, não no pagamento da fatura. É uma simplificação deliberada e não deve ser usada como saldo bancário efetivo.
