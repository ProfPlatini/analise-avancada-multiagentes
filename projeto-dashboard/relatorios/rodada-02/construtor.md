# Construtor — rodada 02

## Status e liberação

**APROVADO pelo construtor — produto estável e liberado ao tester.** Não significa aprovação conjunta: execução independente do tester e revisão final do revisor permanecem **PENDENTES**. Não houve edição de testes ou de relatórios de outros agentes. Histórico da rodada 01 e resultados anteriores preservados.

## Critérios de aceite registrados

Conforme AGENTS.md: preservar original/resultados anteriores; preparação Python/pandas reproduzível; documentar grão, limpeza, campos calculados e limites; site estático com 3 indicadores, 2 gráficos, tabela, 2 filtros sincronizados, limpar e estado vazio; valor vendido não é lucro; funcionar em computador/celular e teclado; README com preparação/testes/HTTP/pasta publicável. Testes devem conferir preservação, esquema/ausências/duplicatas, recálculo independente e exemplo conhecido, correspondência integral da apresentação, filtros, HTTP/console, viewports e teclado. Aprovação final exige os três agentes na mesma versão, sem pendências.

Entrada confirmada pelo coordenador: `papelaria_limpa.csv`, derivada de `vendas_papelaria.csv`. A auditoria preliminar independente em `fontes-revisor.md` foi lida; nenhuma divergência de fonte foi apontada nela.

## Construído e corrigido

- Novo `scripts/analisar_dados.py`: pandas para perfil completo original/limpo; ausências, cardinalidade, frequências, percentis, estatísticas, padrões textuais/IDs, cobertura diária/mensal, correlações e agrupamentos. Reconstitui limpeza documentada em memória; compara fonte limpa; recalcula valores com Decimal, confere cada valor monetário do JSON e fechamento dos subtotais. Não substitui oráculo/testes independentes.
- Novos `ANALISE.md` e `analise/perfil.json`, reproduzíveis: grão/definições, qualidade, valores, ressalvas, escolhas visuais e próximos estudos fora do escopo. Não modifica `resumo.md`, `verificacao.md` ou CSVs.
- `site/app.js`, `styles.css`, `index.html`: escala monetária compartilhada nos dois gráficos, eixo desde zero e marcações, fonte SVG efetiva legível com rolagem local no celular; fonte de dados visível. Separadas classes de eixo e categorias para manter semântica dos elementos.
- `scripts/preparar_dados.py` gera também um `site/favicon.ico` válido (ICO contendo PNG RGBA 16×16); HTML aponta ao recurso local, evitando requisição automática com 404. JSON de vendas permanece byte a byte igual à rodada 01.
- `README.md`: preparação, análise, dependências reais em `tests/requirements.txt`, Selenium/Chrome headless e HTTP local. A suíte não usa Playwright/Chromium nem Firefox; o contrato atual foi relido após atualização do tester.
- Skills ausentes no caminho `.agents/skills/`: as três. Lidas/aplicadas **as alternativas** `.opencode/skills/{explore-data,data-visualization,validate-data}/SKILL.md`, sem afirmar uso de versões ausentes.

## Comandos executados e resultados

Todos executados da raiz do workspace, usando a `.venv` existente:

```powershell
.\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py
.\.venv\Scripts\python.exe .\projeto-dashboard\scripts\analisar_dados.py
node --check .\projeto-dashboard\site\app.js
.\.venv\Scripts\python.exe -m pytest -q .\projeto-dashboard\tests
```

- Preparação executada antes e depois da inclusão do favicon: saída 0; 180 vendas, 548 unidades, 2026-01-01 a 2026-03-31, R$ 20.059,00. JSON exportado conferido e preservado.
- Análise executada duas vezes: saída 0; `ANALISE.md` e `analise/perfil.json` gerados com hashes idênticos nas duas execuções. Limpeza histórica, valores por venda, JSON e subtotais conferem. Ticket exibido R$ 111,44.
- Sintaxe JavaScript: saída 0, sem mensagens.
- Primeira execução da suíte ampliada durante a checagem do construtor: **5 failed, 21 passed, 4 errors in 49.60s**. Problemas: favicon ausente (404/console) e classe `bar-label` reutilizada indevidamente nos textos de eixo, confundindo a contagem de categorias. Foram corrigidos no produto, sem enfraquecer ou editar testes.
- Reexecução completa sobre a versão abaixo: **26 passed in 60.23s (0:01:00)**, saída 0. Inclui HTTP, preparo em diretório isolado, oráculo de dados, Chrome headless, filtros, exemplo controlado, vazio/limpar, fonte SVG sem corte e viewports 375×812/1366×900 com teclado.
- As fixtures salvaram screenshots, snapshots DOM e logs de console/rede em `relatorios/rodada-02/evidencias/`, nomes iniciados por `test_dashboard_browser.py`. São evidências desta execução do construtor; não atribuir ao tester. A execução independente poderá atualizar essas evidências conforme o plano dele. Resultado textual da suíte registrado aqui; o construtor não gerou JUnit.
- Hashes obtidos com `Get-FileHash <arquivos abaixo> -Algorithm SHA256`; fonte/limpa/resumo/verificação conferem com os hashes históricos.

## Versão final desta entrega — SHA-256

Sem commit: workspace não é repositório Git. Caminhos relativos à raiz.

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB` |
| `resumo.md` | `8FA1F216D0F26E1AA77C314D904BD5122D6ABC2AD2681D4203E4A0698F864F10` |
| `verificacao.md` | `ED6B317986271C98484C9213F4B92148141E99A3BC546B6F53E983538E6ED4CA` |
| `projeto-dashboard/scripts/preparar_dados.py` | `3BC32581121E6DC83E75AA7C167A79D3A83F25D98D038F3FE6C1FF09CE7F7F3C` |
| `projeto-dashboard/scripts/analisar_dados.py` | `E7ADDE2068C97F6A47D92E6F0593B76F53FA832AC40D312F1CE23ED4EEFC1F38` |
| `projeto-dashboard/site/index.html` | `F2D548FFE5CB6DF23A341AE2D1D316F50761B7ADD2F5659CFC2EA251449923FD` |
| `projeto-dashboard/site/styles.css` | `DC63337F8AFF8D0C5710309FB8BA718833E71632CFC69BABD87771C35EB26074` |
| `projeto-dashboard/site/app.js` | `F59537B41D7021A92C5A401E86B4A1B4EB728795F1AC370A509A5AF3E74F55FB` |
| `projeto-dashboard/site/favicon.ico` | `F1A385E9435ECEDA78AB966897BFB5A5202E2D37401D30F66245B302EF7F5C68` |
| `projeto-dashboard/site/data/dashboard.json` | `F717799C5F61708C1D69CEE30A8631C3EA5C8AC46C8335265778FC2A16B3F291` |
| `projeto-dashboard/README.md` | `56E7FD8E0E8A1323DB3DAA37BA08AA627D14FFFE9CBF4E450ECABEFF8D140ABC` |
| `projeto-dashboard/ANALISE.md` | `73E16361FA24881168F42A088D6324DECCE1361B44B83B1AA6BFE5BED202CB41` |
| `projeto-dashboard/analise/perfil.json` | `4ECA113DCAC21A7960A231B4F50B5E14A9CEF8D1AE19C689582E64B4DFE3A312` |

## Devolutiva

Nenhum defeito conhecido pendente no produto. Ao **tester**: executar a suíte completa independentemente na versão acima, registrar comando/resultado/evidências e conferir README/análise; ao **revisor**: revisar produto, testes, cobertura e evidências após aprovação do tester. Alteração posterior exige nova execução dos testes afetados e revisão final. Abertura manual fora da suíte não executada pelo construtor; publicação não realizada, fora do escopo.
