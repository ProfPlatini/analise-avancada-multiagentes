# Inspeção visual efetivamente realizada pelo tester

Versão: produto liberado em `rodada-02/construtor.md`, conferido pelos manifests
`produto-antes.json` e `produto-depois.json` (idênticos). Capturas desta execução
independente: `execucao-01/`. Foram **abertas e examinadas por ferramenta de
leitura de imagens**, não apenas salvas, todas as 16 imagens abaixo.

| Capturas examinadas (prefixo `execucao-01/`) | Observação visual |
|---|---|
| `visual-375-topo.png` | Título, período, limpar e selects legíveis; foco laranja visível em Cidade; cards empilhados com R$ 20.059,00, 180 e R$ 111,44. O restante do terceiro card continua abaixo da janela, como esperado em página vertical. |
| `visual-1366-topo.png` | Três cards lado a lado, ambos filtros, limpar, período e dois gráficos; valores completos e sem sobreposição; categorias e cidades identificáveis. |
| `visual-375-category-chart-inicio.png`, `visual-375-category-chart-direita.png` | Nomes Acessórios/Livros/Papelaria à esquerda; na posição direita, R$ 10.517,00 / R$ 7.438,00 / R$ 2.104,00 legíveis. Barras horizontais positivas; eixo começa em R$ 0; rolagem local permite alcançar valores sem alargar a página. |
| `visual-375-city-chart-inicio.png`, `visual-375-city-chart-direita.png` | Campinas/Santos/Sorocaba à esquerda; à direita R$ 8.578,00 / R$ 6.937,50 / R$ 4.543,50. Escala final comum R$ 10.517,00. Rótulos não sobrepostos. |
| `visual-1366-category-chart-inicio.png`, `visual-1366-category-chart-direita.png`, `visual-1366-city-chart-inicio.png`, `visual-1366-city-chart-direita.png` | Dois gráficos inteiros cabem lado a lado; rótulos e moeda legíveis; nenhum deslocamento horizontal necessário. Essas capturas são visualmente repetidas porque não há overflow local no desktop, não porque se deixou de executar a rolagem. |
| `visual-375-table-wrap-inicio.png` | Início da tabela apresenta data/ID/cidade; cabeçalho e linhas legíveis; barra horizontal local visível. As colunas à direita continuam fora da janela até rolar, conforme documentado. |
| `visual-375-table-wrap-direita.png` | Rolagem alcança pagamento e valor vendido, incluindo R$ 168,00 / R$ 220,00 nas primeiras vendas. Uma coluna parcialmente visível na borda esquerda é efeito normal da posição de rolagem, não perda de dados. |
| `visual-375-table-wrap-fim.png` | Rolagem vertical alcança últimas linhas e último valor R$ 44,00; cabeçalho permanece fixo. Nota de fonte/receita não lucro legível abaixo da tabela. |
| `visual-1366-table-wrap-inicio.png`, `visual-1366-table-wrap-direita.png` | Todas as nove colunas cabem; datas, IDs, produtos, quantidades, preços, pagamentos e valores alinhados e legíveis. Nenhuma rolagem horizontal necessária. |
| `visual-1366-table-wrap-fim.png` | Última venda V0180, 31/03/2026, Campinas, Estojo, 2 unidades, preço R$ 22,00, Cartão, valor R$ 44,00. Cabeçalho fixo e barra vertical no fim; nota inferior não cobre os dados. |

As posições são comprovadas também em `execucao-01/visual-*-rolagem.json`:

- Celular: gráficos largura útil 321px / conteúdo 540px, `scrollLeft=219`;
  tabela largura útil 319px / conteúdo 922px, `scrollLeft=603`.
- Desktop: gráficos 566px e tabela 1177px sem overflow horizontal.
- Ambos: tabela altura útil 538px / conteúdo 7238px, `scrollTop=6700` no fim.

**Resultado da inspeção:** sem defeito visual bloqueante observado no escopo
computador/celular solicitado. Os cortes de borda em uma janela de conteúdo
rolável são intencionais e reversíveis por rolagem; não se exige mostrar todas
as colunas ou 180 vendas ao mesmo tempo. Sem alegação de teste em aparelho
físico, leitor de tela ou auditoria completa WCAG: trata-se de Chrome headless
com emulação CDP exata 375×812 e 1366×900, mais interação real por teclado.
