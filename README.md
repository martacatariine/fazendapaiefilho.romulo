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

## Romaneios

Na aba **Romaneios** ficam três telas:

- **Entrada da fruta:** cada carga que entra no packing: sequência, emissão, tipo, produtor/fazenda, atividade, setor, válvula, contentor, rastreabilidade (gerada sozinha) e os produtos (ex.: VITORIA VITACE, LINA, EXTRA 5KG) com quantidade e kg. O saldo em kg baixa quando a rastreabilidade é usada num romaneio; o status fica EM ABERTO ou BAIXADO.
- **Romaneios:** cada carga com *Geral* (data de emissão, tipo Pallet ou Caixa, cliente/cooperativa, pedido, observação e quem lançou), *Produtos do romaneio* e *Deduções do romaneio*. O **Valor total** já sai com as deduções descontadas. Dá para imprimir cada romaneio em PDF e, se quiser, lançar o valor como conta a receber no Financeiro.
- **Clientes / Cooperativas:** cadastro com importação da **CNH digital** (pessoa física) ou do **Cartão CNPJ** (pessoa jurídica) em PDF, e busca do CNPJ na Receita.
- **Deduções Compra/Venda:** cadastro das deduções (Alimentação, Batedor, Caixa Extra, Caixa Lina, Caixa Valex, Caixa Vitace, Colheita, Embalação, Fiscal Colheita, Fiscal de Embalação e outras), com cálculo por caixa, valor fixo ou % dos produtos.

## Packing

Na aba **Packing** fica o grupo **PACKING PAI E FILHO** com o cadastro **Atividade do Packing** (COLHEITA, EMBALAGEM e outras): + Novo, lápis para editar, lixeira para excluir, pesquisa e Imprimir.

## Perfis

- **Administrador:** lança, edita, exclui e cadastra usuários.
- **Leitor QR:** só registra as caixas no packing (aba Leitor QR).
- **Visualizador:** só consulta.

## Leitor QR do packing

1. Em **Cadastros → Equipe**, cadastre as embaladeiras e gere as **etiquetas numeradas** e os **crachás** em PDF.
2. No celular, abra o site, entre com um usuário **Leitor QR** (ou administrador) e vá em **Leitor QR**.
3. Toque em **Ler com a câmera do celular** e aponte para a etiqueta. Cada etiqueta numerada conta uma caixa uma única vez.
4. Também funciona com leitor tipo pistola (USB/Bluetooth) ou por foto.

A trava não depende só da tela: as regras do Firestore recusam no servidor qualquer gravação de quem não é administrador.

## Trazer os dados do sistema antigo (link do Claude)

1. No sistema antigo, vá em **Ajustes → Baixar backup completo**.
2. No sistema novo, vá em **Ajustes → Restaurar de um backup** e escolha o arquivo.

Usuários e senhas não entram no backup e devem ser cadastrados de novo no sistema novo.
