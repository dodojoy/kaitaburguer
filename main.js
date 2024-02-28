import data from "./data.js";

const dataHamb = data;

const tabs = document.querySelector("#tabs");
const cards = document.querySelector("#cards");

let currentTab = "hamburguer";

const tabsOptions = [
  {
    name: "hambúrgueres",
    icon: "/assets/hamburguer.svg",
    activeIcon: "/assets/hamburguer-selecionado.svg",
    alt: "hambúrguer ícone",
    tipo: "hamburguer",
  },
  {
    name: "bebidas",
    icon: "/assets/bebida.svg",
    activeIcon: "/assets/bebida-selecionada.svg",
    alt: "bebida ícone",
    tipo: "bebida",
  },

  {
    name: "acompanhamentos",
    icon: "/assets/acompanhamento.svg",
    activeIcon: "/assets/acompanhamento-selecionado.svg",
    alt: "acompanhamento ícone",
    tipo: "acompanhamento",
  },
];

function printTabs() {
  const isMobile = window.innerWidth < 768;
  tabs.innerHTML = tabsOptions
    .map(
      (tab) =>
        `
    <div class="tab ${currentTab === tab.tipo ? "activeTab" : ""}" data-tab="${
          tab.tipo
        }">
        <img src="${
          tab.tipo === currentTab ? tab.activeIcon : tab.icon
        }" alt="${tab.alt}"/>
        ` +
        //` ${isMobile ? "" : `<span>${tab.name}</span>`} Optei por fazer isso por css pois a função não atualiza em tempo real, mas se for necessário arrumo um jeito de fazer funcionar
        `<span>${tab.name}</span>
        ${tab.tipo === currentTab ? `<div class="divider"></div>` : ""}
    </div>
  `
    )
    .join("");
}

function printCards() {
  cards.innerHTML = dataHamb
    .filter((item) => item.tipo === currentTab)
    .map(
      (item) =>
        `
      <div class="card">
        <img src="${item.img}" alt="${item.alt}" />
        <div class="info">
          <p class="titulo-card">${item.nome}</p>
          ${
            item.ingredientes
              ? `
          <p class="ingrediente">${item.ingredientes.join(", ")}</p>
          `
              : ""
          }
          <p class="preco">R$ ${item.preco.toFixed(2)}</p>
        </div>
      </div>
      `
    )
    .join("");
}

tabs.addEventListener("click", (event) => {
  const clickedTab = event.target.closest("[data-tab]");

  if (clickedTab) {
    currentTab = clickedTab.dataset.tab;
    printCards();
    printTabs();
  }
});

printTabs();

printCards();
