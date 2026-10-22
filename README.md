# Aurion · GitHub + Firebase

Web app estático com Firebase Authentication e Cloud Firestore. A interface e o motor financeiro estão incluídos, sem etapa de build. O Firebase ainda precisa receber a configuração do **seu projeto**; não há chaves reais pré-preenchidas neste pacote.

## Publicar no repositório aurion

1. Extraia o ZIP e envie **os arquivos de dentro** diretamente para a raiz do repositório `gabrieldalosse-star/aurion`. O `index.html` deve aparecer na raiz, ao lado de `firebase-config.js`. Não envie somente o ZIP.
2. Substitua o `Aurion.html` antigo pelo novo. Ele redireciona para `index.html`, preservando o endereço anterior. A pasta `fonte` antiga deixa de ser usada e pode permanecer até você conferir a atualização.
3. Em **Settings → Pages → Build and deployment**, use **Deploy from a branch**, branch **main**, pasta **/(root)**, e salve. Se já estiver assim, mantenha.
4. Após a publicação, o endereço é `https://gabrieldalosse-star.github.io/aurion/`.

## Ativar o Firebase uma vez

Use preferencialmente um projeto exclusivo para o Aurion. As regras deste pacote bloqueiam caminhos não usados pelo Aurion; não substitua regras de outro aplicativo sem revisar o impacto.

1. No [Console Firebase](https://console.firebase.google.com/), crie ou escolha o projeto do Aurion.
2. Em **Configurações do projeto → Geral → Seus apps**, registre um **app Web** ou abra o app Web existente.
3. Copie os campos do objeto `firebaseConfig` para `firebase-config.js`, mantendo a atribuição `window.AURION_FIREBASE_CONFIG = { ... }`. O arquivo contém os nomes de todos os campos necessários. Use exatamente o `storageBucket` retornado, sem adivinhar o sufixo.
4. Em **Authentication → Métodos de login**, ative **Google** e **Email/senha**. Para Google, confira o email de suporte solicitado pelo console.
5. Em **Authentication → Configurações → Domínios autorizados**, adicione **gabrieldalosse-star.github.io**, sem protocolo, sem `/aurion/`. Se usar domínio próprio, inclua também esse domínio.
6. Crie um **Cloud Firestore (Standard/Native)** na região escolhida. Em **Regras**, copie integralmente `firestore.rules` e publique. Não deixe o banco em modo de teste.
7. Atualize `firebase-config.js` no GitHub e aguarde a publicação. Abra o site e entre. O primeiro acesso de cada conta começa vazio; os exemplos só aparecem na demonstração.

Não é necessário Storage, Functions, chave de conta de serviço ou token administrativo para esta versão. A configuração Web identifica o projeto e é pública; as regras e a autenticação autorizam o acesso aos dados.

## Dados antigos

Se você usava a versão local no **mesmo domínio**, após entrar clique **Importar dados antigos**. O app pede confirmação antes de substituir os dados da conta conectada. O conteúdo de `aurion.v1` não é enviado automaticamente.

Se usava o arquivo HTML ou outro endereço, exporte o JSON na versão anterior e restaure em **menu → Backup e portabilidade → Restaurar backup** depois de entrar no novo site. O armazenamento do arquivo local é diferente do armazenamento do domínio GitHub Pages.

## Como funciona a sincronização

- Cada usuário autenticado acessa somente `aurionUsers/{uid}/data/main`.
- O planejamento é serializado em um campo `payload`. A versão é controlada por `revision`, e a gravação usa uma transação.
- Há um listener de um documento por sessão. As alterações rápidas são agrupadas com uma espera de 700 ms antes de gravar. Renderizar ou trocar de aba do app não grava o planejamento.
- Se outro dispositivo gravar uma revisão diferente, o app preserva a versão local e mostra um conflito. Baixe o backup e escolha carregar a versão da nuvem. Não há sobrescrita forçada automática.
- Se a conexão cair, as alterações ficam em uma cópia local por UID. Elas serão tentadas novamente ao recuperar conexão ou clicar em **Sincronizar**. O carregamento inicial exige acesso ao Firebase; isso não é um app com operação totalmente offline.
- As sessões de login duram a sessão do navegador. Cópias locais por UID podem continuar no dispositivo após sair; não compartilhe o perfil do navegador se precisar de sigilo local. Senhas não são gravadas pelo código do app.
- Há limite preventivo de 650.000 bytes de JSON por planejamento para permanecer abaixo do tamanho máximo de documento. Exporte backups regularmente.
- A demonstração tem armazenamento próprio e não é sincronizada.

## Hospedar no próprio Firebase (opcional)

O `firebase.json` já está preparado. Com a CLI oficial instalada e autenticada:

```sh
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,hosting
```

Selecione o projeto real do Aurion. O pacote não fixa um ID de projeto, para evitar implantar em um projeto errado. Para GitHub Pages basta publicar as regras no console; o índice desativado para o campo `payload` é uma otimização opcional aplicada pela CLI.

## Verificação

```sh
npm test
npm run preview
```

O servidor local usa `http://127.0.0.1:4192`. O modo demonstração funciona sem preencher a configuração. Para testar login local, autorize o domínio utilizado no Firebase.

Os testes verificam cálculos de parcelas, centavos, datas, confirmações e projeções, além da fila de sincronização, concorrência, conflitos e falha de rede. Não substituem o teste real de login e regras no projeto Firebase. Consulte `VALIDACAO.md`.

## Referências oficiais

- [Firebase Web SDK](https://firebase.google.com/docs/web/alt-setup)
- [Login Google](https://firebase.google.com/docs/auth/web/google-signin)
- [Email e senha](https://firebase.google.com/docs/auth/web/password-auth)
- [Transações Firestore](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Regras e UID](https://firebase.google.com/docs/firestore/security/rules-conditions)
- [API keys Firebase](https://firebase.google.com/docs/projects/api-keys)
- [Publicação GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Esta integração salva seus registros no Firebase. Não há Open Finance ou importação bancária automática.
