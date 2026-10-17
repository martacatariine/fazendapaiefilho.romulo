# Fazenda Pai e Filho

Sistema de gestão da fazenda: uva enviada à cooperativa, prestação de contas (PC) da Valexfruit, notas e custos (com importação de XML de NF-e), estoque de embalagens e insumos, produção por embaladeira, pulverização por tratorista, financeiro com baixa de pagamentos e conciliação bancária (OFX), relatórios em PDF e Excel, e backup.

- **Endereço:** https://martacatariine.github.io/fazendapaiefilho.romulo/
- **Banco de dados e login:** Firebase (Authentication + Firestore), projeto exclusivo da fazenda.
- **No celular:** abra o endereço e instale como app.
  - **Android:** no Chrome, use o menu ⋮ → *Instalar app* (ou *Adicionar à tela inicial*).
  - **iPhone:** no Safari, use Compartilhar → *Adicionar à Tela de Início*.
- **Sem internet:** o que for lançado fica guardado no aparelho e sobe sozinho quando a conexão volta.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O sistema inteiro |
| `config.js` | Dados do projeto Firebase (não são senha) |
| `firestore.rules` | Regras de segurança: quem lê e quem grava. Devem ser coladas no Firebase |
| `manifest.webmanifest`, `sw.js`, `icons/` | Instalação como app e funcionamento sem internet |

## Configuração (uma vez só)

1. No **Firebase**, crie o projeto e ative **Authentication → E-mail/senha** e o **Firestore** (região `southamerica-east1`, modo de produção).
2. Em **Firestore → Regras**, cole o conteúdo de `firestore.rules` e clique em **Publicar**.
3. Em **Authentication → Configurações → Domínios autorizados**, confira se `martacatariine.github.io` está na lista e adicione se não estiver.
4. Preencha o `config.js` com o `firebaseConfig` do app Web do projeto.
5. No **GitHub**, ative **Settings → Pages → Deploy from a branch → main / (root)**.
6. Abra o endereço. Na primeira vez, o sistema pede para criar o **primeiro administrador**. Isso só acontece uma vez.

## Perfis

- **Administrador:** lança, edita, exclui e cadastra usuários.
- **Visualizador:** só consulta.

A trava não depende só da tela: as regras do Firestore recusam no servidor qualquer gravação de quem não é administrador.

## Trazer os dados do sistema antigo (link do Claude)

1. No sistema antigo, vá em **Ajustes → Baixar backup completo**.
2. No sistema novo, vá em **Ajustes → Restaurar de um backup** e escolha o arquivo.

Usuários e senhas não entram no backup e devem ser cadastrados de novo no sistema novo.
