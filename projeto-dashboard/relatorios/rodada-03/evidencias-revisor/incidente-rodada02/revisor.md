# Revisor independente — rodada 02

## Parecer

**APROVADO** para a versão atual de `projeto-dashboard/`, inclusive após a correção do favicon. Não encontrei divergência reprodutível nos cálculos, nos dados exportados, no dashboard ou nos testes. O parecer cobre a versão identificada abaixo; sem commit (workspace não é repositório Git).

## Versão examinada

Confirmei que os 14 arquivos de produto atuais coincidem com os hashes do construtor e com os manifests antes/depois do Tester; os 10 arquivos da suíte atual também coincidem com o manifest do Tester. O auditor verificou a versão antes e depois da revisão e confirmou que os arquivos de produto, testes e evidências do Tester não mudaram.

Hashes SHA-256 principais:

| Arquivo | SHA-256 |
|---|---|
| `papelaria_limpa.csv` | `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB` |
| `scripts/preparar_dados.py` | `3BC32581121E6DC83E75AA7C167A79D3A83F25D98D038F3FE6C1FF09CE7F7F3C` |
| `scripts/analisar_dados.py` | `E7ADDE2068C97F6A47D92E6F0593B76F53FA832AC40D312F1CE23ED4EEFC1F38` |
| `site/index.html` | `F2D548FFE5CB6DF23A341AE2D1D316F50761B7ADD2F5659CFC2EA251449923FD` |
| `site/styles.css` | `DC63337F8AFF8D0C5710309FB8BA718833E71632CFC69BABD87771C35EB26074` |
| `site/app.js` | `F59537B41D7021A92C5A401E86B4A1B4EB728795F1AC370A509A5AF3E74F55FB` |
| `site/favicon.ico` | `F1A385E9435ECEDA78AB966897BFB5A5202E2D37401D30F66245B302EF7F5C68` |
| `site/data/dashboard.json` | `F717799C5F61708C1D69CEE30A8631C3EA5C8AC46C8335265778FC2A16B3F291` |
| `README.md` | `56E7FD8E0E8A1323DB3DAA37BA08AA627D14FFFE9CBF4E450ECABEFF8D140ABC` |
| `tests/test_dashboard_browser.py` | `C2C448DD2E8EC7D079742E787B7AED76FFC6322E9920909757972D409588E9B9` |

A relação integral dos hashes, incluindo os demais arquivos de produto e testes, está em `evidencias-revisor/auditoria-antes.json` e `auditoria-depois.json`.

## Itens conferidos e resultados

- **Preparo e limpeza:** li os scripts e README. O preparador valida esquema, ausências, IDs únicos, data, textos, quantidade, valores monetários e a igualdade quantidade × preço; não remove linhas nem altera o CSV limpo. A regra de retirar cópias exatas, aparar espaços de cidade, padronizar categoria e preencher pagamento ausente está descrita como limpeza da atividade anterior, não como nova limpeza do dashboard. A análise reconstrói e compara essa transformação sem sobrescrever as fontes.
- **Recalculo próprio, sem importar código do produto:** li `papelaria_limpa.csv` com `csv`/`Decimal`, derivei cada valor de quantidade × preço e comparei cada registro e os centavos ao JSON. Resultado: 180 IDs únicos, 548 unidades, R$ 20.059,00, ticket de R$ 111,44. Agrupamentos recalculados: categorias — Acessórios R$ 10.517,00, Livros R$ 7.438,00, Papelaria R$ 2.104,00; cidades — Campinas R$ 8.578,00, Santos R$ 6.937,50, Sorocaba R$ 4.543,50. Soma de cada agrupamento fecha com o total. Não confundi receita bruta com lucro.
- **Dados e apresentação:** conferi campos, tipos e convenção de centavos no JSON; o HTML/CSS/JS implementa três KPIs, barras por categoria e cidade na mesma escala, tabela, filtros combinados, estado vazio e botão limpar. A leitura do JavaScript confirma que totais, gráficos e linhas vêm do mesmo recorte; valores são inseridos via `textContent`. O README fornece os comandos de preparo, análise, testes e servidor HTTP, e identifica `site/` como publicável.
- **Testes do Tester e evidências:** conferi `tester.md`, JUnit e logs. A auditoria independente confirma 44 testes, 0 falhas, 0 erros e 0 skips; 13 monitores de casos normais sem erro de runtime/console/rede e 3 fixtures controladas detectando, respectivamente, erro síncrono anterior aos KPIs, `console.error` e recurso 404. O auditor reconferiu 18 estados DOM contra linhas e dados-fonte e identificou por hash 123 arquivos de evidência. Os relatórios preservam a execução inicial da rodada 01 como histórica: ela falhou no favicon; a versão corrigida da rodada 02 contém favicon, e o log normal do Chrome mostra `favicon.ico` com HTTP 200.
- **Execução independente final:** executei da raiz do workspace:

  ```powershell
  $env:DASHBOARD_EVIDENCE_DIR = "$PWD\projeto-dashboard\relatorios\rodada-02\evidencias-revisor\execucao-01"
  & .\.venv\Scripts\python.exe -m pytest .\projeto-dashboard\tests -q --junitxml=./projeto-dashboard/relatorios/rodada-02/evidencias-revisor/pytest-execucao-01.xml
  ```

  Resultado: **44 passed em 188,08 s**, saída 0. JUnit independente em `evidencias-revisor/pytest-execucao-01.xml`; evidências da execução em `evidencias-revisor/execucao-01/`.
- **Inspeção visual independente das capturas do Tester:** abri e examinei `visual-375-topo.png`, `visual-1366-topo.png`, `visual-375-category-chart-direita.png`, `visual-375-table-wrap-direita.png` e `visual-1366-table-wrap-fim.png`. Layout, hierarquia, valores, barras e tabela estão legíveis; rolagem local no celular preserva acesso às colunas/valores, e o desktop mostra a tabela completa. Isso é emulação headless, não aparelho físico.

Comandos de auditoria de versão executados antes e depois da revisão:

```powershell
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-02\auditar_versao_revisor.py antes
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-02\auditar_versao_revisor.py depois
```

Ambos terminaram com saída 0 e registraram os resultados em `evidencias-revisor/auditoria-antes.json` e `auditoria-depois.json`.

## Problemas, encaminhamentos e pendências

- **Problemas de produto/testes:** nenhum encontrado; nenhuma correção a encaminhar ao construtor ou tester.
- **Skills:** os arquivos requeridos em `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não estão disponíveis. Não alego uso dessas skills nem de alternativas. A revisão foi feita pelo código, dados, critérios e evidências disponíveis.
- **Pendências obrigatórias:** nenhuma na entrega revisada; suíte completa, navegador, filtros, vazio/limpar, HTTP, responsividade e teclado foram executados. Publicação, aparelho físico e reconciliação financeira externa não pertencem ao escopo/teste realizado e não são alegados.
