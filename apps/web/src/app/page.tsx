"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  category: "Pães" | "Cafés" | "Confeitaria";
  price: number;
  accent: string;
};

const PRODUCTS: Product[] = [
  { id: "pao-frances", name: "Pão francês", description: "Forno do dia, crosta fina e miolo macio.", category: "Pães", price: 1.2, accent: "Dourado" },
  { id: "pao-integral", name: "Pão integral", description: "Fermentação lenta com grãos e fibras.", category: "Pães", price: 12.9, accent: "Centeio" },
  { id: "cafe-coado", name: "Café coado", description: "Preparo individual, servido na hora.", category: "Cafés", price: 6.5, accent: "Canela" },
  { id: "cappuccino", name: "Cappuccino", description: "Café, leite vaporizado e toque de cacau.", category: "Cafés", price: 10.9, accent: "Cacau" },
  { id: "croissant", name: "Croissant clássico", description: "Massa laminada e assada em pequenas fornadas.", category: "Confeitaria", price: 9.5, accent: "Manteiga" },
  { id: "bolo-casa", name: "Bolo da casa", description: "Fatia do dia; consulte os sabores disponíveis.", category: "Confeitaria", price: 8.9, accent: "Baunilha" },
];

const CATEGORIES = ["Todos", "Pães", "Cafés", "Confeitaria"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("Catálogo demonstrativo: nenhum pedido ou pagamento é processado nesta página.");

  const products = useMemo(
    () => PRODUCTS.filter((product) => activeCategory === "Todos" || product.category === activeCategory),
    [activeCategory],
  );

  const cartItems = PRODUCTS.filter((product) => cart[product.id]).map((product) => ({
    ...product,
    quantity: cart[product.id],
  }));
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateCart(id: string, delta: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, Math.min(20, (current[id] ?? 0) + delta));
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  function prepareDemo() {
    if (!itemCount) {
      setNotice("Adicione ao menos um item para visualizar o resumo demonstrativo.");
      return;
    }
    setNotice(`Resumo preparado com ${itemCount} item(ns), total de ${money(total)}. Esta vitrine não envia pedidos nem processa pagamentos.`);
  }

  return (
    <main>
      <a className="skip-link" href="#catalogo">Ir para o catálogo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Padaria Xodó, início">
          <span className="brand-mark" aria-hidden="true">PX</span>
          <span>Padaria <strong>Xodó</strong></span>
        </a>
        <a className="cart-status" href="#sacola" aria-label={`Sacola com ${itemCount} itens`}>
          Sacola <span>{itemCount}</span>
        </a>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">CATÁLOGO DEMONSTRATIVO</p>
          <h1 id="hero-title">Uma vitrine digital simples para uma padaria de bairro.</h1>
          <p className="hero-text">Este projeto demonstra navegação por categorias, montagem de sacola e um fluxo de resumo local, sem coleta de dados pessoais, pedido real ou pagamento.</p>
          <a className="button button-primary" href="#catalogo">Explorar produtos</a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun" />
          <div className="bread bread-one" />
          <div className="bread bread-two" />
          <div className="shelf" />
          <span className="steam steam-one" />
          <span className="steam steam-two" />
        </div>
      </section>

      <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ESCOLHA COM CALMA</p>
            <h2 id="catalog-title">Do forno para sua sacola</h2>
          </div>
          <p>Itens e preços são ilustrativos para a demonstração da interface.</p>
        </div>
        <div className="filter-row" aria-label="Filtrar produtos por categoria">
          {CATEGORIES.map((category) => (
            <button
              className={activeCategory === category ? "filter active" : "filter"}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {products.map((product) => {
            const quantity = cart[product.id] ?? 0;
            return (
              <article className="product-card" key={product.id}>
                <div className="product-art" data-accent={product.accent}><span>{product.category}</span></div>
                <div className="product-copy">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="product-bottom">
                  <strong>{money(product.price)}</strong>
                  {quantity ? (
                    <div className="quantity" aria-label={`Quantidade de ${product.name}`}>
                      <button type="button" onClick={() => updateCart(product.id, -1)} aria-label={`Remover ${product.name}`}>−</button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => updateCart(product.id, 1)} aria-label={`Adicionar mais ${product.name}`}>+</button>
                    </div>
                  ) : (
                    <button className="add-button" type="button" onClick={() => updateCart(product.id, 1)}>Adicionar</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cart-section" id="sacola" aria-labelledby="cart-title">
        <div>
          <p className="eyebrow">SACOLA LOCAL</p>
          <h2 id="cart-title">Revise seu resumo</h2>
          <p className="cart-note">A seleção existe apenas enquanto esta página está aberta. Nenhum dado é enviado a um servidor.</p>
        </div>
        <div className="cart-card">
          {cartItems.length ? (
            <ul>
              {cartItems.map((item) => <li key={item.id}><span>{item.quantity}× {item.name}</span><strong>{money(item.quantity * item.price)}</strong></li>)}
            </ul>
          ) : <p className="empty-cart">Sua sacola está vazia.</p>}
          <div className="cart-total"><span>Total demonstrativo</span><strong>{money(total)}</strong></div>
          <button className="button button-dark" type="button" onClick={prepareDemo}>Gerar resumo local</button>
        </div>
      </section>

      <p className="notice" role="status" aria-live="polite">{notice}</p>
      <footer>Padaria Xodó · interface demonstrativa para portfólio · <span data-provenance="github.com/LEVIATAD21/Padaria-xod-" /></footer>
    </main>
  );
}
