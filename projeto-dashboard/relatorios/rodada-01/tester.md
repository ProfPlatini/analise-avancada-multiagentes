# Tester — rodada 01 (registro atualizado)

## Versões examinadas

Workspace sem Git/commit. Este relatório preserva a passagem original de
planejamento e registra o teste da versão inicial, além do reteste após as
correções da rodada 02. Os estados não devem ser confundidos: a falha da versão
01 foi corrigida na versão 02.

### Versão 01 — produto entregue pelo construtor

Hashes SHA-256 registrados antes das correções da rodada 02:

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB` |
| `projeto-dashboard/scripts/preparar_dados.py` | `BF80A448B0369E1FC9A2489D13A2A4F1DF239B957DC5B14978AB2AFC5104B238` |
| `projeto-dashboard/site/index.html` | `48035A78FADEAB9B02B7B6FD4022611495860FBAFD31E43DC18E4930FA2097FF` |
| `projeto-dashboard/site/styles.css` | `6FB10906AB6CA91B63DE3169C508B59B9A194CA85A6B3B96908C9BC2117C467D` |
| `projeto-dashboard/site/app.js` | `5BE1C780D18E6173BB0BA9D6834D88204ED1E340D4FFB4898C603509B6025770` |
| `projeto-dashboard/site/data/dashboard.json` | `F717799C5F61708C1D69CEE30A8631C3EA5C8AC46C8335265778FC2A16B3F291` |
| `projeto-dashboard/README.md` | `23B5A6E5C8BEABCDDB9A89633468602773225272F938832D2D1660B793F0AB50` |

Os testes R1 foram preparados em `tests/` sem editar scripts, site ou README.
Na última execução da suíte R1, os hashes dos testes eram: `test_oracle.py`
`352443C83FB02662BEFA724E9D0256E2042472B26D2314EA92D4FC7ED0F98838`,
`test_data_contract.py`
`F540D13AD114C1CF28ABBC783241EEE834005DCD2B4511E917B4F0B6F4237C6E`,
`test_http_assets.py`
`25C52BBE434C71D9B9848F74E713938E87EDAAD93D9FA13989433814E5E4D6BC`,
`test_dashboard_browser.py`
`B75C166A3E5BF8DB9C80D38E6AAB770A971788CFDAE813D855D5344A06802257` e
`conftest.py`
`E88C83384982EA0508FEB3894C8E1114EEFD83E6F0EA6C786CE5B778199EF6E5`.
Esses testes foram ampliados depois; os arquivos atuais e respectivos hashes
estão registrados no relatório `rodada-02/tester.md` e em
`rodada-02/evidencias-tester/`.

## Construído e conferido

- Oráculo de recálculo com `Decimal`, exemplo pequeno conhecido e conferência
  de totais/agrupamentos sem importar a lógica do produto.
- Testes de integridade dos CSVs, tipos, nulos, duplicatas, JSON preparado,
  indicadores, gráficos, tabela, filtros, HTTP e interação real no navegador.
- `papelaria_limpa.csv` tem 180 linhas e nove colunas; valores de referência:
  548 unidades, R$ 20.059,00 vendidos, ticket médio R$ 111,44. O original e a
  cópia limpa permaneceram preservados.
- Skills `.agents/skills/explore-data/SKILL.md`,
  `.agents/skills/data-visualization/SKILL.md` e
  `.agents/skills/validate-data/SKILL.md` não foram encontradas; não afirmo tê-las
  usado.

## Comandos, evidências e falha da versão 01

Ambiente: `.venv` existente; pytest 9.1.1 e Selenium 4.51.0 instalados para os
testes. Firefox estava instalado; posteriormente a suíte coordenada adotou o
Chrome headless descrito no README. Não havia Playwright instalado nem foi usado.

1. `& .\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py`
   — saída 0; 180 vendas, 548 unidades, 2026-01-01 a 2026-03-31,
   R$ 20.059,00.
2. `& .\.venv\Scripts\python.exe -m pytest -q .\projeto-dashboard\tests`
   — depois de corrigidos erros do próprio teste (helper monetário e constante
   de tecla do Selenium), resultado final na versão 01: **1 failed, 10 passed**.
   A falha era `test_site_assets_load_over_http`: HTTP `GET /favicon.ico`
   retornava 404. Firefox também registrou a solicitação automática do favicon
   ausente. A suíte e a interação dos filtros passaram nos demais casos.
3. Devolutiva enviada ao **Construtor**: servir um favicon local (ou impedir a
   requisição implícita sem recurso ausente) e tornar reprodutível a instalação
   do Selenium nos comandos de teste do README.

A saída detalhada do pytest R1 e a resposta HTTP 404 ficaram no terminal da
execução; não foi salvo log bruto separado nessa primeira versão. A falha não
foi tratada como aprovada nem ocultada.

## Reteste após correções — versão 02

O construtor adicionou `site/favicon.ico` válido, passou a gerá-lo no preparo e
atualizou os comandos/documentação de dependências Selenium/Chrome. Os hashes
da versão atual e as evidências completas estão em
`relatorios/rodada-02/construtor.md` e `relatorios/rodada-02/tester.md`.

Execução independente registrada nesta sessão:

```powershell
$env:DASHBOARD_EVIDENCE_DIR = '.\projeto-dashboard\relatorios\rodada-02\evidencias-tester\execucao-02'
& .\.venv\Scripts\python.exe -m pytest -q .\projeto-dashboard\tests
```

Resultado: **44 passed em 177,26 s**, saída 0. Os hashes dos arquivos de
produto e teste foram conferidos antes/depois da execução, sem diferenças. O
Chrome headless real foi iniciado pelo Selenium; as capacidades/logs estão em
`rodada-02/evidencias-tester/execucao-02/`. A suíte conferiu HTTP/JS/rede,
visibilidade de KPIs/gráficos/tabela, filtros, exemplo controlado, vazio,
teclado, viewports e preservação. Não houve falha pendente para o Construtor na
versão 02.

Também foram executados:

```powershell
& .\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py
& .\.venv\Scripts\python.exe .\projeto-dashboard\scripts\analisar_dados.py
node --check .\projeto-dashboard\site\app.js
```

Todos terminaram com saída 0; o preparador confirmou 180 vendas, 548 unidades
e R$ 20.059,00; a análise fechou valores/subtotais do JSON; JavaScript sem erro
de sintaxe. O relatório de rodada 02 documenta ainda JUnit, logs HTTP, hashes,
screenshots inspecionados e a suíte independente de 44 casos.

## Status

- **Versão 01: REPROVADO** — 1 teste obrigatório falhou por favicon 404; o
  defeito foi encaminhado ao Construtor.
- **Versão 02: APROVADO pelo Tester** — 44 testes passaram nesta execução e
  também estão registrados em `rodada-02/tester.md`. Esta aprovação não substitui
  a revisão independente nem a aprovação conjunta do coordenador.
