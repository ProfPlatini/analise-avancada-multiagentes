"use strict";

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const integer = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const COLORS = ["#087f78", "#499d94", "#78b9ae", "#a1d0c8", "#356d80", "#79a9b5"];

const cityFilter = document.querySelector("#city-filter");
const categoryFilter = document.querySelector("#category-filter");
const body = document.querySelector("#sales-rows");

function formatCents(cents) {
  return money.format(cents / 100);
}

function appendOptions(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function addSvgText(svg, x, y, text, className, anchor = "start") {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "text");
  node.setAttribute("x", String(x));
  node.setAttribute("y", String(y));
  node.setAttribute("class", className);
  node.setAttribute("text-anchor", anchor);
  node.textContent = text;
  svg.append(node);
  return node;
}

function drawBars(target, entries, label, scaleMax) {
  target.replaceChildren();
  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chart-empty";
    empty.textContent = "Sem vendas para exibir neste gráfico.";
    target.append(empty);
    return;
  }

  const width = 540;
  const rowHeight = 45;
  const height = Math.max(170, entries.length * rowHeight + 45);
  const labelWidth = 120;
  const valueWidth = 100;
  const barWidth = width - labelWidth - valueWidth - 18;
  const max = Math.max(scaleMax, 1);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `${label}: ${entries.map((item) => `${item.name}, ${formatCents(item.total)}`).join("; ")}`);

  entries.forEach((item, index) => {
    const y = index * rowHeight + 17;
    addSvgText(svg, labelWidth - 10, y + 15, item.name, "bar-label", "end");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(labelWidth));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(Math.max(item.total > 0 ? 2 : 0, (item.total / max) * barWidth)));
    rect.setAttribute("height", "22");
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", COLORS[index % COLORS.length]);
    svg.append(rect);
    addSvgText(svg, width - 4, y + 15, formatCents(item.total), "bar-value", "end");
  });
  const axisY = entries.length * rowHeight + 10;
  const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  axis.setAttribute("x1", String(labelWidth));
  axis.setAttribute("x2", String(labelWidth + barWidth));
  axis.setAttribute("y1", String(axisY));
  axis.setAttribute("y2", String(axisY));
  axis.setAttribute("stroke", "#607382");
  svg.append(axis);
  addSvgText(svg, labelWidth, axisY + 22, "R$ 0", "axis-label");
  addSvgText(svg, labelWidth + barWidth, axisY + 22, formatCents(max), "axis-label", "end");
  target.append(svg);
}

function groupedTotals(rows, field) {
  const totals = new Map();
  for (const row of rows) {
    totals.set(field(row), (totals.get(field(row)) || 0) + row.valor_venda_centavos);
  }
  return [...totals.entries()]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name, "pt-BR"));
}

function renderTable(rows) {
  body.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (const row of rows) {
    const tr = document.createElement("tr");
    const values = [
      new Date(`${row.data}T00:00:00`).toLocaleDateString("pt-BR"),
      row.id_venda,
      row.cidade,
      row.categoria,
      row.produto,
      integer.format(row.quantidade),
      formatCents(row.preco_unitario_centavos),
      row.forma_pagamento,
      formatCents(row.valor_venda_centavos),
    ];
    for (const value of values) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.append(td);
    }
    fragment.append(tr);
  }
  body.append(fragment);
}

function startDashboard(data) {
  const rows = data.transactions;
  document.querySelector("#period").textContent =
    `${new Date(`${data.meta.period_start}T00:00:00`).toLocaleDateString("pt-BR")} – ${new Date(`${data.meta.period_end}T00:00:00`).toLocaleDateString("pt-BR")}`;
  appendOptions(cityFilter, [...new Set(rows.map((row) => row.cidade))].sort((a, b) => a.localeCompare(b, "pt-BR")));
  appendOptions(categoryFilter, [...new Set(rows.map((row) => row.categoria))].sort((a, b) => a.localeCompare(b, "pt-BR")));

  function update() {
    const filtered = rows.filter((row) =>
      (!cityFilter.value || row.cidade === cityFilter.value) &&
      (!categoryFilter.value || row.categoria === categoryFilter.value)
    );
    const total = filtered.reduce((sum, row) => sum + row.valor_venda_centavos, 0);
    document.querySelector("#revenue-kpi").textContent = formatCents(total);
    document.querySelector("#sales-kpi").textContent = integer.format(filtered.length);
    document.querySelector("#average-kpi").textContent = formatCents(filtered.length ? total / filtered.length : 0);
    document.querySelector("#result-count").textContent = `${integer.format(filtered.length)} de ${integer.format(rows.length)} vendas exibidas`;
    document.querySelector("#empty-state").hidden = filtered.length !== 0;
    document.querySelector("#table-wrap").hidden = filtered.length === 0;
    renderTable(filtered);
    const categories = groupedTotals(filtered, (row) => row.categoria);
    const cities = groupedTotals(filtered, (row) => row.cidade);
    const scaleMax = Math.max(...categories.map((item) => item.total), ...cities.map((item) => item.total), 1);
    drawBars(document.querySelector("#category-chart"), categories, "Vendas por categoria", scaleMax);
    drawBars(document.querySelector("#city-chart"), cities, "Vendas por cidade", scaleMax);
  }

  cityFilter.addEventListener("change", update);
  categoryFilter.addEventListener("change", update);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    cityFilter.value = "";
    categoryFilter.value = "";
    update();
    cityFilter.focus();
  });
  update();
}

fetch("data/dashboard.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(startDashboard)
  .catch((error) => {
    console.error("Erro ao carregar os dados do dashboard:", error);
    document.querySelector("#load-error").hidden = false;
  });
