# Padaria Xodó

![Loop visual do projeto Padaria Xodó](assets/padaria-xodo-dev-loop.svg)

<p align="center">
  <img src="assets/padaria-xodo-dev-hero.png" alt="Ilustração do projeto full stack Padaria Xodó" width="100%" />
</p>

> Projeto full stack em desenvolvimento para uma experiência digital de pedidos em padaria.

## Entrega atual

Esta versão entrega uma **vitrine demonstrativa** feita com Next.js e TypeScript. Ela permite filtrar categorias, adicionar ou remover itens de uma sacola local e gerar um resumo visual sem registrar dados pessoais, enviar pedidos ou processar pagamentos.

Os produtos e preços exibidos são ilustrativos para a demonstração de interface. Uma integração comercial real exigiria backend, catálogo autorizado, autenticação, validação de estoque, fluxo de pagamento e política de privacidade próprios.

## Executar localmente

```bash
pnpm install
NODE_ENV=production pnpm --dir apps/web exec next build --webpack
pnpm --dir apps/web dev
```

## Segurança e limites

- Não há arquivos `.env`, segredos ou credenciais na interface demonstrativa.
- Não há coleta, persistência ou transmissão de dados do visitante.
- A sacola existe somente durante a sessão da página.
- O projeto inclui metadado de autoria não renderizado na interface para rastreabilidade técnica.
