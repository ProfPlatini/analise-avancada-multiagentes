# Tester — rodada 02

## Status

**APROVADO pelo tester.** Suíte independente completa: **44 passed**, **0
failed, 0 errors, 0 skipped**, em **177,67 s**. Todos os testes obrigatórios
foram executados, incluindo navegador e inspeção visual real. Nenhum defeito
ou teste obrigatório pendente para o construtor/tester nesta versão.

Não é aprovação conjunta: o revisor ainda deve examinar esta mesma versão e
as evidências; o coordenador registra o parecer conjunto em `FINAL.md`.

## Versão examinada e preservação

Sem commit (workspace sem Git). Produto **idêntico aos 14 SHA-256** da tabela de
`relatorios/rodada-02/construtor.md`, antes, após cada reprodução e depois da
suíte. Conferência registrada em `evidencias-tester/produto-antes.json`,
`produto-reproducao-*.json` e `produto-depois.json`.

| Manifesto/arquivo | SHA-256 |
|---|---|
| `evidencias-tester/produto-antes.json` = `produto-depois.json` | `E2C0113812FAB23271DC4CDAF2C76B6C47627034A72149D557CBE0B504554452` |
| `evidencias-tester/testes-antes.json` = `testes-depois.json` | `7CC6629C3ACFD3963FBA79FF5F458B7CD80ED5A73B1194F46F346DF6CBB2A7B1` |
| `tests/test_dashboard_browser.py` executado | `C2C448DD2E8EC7D079742E787B7AED76FFC6322E9920909757972D409588E9B9` |
| `evidencias-tester/pytest-execucao-01.xml` | `1AB1A6E4099C9B2B02772D4E521E3EB0BACCAD860CB9694181B4B3546BCA60D0` |

Os manifests de testes listam os 10 arquivos atuais (8 Python incluindo o
registrador, requirements e PLANO) e coincidem antes/depois. Preservados:
rodada 01, manifestos históricos pré-correção e pós-C1/C2, relatórios de outros
agentes e todas as evidências do construtor em `rodada-02/evidencias/`.
Os testes também conferiram hashes de nove fontes/resultados anteriores,
incluindo CSVs, resumo, verificação, scripts e PNGs anteriores.

## Alterações legítimas dos testes e achados C1/C2/C3

- **C1:** exige largura positiva para totais positivos, altura positiva,
  origem comum e proporcionalidade. Duas regressões rejeitaram larguras
  zeradas; uma aceitou barras positivas proporcionais: **3 passed**.
- **C2:** visibilidade/dimensões reais de KPIs, contagem, ambos gráficos/SVGs,
  seus rótulos/valores e tabela/linha representativa. Checagens inversas no
  vazio. **9 regressões passed**, ocultando saídas somente no DOM da sessão,
  com restauração em `finally`, sem editar arquivos do produto.
- **C3:** retirado Firefox default/fallback e restaurado **Chrome obrigatório**,
  conforme README e escopo original. Logs nativos browser/performance ativos
  desde a criação da sessão; listeners CDP instalados antes dos scripts de
  cada documento, sem zerar erros após KPI pronto. Restaurados viewports CDP
  exatos, sem aceitar intervalos de largura como substituto.
- **3 regressões C3 passed:** página HTML controlada gera erro síncrono,
  `console.error` ou recurso 404 antes do KPI e depois apresenta KPI pronto.
  Cada caso comprovou o erro específico e a rejeição pela **mesma guarda** de
  runtime/console/rede usada nos casos normais. Os SEVERE nesses três logs são
  evidência intencional da regressão, não erros do dashboard aceitos.
- Acrescentadas capturas após rolagem, verificações independentes do perfil,
  documentação e execução do servidor real do README. Justificativas em
  `tests/PLANO.md`. Nenhum assert foi removido para acomodar defeito de produto.

## Comandos executados e resultados

Da raiz do workspace, PowerShell; `.venv` existente. Python **3.15.0**, pandas
**3.0.6**, pytest **9.1.1**, Selenium **4.51.0**, Chrome **155.0.8059.80**,
ChromeDriver **155.0.8059.84**. Capacidades reais em `execucao-01/*-browser.json`.

```powershell
& .\.venv\Scripts\python.exe -m pip install -r .\projeto-dashboard\tests\requirements.txt
$env:DASHBOARD_EVIDENCE_DIR = "$PWD/projeto-dashboard/relatorios/rodada-02/evidencias-tester"
& .\.venv\Scripts\python.exe .\projeto-dashboard\tests\registrar_versao.py preparar
$env:DASHBOARD_EVIDENCE_DIR = "$PWD/projeto-dashboard/relatorios/rodada-02/evidencias-tester/execucao-01"
& .\.venv\Scripts\python.exe -m pytest .\projeto-dashboard\tests -v --junitxml=./projeto-dashboard/relatorios/rodada-02/evidencias-tester/pytest-execucao-01.xml 2>&1 | Tee-Object -FilePath .\projeto-dashboard\relatorios\rodada-02\evidencias-tester\pytest-execucao-01.log
$env:DASHBOARD_EVIDENCE_DIR = "$PWD/projeto-dashboard/relatorios/rodada-02/evidencias-tester"
& .\.venv\Scripts\python.exe .\projeto-dashboard\tests\registrar_versao.py conferir
& .\.venv\Scripts\python.exe -m pip install pandas 2>&1 | Tee-Object -FilePath .\projeto-dashboard\relatorios\rodada-02\evidencias-tester\dependencia-pandas.log
node --check .\projeto-dashboard\site\app.js
```

- Dependências já satisfeitas; não foi necessária instalação/troca de browser.
- `registrar_versao.py preparar` executou **duas vezes cada comando real**:
  `.venv/Scripts/python.exe projeto-dashboard/scripts/preparar_dados.py` e
  `.venv/Scripts/python.exe projeto-dashboard/scripts/analisar_dados.py`.
  Quatro retornos 0; saídas/hash do produto invariantes. stdout/stderr e comandos
  completos em `evidencias-tester/preparacao-analise-comandos.json`.
- Suíte coletou/executou **44 casos**: log e JUnit acima, **todos passed**.
  Esta é a primeira e final execução independente desta versão corrigida;
  não houve falha exigindo correção/reexecução. Os 26 testes citados pelo
  construtor não foram usados como evidência do tester.
- `node --check`: saída 0, sem mensagens. README, ANALISE e scripts foram lidos.
  O teste de documentação executou também o comando real `python -m http.server
  8000 --directory projeto-dashboard/site`, conferiu bytes do HTML servido e
  encerrou apenas o processo criado: `execucao-01/readme-http-server.log`.

## Cobertura e resultados conferidos

| Área | Evidência/resultado executado |
|---|---|
| Preservação/limpeza/schema | Hashes, 182→180 por somente 2 duplicatas exatas, IDs V0010/V0020; cada campo bruto→limpo e limpo→JSON, tipos/datas/ausências; rejeição de 12 entradas inválidas em preparador isolado. |
| Cálculos independentes | CSV/std. lib/Decimal sem importar produto: 180 vendas, 548 unidades, R$ 20.059,00, ticket R$ 111,44; ambos agrupamentos e cada valor por venda. Exemplo conhecido separado: 3 vendas/7 unidades/R$ 121,00. Perfil/agrupamentos analíticos conferidos independentemente. |
| Apresentação/filtros | Três KPIs, todas as nove células por linha e ambos gráficos (rótulos, valores, barras), todas as opções isoladas e nove pares cidade×categoria. Limpar restaura conjunto completo. |
| Vazio | Zero nos KPIs, mensagens visíveis, tabela oculta/sem linhas e gráficos sem SVGs/barras; sem NaN/Infinity. Fixture HTTP com Santos×Livros vazio legítimo dentro do exemplo. Opção artificial na base real é apenas teste defensivo adicional. |
| HTTP/JS | HTML/CSS/JS/JSON/favicon HTTP 200; 13 casos normais de navegador com console sem SEVERE, runtime sem erros, recursos esperados carregados e sem falhas de rede. Logs desde inicialização até interações em `execucao-01/*-{console,network,runtime-errors}.json`. |
| Responsividade/teclado | Viewports CDP 375×812 e 1366×900, sem overflow da página, fonte SVG efetiva >=12px e sem corte no desenho, controles >=40px, Tab/foco visível, ambos filtros e limpar por teclado. |
| Inspeção visual/documentação | **16 PNGs abertos e examinados**, incluindo início/direita/fim da tabela e ambos gráficos. Detalhes, nomes e observações em `evidencias-tester/INSPECAO-VISUAL.md`. Comandos, definições, limitações e pasta publicável conferidos. |

## Devolutiva e abertura

Ao **revisor**: revisar a versão dos manifests atuais, C1/C2/C3 executados,
JUnit/logs e inspeção visual. Ao construtor: **nenhuma correção solicitada**.
Escopo não inclui hospedagem, aparelho físico nem reconciliação financeira
externa; não são testes obrigatórios pendentes nem prova de lucro/completude.

Para abrir da raiz: `.\.venv\Scripts\python.exe -m http.server 8000 --directory
.\projeto-dashboard\site`, acessar `http://localhost:8000`. A pasta publicável
é `projeto-dashboard/site/`. Não foi realizada publicação.
