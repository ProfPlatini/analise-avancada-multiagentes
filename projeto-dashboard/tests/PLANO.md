# Plano de testes do dashboard da papelaria

Escopo do teste: validar a entrega do construtor em `projeto-dashboard/` contra
`papelaria_limpa.csv` e os requisitos de `AGENTS.md`. Nenhum código do
construtor será alterado por este agente.

## Oráculo independente preparado

`test_oracle.py` recalcula valor como `quantidade × preco_unitario` com
`Decimal`, agrupando por cidade e categoria. Descarta somente cópias exatas da
linha completa. Inclui um exemplo pequeno conhecido (3 vendas únicas, 7
unidades, R$ 121,00) e as referências da base limpa (180 vendas, 548 unidades,
R$ 20.059,00). Nesta preparação de rodada 02, os testes não foram executados. O oráculo não importa scripts nem
lógica do produto.

## Matriz para a rodada de execução

| Área | Verificação planejada | Evidência esperada |
|---|---|---|
| Integridade da fonte | Hash SHA-256 do `papelaria_limpa.csv` permanece igual ao hash registrado no relatório; o original `vendas_papelaria.csv` também não é alterado. | Hashes antes/depois. |
| Preparação | Conferir colunas `id_venda,data,cidade,categoria,produto,quantidade,preco_unitario,forma_pagamento,valor_venda`; tipos e datas interpretáveis; ausências; IDs únicos; nenhuma duplicata exata; categorias e pagamentos normalizados conforme a documentação. | Testes Python reproduzíveis e saída do preparador. |
| Recalculo | Executar o oráculo acima contra CSV e dados publicados; conferir total, quantidade, ticket médio e agrupamentos independentemente. Ticket médio esperado sem filtros: R$ 20.059,00 / 180. | Relatório de valores esperados/obtidos; comparação por centavos. |
| Dashboard | Conferir que indicadores, dados dos dois gráficos e tabela correspondem ao conjunto publicado, sem usar apenas os rótulos visíveis como fonte de verdade. | Inspeção de HTML/JS/dados e verificações no navegador. |
| Filtros | Testar cada filtro isolado, combinação, combinação sem correspondências e botão limpar; em cada estado confrontar indicadores, gráficos e tabela; conferir zero vendas sem divisão por zero, `NaN` ou `Infinity`. | Casos automatizados de interação e capturas/valores observados. |
| HTTP/JavaScript | Servir `site/` via HTTP local; verificar resposta e todos os recursos locais, erros de console e execução das interações. | Comando, log HTTP/console e resultado de navegador. |
| Acessibilidade e responsividade | Viewports estreito (~375 px) e desktop (~1366 px); sem overflow horizontal indevido; rótulos legíveis; filtros e limpar alcançáveis/usáveis por teclado, com foco visível e nomes acessíveis. | Testes automatizados e capturas por viewport. |
| Documentação | Confirmar que README dá comandos reais de preparar/testar/servir e identifica `site/` como pasta publicável. | Conferência do README e execução dos comandos na etapa autorizada. |

## Condições e pendências

- A execução fica aguardando o construtor declarar que scripts, site e README
  estão prontos. Não iniciar antes disso.
- O contrato dos arquivos publicados e os IDs/labels dos controles serão
  descobertos na entrega do construtor; então os testes de integração serão
  ligados aos artefatos concretos, sem pressupor implementação.
- Nenhum executável de navegador (`msedge`/`chrome`) foi encontrado no PATH na
  sondagem inicial. A disponibilidade de Playwright/Selenium ou de navegador
  instalado fora do PATH será verificada após a entrega. Se não houver browser,
  os testes de interface ficam **BLOQUEADOS/PENDENTES**, nunca aprovados.
- Skills `explore-data`, `data-visualization` e `validate-data` continuam ausentes
  em `.agents/skills/`. Foram lidas e aplicadas as alternativas existentes em
  `.opencode/skills/`: qualidade/grão/duplicatas, legibilidade/zero das barras e
  conferência independente/limitações/filtros, respectivamente.

## Atualização da preparação — rodada 02

- `test_data_contract.py`: hashes dos CSVs e resultados anteriores, esquema,
  tipos, ausências, IDs e duplicatas, correspondência **de cada campo** entre
  original e cópia limpa conforme regras, e entre cópia limpa e JSON. Hashes de
  resumo/verificação/CSVs vêm da rodada 01; hashes dos demais artefatos anteriores
  foram registrados nesta preparação (não provam preservação anterior a ela).
- `test_preparation.py`: execução do preparador em diretório temporário isolado,
  exemplo manual de R$ 121,00/3 vendas/7 unidades, reprodutibilidade e rejeição de
  12 entradas inválidas. Não escreve em scripts/site reais.
- `test_dashboard_browser.py`: Chrome headless real via Selenium, esperado obtido
  do CSV com `Decimal`, todas as células da tabela, ambos gráficos (rótulos,
  valores e proporcionalidade das barras), KPIs, **todos** os valores isolados e
  todas as combinações de filtros, vazio e limpar. Exemplo HTTP controlado com
  3 vendas testa também uma combinação vazia legítima, sem inserir opção no DOM.
  O cenário vazio defensivo adicional da base real é explicitamente artificial.
- Viewports CDP exatos de 375×812 e 1366×900: ausência de overflow da página,
  rótulos SVG não cortados, fonte efetiva mínima de 12px, controles >=40px de
  altura, alcance por Tab, foco visível, ambos filtros e limpar via teclado.
- Fixture grava screenshot, snapshots DOM, logs de console e rede de cada caso
  em `relatorios/rodada-02/evidencias/` (pode alterar com
  `DASHBOARD_EVIDENCE_DIR`). Erros JavaScript, HTTP >=400 ou requisições falhas
  provocam falha, não skip. Não há dependência de CDN ou servidor de aplicação.
- Sondagem **apenas do ambiente**, sem acessar o produto: Chrome
  155.0.8059.80 iniciou, abriu `data:text/html,<title>sondagem</title>`, leu logs
  de browser/performance e encerrou. Firefox/Edge também instalados. pytest
  9.1.1, selenium 4.51.0 e pandas 3.0.6 já disponíveis na `.venv`.
- Dependências adicionais de testes fixadas em `tests/requirements.txt`.

### Comandos para execução somente após liberação

```powershell
& .\.venv\Scripts\python.exe -m pip install -r .\projeto-dashboard\tests\requirements.txt
& .\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py
& .\.venv\Scripts\python.exe -m pytest .\projeto-dashboard\tests -v --junitxml=.\projeto-dashboard\relatorios\rodada-02\evidencias\pytest.xml
```

**Estado atual: BLOQUEADO aguardando entrega estável do construtor. Todos os
testes de produto estão PENDENTES. Nenhum resultado de aprovação é atribuído à
sondagem de ambiente ou à checagem de sintaxe dos próprios testes.**

## Correção após revisão preliminar C1/C2 — ainda sem execução

Referência: `relatorios/rodada-02/cobertura-preliminar-revisor.md`.
Os achados são lacunas dos testes, não defeitos observados no produto.

- **C1:** extraída `assert_bar_geometry`, preservando origem comum e
  proporcionalidade. Agora exige largura máxima positiva quando há total
  positivo, largura positiva para cada valor positivo e altura positiva.
  Três casos de regressão usam somente geometria sintética: rejeitam todas as
  barras zeradas e uma barra positiva zerada, e aceitam barras proporcionais
  positivas. Esses casos ainda **NÃO foram executados**.
- **C2:** `assert_output_visibility` usa Selenium `is_displayed()` e dimensões
  renderizadas positivas, não somente `textContent`. Confere três indicadores,
  contagem e ambos gráficos em todos os estados; com resultados exige tabela,
  cabeçalho, linha representativa com valores, ambos SVGs e seus rótulos/valores.
  Não exige que todas as linhas longas caibam simultaneamente na janela.
  Sem resultados exige mensagem de vazio, mensagens dos dois gráficos,
  contêiner da tabela oculto e ausência de linhas/SVGs.
- A checagem de visibilidade integra cada estado já comparado pelo oráculo,
  inclusive estado inicial e interações nos dois viewports. Não substitui os
  asserts numéricos, de geometria, fontes, corte ou overflow existentes.
- Nove regressões de navegador foram acrescentadas para ocultar tabela,
  gráficos/SVG/rótulos/valores e cada KPI: a checagem deve rejeitar a saída
  oculta. A regra CSS existe apenas no DOM da sessão e é removida em `finally`;
  nenhum arquivo do produto é modificado. Execução **PENDENTE**.
- **Inspeção visual obrigatória na execução posterior:** abrir as capturas de
  desktop e celular e registrar o que foi efetivamente examinado (corte,
  legibilidade e rolagem da tabela). Complementar com capturas da tabela e dos
  gráficos após rolagem quando necessário. Captura somente salva não é revisão
  visual realizada nem aprovação; registrar pendência/bloqueio se não examinada.
- Justificativa: fortalecer a detecção de resultados invisíveis e de barras
  sem magnitude, conforme revisão independente, sem enfraquecer critérios.
- O manifesto histórico `relatorios/rodada-02/testes-manifesto-preexecucao.json`
  é preservado. `tests/manifesto-pos-revisao.json` identifica os oito arquivos
  da versão corrigida (o próprio manifesto não integra seu hash).

Validação permitida nesta fase: leitura e análise de sintaxe dos próprios
testes com `ast.parse`, mais hashes. **Não coletar nem executar a suíte de
produto ou suas regressões até a liberação do construtor/coordenador.**

## Liberação e correção C3 — execução independente autorizada

O coordenador liberou o produto da versão de `rodada-02/construtor.md`.
As indicações anteriores de bloqueio neste plano são histórico pré-liberação.

- C3: removido o caminho Firefox e o seletor de browser. Chrome headless é
  obrigatório, como documentado no README, sem fallback que reduza cobertura.
  Console/performance nativos são ativados antes da criação da sessão; listeners
  `error`/`unhandledrejection` são instalados por CDP antes dos scripts de cada
  documento. Nenhum array é zerado depois dos KPIs. Toda navegação/interação
  normal passa pela mesma guarda de console, runtime e rede.
- Regressões controladas servem HTML isolado que produz erro síncrono,
  `console.error` ou recurso HTTP 404 antes de apresentar KPI pronto. Exigem
  evidência do erro específico e rejeição pela mesma guarda usada no produto.
  Esses erros são esperados apenas na fixture controlada, nunca ignorados nos
  casos de produto. CDP com viewports exatos 375×812/1366×900 foi restaurado.
- Capturas complementares percorrem topo, ambos gráficos à esquerda/direita e
  tabela no início, direita e fim vertical. Abertura/exame real dessas imagens
  será registrado no relatório, não inferido da existência dos PNGs.
- `test_analysis_documentation.py` confere perfil/agrupamentos com CSV/std.
  lib, definições/comandos e executa o servidor real do README na porta 8000.
- `registrar_versao.py preparar` confere os 14 hashes contra o construtor,
  executa preparar/analisar duas vezes e confere igualdade byte a byte a cada
  etapa. `conferir` registra a versão depois da suíte. Não edita scripts/site.
- Evidências independentes: `relatorios/rodada-02/evidencias-tester/`, incluindo
  stdout/JUnit próprios, manifests antes/depois, DOM, console/rede/runtime e
  capacidades do navegador. Evidências do construtor e manifestos históricos
  são preservados. O manifesto atual fica nas evidências, sem substituir os
  manifestos históricos preexecução e pós-C1/C2.

Comando de execução após registrar a preparação:

```powershell
$env:DASHBOARD_EVIDENCE_DIR = "$PWD/projeto-dashboard/relatorios/rodada-02/evidencias-tester"
& .\.venv\Scripts\python.exe .\projeto-dashboard\tests\registrar_versao.py preparar
& .\.venv\Scripts\python.exe -m pytest .\projeto-dashboard\tests -v --junitxml=./projeto-dashboard/relatorios/rodada-02/evidencias-tester/pytest-final.xml
& .\.venv\Scripts\python.exe .\projeto-dashboard\tests\registrar_versao.py conferir
```

O resultado efetivo será o de `relatorios/rodada-02/tester.md`, não uma
aprovação antecipada neste plano. Inspeção visual é de emulação em Chrome,
não de aparelho físico.
