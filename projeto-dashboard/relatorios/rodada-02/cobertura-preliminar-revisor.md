# Revisão preliminar da cobertura — REVISOR

## Escopo, versão e execução

Leitura estática de `AGENTS.md` (requisitos já lidos), `tests/PLANO.md`, todos os seis módulos Python de testes/fixtures, `tests/requirements.txt` e `relatorios/rodada-02/testes-manifesto-preexecucao.json`. **Não examinei produto em alteração, não executei nem coletei a suíte, não alterei testes ou produto.**

Os **8 arquivos** do manifesto coincidem com os hashes registrados. O manifesto identifica a versão examinada; em especial `test_dashboard_browser.py` tem SHA-256 `CBEDCC45191986DDC1BEC8A8C1A04947310DC0FE58B410F4C2C6BEA5474C079B`. Não há aprovação de execução: todos os resultados de produto permanecem **PENDENTES**.

Comando efetivamente executado, somente para conferir hashes, na raiz do workspace:

```powershell
$manifest = Get-Content .\projeto-dashboard\relatorios\rodada-02\testes-manifesto-preexecucao.json -Raw | ConvertFrom-Json
$manifest | ForEach-Object { $atual = (Get-FileHash -LiteralPath $_.arquivo -Algorithm SHA256).Hash; [PSCustomObject]@{arquivo=$_.arquivo; sha256_atual=$atual; coincide=($atual -eq $_.sha256)} } | ConvertTo-Json
```

Resultado: código de saída 0, oito entradas com `coincide: true`. Outras operações: leitura de arquivos por ferramenta dedicada. Os contraexemplos abaixo são deduções estáticas, **não mutações executadas nem defeitos observados no produto**.

## Matriz de cobertura identificada

| Requisito | Cobertura estática encontrada | Estado antes da execução |
|---|---|---|
| Preservação e limpeza | `test_data_contract.py:18-98`: hashes de nove fontes/resultados, esquema, tipos, ausências, IDs, duplicatas e correspondência campo a campo bruto→limpo | Implementada; execução pendente |
| Preparação e casos conhecidos | `test_preparation.py:25-79`: cópia isolada do preparador, fonte não modificada, fixture de 3 vendas/7 unidades/R$ 121,00, repetibilidade e 12 entradas inválidas | Implementada; execução pendente |
| Oráculo independente | `test_oracle.py:13-94`: CSV, Decimal, campos primitivos, duplicata exata, exemplo manual e referências conhecidas; não importa lógica do produto | Adequado ao escopo conhecido; execução pendente |
| Dados publicados | `test_data_contract.py:101-151`: cada campo, tipos inteiros/centavos, IDs, metadados, totais e agrupamentos | Implementada; execução pendente |
| Indicadores, gráficos e tabela | `test_dashboard_browser.py:73-124`: três KPIs, ticket do subconjunto, todas as células, agrupamentos dos dois gráficos e geometria | Cobertura numérica forte; lacunas visuais C1/C2 abaixo |
| Filtros, vazio, limpar | `test_dashboard_browser.py:133-187`: todas as opções isoladas, todos os pares, vazio defensivo e vazio em fixture HTTP; limpar confere valores e restaura resultados | Implementada; execução pendente |
| HTTP e erros de JavaScript | `test_http_assets.py:6-20`; fixture de navegador `test_dashboard_browser.py:23-61`: recursos HTTP, Chrome real, console SEVERE, falhas de rede/status >=400 e recursos esperados carregados | Implementada, sem skip de indisponibilidade; execução pendente |
| Mobile/desktop e teclado | `test_dashboard_browser.py:190-236`: viewports CDP 375×812 e 1366×900, overflow, dimensão/labels dos filtros, fontes efetivas, limites SVG, Tab, outline e operação de ambos filtros/limpar por teclado | Implementada; execução e exame das evidências pendentes; C2 aplicável |
| Documentação, limitações e pasta publicável | `PLANO.md:27` reserva conferência do README e comandos, mas não existe teste de documentação nos módulos lidos | Conferência manual final ainda necessária; não tratar como executada |

### Separação correta entre fixture e dados reais

- `test_all_filter_values_pairs_empty_and_clear:155-158` declara que a base real cobre todos os pares e injeta uma opção `__vazio__` no DOM **apenas como cenário defensivo artificial**. Isso não demonstra um vazio alcançável com os filtros originais, mas não é a única cobertura de vazio.
- `test_known_example_and_natural_empty_pair:168-187` usa **dados sintéticos controlados**, servidos por HTTP mediante `conftest.py:18-29`, sem editar arquivo publicado. Santos e Livros existem individualmente na fixture, mas o par não tem registros. Seleção usa controles reais; confere zero nos indicadores, gráficos sem barras, tabela sem linhas e mensagem de vazio. Portanto, existe teste de combinação vazia legítima **dentro da fixture**, não da base real.
- Fixture de R$ 121,00 não deve aparecer em relatório como resultado da papelaria real. O teste distingue as origens e usa `meta.source = "exemplo controlado"`.

## Achados para o tester

### C1 — Média: proporcionalidade aceita gráficos integralmente zerados

**Local:** `test_dashboard_browser.py:119-124`.

**Contraexemplo reproduzível por raciocínio:** para um subconjunto com valores positivos, considere todas as barras com o mesmo `x` e `width=0`, mantendo textos/valores corretos. `longest = 0`; para cada barra, `float(value / maximum) * longest = 0`. Os asserts de largura não negativa e proporcionalidade passam. Isso permite aprovar um gráfico sem magnitude visual, embora os dados/rótulos estejam corretos.

**Esperado:** valores positivos devem produzir barras de largura efetivamente positiva e uma área de desenho utilizável. **Correção solicitada ao tester:** exigir largura máxima positiva e largura positiva para cada valor positivo (e, se pertinente ao contrato visual, limite dentro da área útil). Acrescentar um caso de regressão que demonstre rejeição de barras zeradas, sem modificar o produto entregue. Depois executar toda a cobertura afetada e atualizar manifesto/relatório.

### C2 — Média: conteúdo correto no DOM não prova exibição dos resultados

**Local:** `test_dashboard_browser.py:73-124` e `:200-212`.

**Contraexemplo reproduzível por raciocínio:** uma regra CSS hipotética `#table-wrap { display: none; }` para todos os estados mantém as linhas/células consultadas por `textContent`. Os asserts de correspondência da tabela continuam passando; a única checagem de visibilidade do contêiner é a negativa no vazio (`:160`). Outro exemplo é ocultar um gráfico com `visibility:hidden`: texto DOM, atributos geométricos e dimensões/fontes calculadas podem continuar presentes. O teste de fontes/limites SVG não substitui visibilidade.

**Esperado:** em conjuntos não vazios, indicadores, gráficos e tabela devem estar apresentados, inclusive nos dois viewports. **Correção solicitada ao tester:** incluir asserts de visibilidade dos três indicadores, ambos gráficos/SVG/rótulos e tabela/contêiner nos estados pertinentes; verificar linhas/valores representativos sem exigir que toda a tabela longa caiba simultaneamente no viewport. Manter checagens opostas no vazio. Complementar por inspeção registrada das capturas para corte/legibilidade/rolagem de tabela que os asserts não provam. Não basta salvar screenshot sem examiná-la.

**Encaminhamento de C1/C2:** tester; não há pedido de correção ao construtor, porque nenhum defeito de produto foi examinado nesta fase.

## Limites e próximos passos

- Não há evidência de enfraquecimento intencional: os relatórios antigos descrevem testes iniciais, mas não fornecem o conteúdo integral anterior para comparar cada assert. Preservar versões/manifestações futuras e justificar alterações; esta revisão não certifica uma comparação histórica inexistente.
- O plano inclui documentação e inspeção visual que ainda precisam de evidência manual ou testes adicionais. Contraste, adequação dos títulos, limitações e comandos reais serão revistos com o produto estável, sem inferir aprovação a partir dos testes existentes.
- Keyboard flow existe nos dois viewports: Tab alcança os três controles; ambos selects recebem teclas e os resultados são comparados; Enter limpa. A execução deve confirmar o comportamento real do Chrome/mobile emulado, não apenas a presença desse código.
- Depois das correções de cobertura: congelar nova versão/hashes; aguardar liberação do construtor; executar suíte completa e registrar resultados/skips/erros; só então revisar produto e evidências na mesma versão.

## Status

**REPROVADO quanto à suficiência da cobertura preliminar**, pelos pontos C1 e C2, devolvidos ao tester. Isto não significa que testes executaram e falharam nem que o produto tem esses defeitos. **Revisão final BLOQUEADA/PENDENTE** até correção/justificativa da cobertura, execução completa, aprovação do tester e entrega estável do produto. Nenhuma aprovação conjunta nesta etapa.
