# REVISOR — rodada 03: incidente de rastreabilidade e novo aceite

## Parecer vigente

**APROVADO para a mesma versão de produto/testes**, com base em **nova execução independente integral**, em caminho exclusivo desta rodada: **44 passed em 167,79 s; 0 falhas, 0 erros, 0 skips**, saída 0. JUnit conferido estruturalmente: 44 casos distintos e nenhum nó de falha/erro/skip.

Este documento corrige a rastreabilidade do parecer da rodada 02, **sem substituir ou alterar aquele relatório/evidências**. A referência válida do revisor para a consolidação final passa a ser a execução da rodada 03 abaixo. Não houve edição de produto, testes, fontes ou resultados anteriores.

## Incidente investigado — causa constatada e limites

A coordenação identificou corretamente que os hashes declarados no parecer anterior deixaram de corresponder aos arquivos presentes. Confirmei:

| Evidência da rodada 02 | Hash declarado no relatório antigo | Hash encontrado na investigação |
|---|---|---|
| `evidencias-revisor/pytest-execucao-01.xml` | `807721EB1FFAAE3FEB8E9C89A0E6E7A977157A786A23700FDE66840CAA943F38` | `2B9F2500215A900367CDFF3EB8FD7700E824FD5F23E51A4224F8539804D3DFF7` |
| `evidencias-revisor/auditoria-depois.json` | `62163DBDB484AD1502469477A60233C83DA5B9745550E5BC99C6C4565C910E12` | `5A614270768037C1945976403FFF4A507C299D85DD50688CC6007C5CC8CBCAC7` |

**Houve atualização posterior não registrada no relatório.** Os metadados observados sustentam esta sequência (UTC em 17/10/2026):

1. Log antigo criado às **15:31:19.070** e terminado às **15:34:27.765**; seu texto continua indicando **44 passed in 188.60s**.
2. Relatório antigo gravado às **15:35:49.559**.
3. XML atual gravado às **15:36:31.176**. Seu próprio JUnit informa início às **12:33:23.330609-03:00**, equivalente a **15:33:23 UTC**, e duração **187,846 s**. Isso é compatível com término às 15:36:31, não com o encerramento do log preservado às 15:34:27.
4. `auditoria-depois.json` gravada às **15:36:36.718**, depois do XML e do relatório. Ela já contém o hash atual `2B9F...` e os atributos desse XML; o relatório continuou apontando aos hashes anteriores.

**Causa imediata da falha do aceite:** regravação dos caminhos de evidência depois de sua identificação no parecer, com mistura de log/relatório anteriores e XML/auditoria posteriores. Os tempos internos são compatíveis com uma segunda execução sobre o mesmo destino, seguida de atualização da auditoria, não documentada naquele parecer. Não é apenas troca de CRLF/LF/BOM: conferi essas variantes do XML e nenhuma recupera o hash declarado `807721...`.

**Limite da investigação:** não há, no histórico de ferramentas desta sessão, um segundo comando registrado que explique essa geração posterior. Os arquivos não identificam autor/processo/comando exato. Portanto, **não atribuo autoria nem afirmo ter recuperado a execução original**. Os bytes correspondentes ao hash `807721...` não foram encontrados entre os XMLs disponíveis. O XML atual também possui 44/0/0/0, mas isso não o torna retroativamente a evidência citada no relatório antigo.

Não escondi essa lacuna mediante simples alteração de hash. A evidência antiga inconsistente fica **retirada como fundamento do aceite vigente**; a nova execução controlada resolve a exigência de resultado reproduzível na versão aprovada. A identificação forense de quem regravou os arquivos permanece indeterminada, explicitamente, sem impedir a validação independente agora refeita.

## Preservação e prevenção de nova colisão

- Antes de executar qualquer teste, copiei **byte a byte**, com criação exclusiva, relatório antigo, XML/log e auditorias antes/depois para `evidencias-revisor/incidente-rodada02/`. Registrei hashes, tamanhos e horários em `evidencias-revisor/auditoria-antes.json`.
- Inventariei os arquivos das evidências antigas do revisor e da execução 01 do tester, manifestos e relatórios relevantes. A verificação posterior exige que **nenhum desses arquivos da rodada 02 tenha mudado** durante a rodada 03.
- A nova execução usa `evidencias-revisor/execucao-20261017-rastreabilidade-01/`, criado com erro se já existir. Não reutiliza `rodada-02/` nem sobrescreve XML/log anteriores.
- Auxiliar desta rodada cria auditorias e snapshots com modo exclusivo `x`/`xb`. `manifesto-final.json` também foi criado exclusivamente; **não reexecutar geração nesse destino**. Uma execução futura deve usar outro diretório/identificador.
- `conferir_aceite_revisor.py` é somente leitura: não gera novos hashes de referência nem atualiza evidências para fazer a conferência passar. Confere o manifesto, versão atual, histórico antigo e JUnit novo.

## Versão final examinada

Sem commit Git. Os **14 arquivos de produto** coincidem com a tabela de `rodada-02/construtor.md` e os manifestos antes/depois do tester. Os **10 arquivos de testes** coincidem com `rodada-02/evidencias-tester/testes-depois.json`; antes e depois desta execução mantêm os mesmos SHA-256. Nenhuma alteração de suíte exige execução adicional pelo tester.

Os caminhos e hashes completos estão em `evidencias-revisor/auditoria-{antes,depois}.json`, chave `versao`. Principais referências, inalteradas:

- `site/app.js`: `F59537B41D7021A92C5A401E86B4A1B4EB728795F1AC370A509A5AF3E74F55FB`.
- `site/data/dashboard.json`: `F717799C5F61708C1D69CEE30A8631C3EA5C8AC46C8335265778FC2A16B3F291`.
- `tests/test_dashboard_browser.py`: `C2C448DD2E8EC7D079742E787B7AED76FFC6322E9920909757972D409588E9B9`.
- JUnit do tester da rodada 02: `1AB1A6E4099C9B2B02772D4E521E3EB0BACCAD860CB9694181B4B3546BCA60D0`, preservado.

Os três primeiros caminhos são relativos a `projeto-dashboard/`. Fontes, README, ANALISE, perfil, preparador, análise, HTML/CSS/favicon também conferem nos manifestos completos. A leitura de metodologia/código/documentação e o recálculo independente da rodada anterior permanecem aplicáveis por igualdade de hashes, não por confiança no XML inconsistente.

## Nova execução e evidências válidas

Todos os caminhos abaixo são relativos a `projeto-dashboard/relatorios/rodada-03/`:

| Arquivo | SHA-256 |
|---|---|
| `evidencias-revisor/execucao-20261017-rastreabilidade-01/pytest.xml` | `06AFB4579057E846AC7D570FAD0970773661D7C6796CA6AE15B7975EFC2A9F1C` |
| `evidencias-revisor/execucao-20261017-rastreabilidade-01/pytest.log` | `4EA5FDC4C0E96C4A742DDA881E0625F64930F62FF5C46017394BDB0527C22049` |
| `evidencias-revisor/auditoria-antes.json` | `03492D618D2EF09832CADA3F628424E77DC5E909B54DC7D66024728E3C34CA53` |
| `evidencias-revisor/auditoria-depois.json` | `05724E8BAD29110B50252CDC3928216340274603CD5BBDA15B648EE163AB00EF` |
| `evidencias-revisor/manifesto-final.json` | `B89FCFFAD1B7869FEFF61B96F89BF5974A24E560AAE7DF9AB14B72EF1834376B` |

O manifesto sela **126 arquivos**: snapshots do incidente, auditorias, evidências novas de navegador, XML/log e os dois auxiliares Python desta rodada. Não contém o próprio manifesto nem este relatório, evitando autorreferência. O hash do manifesto acima é a referência externa para a coordenação.

Comandos efetivamente executados da raiz, PowerShell:

```powershell
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-03\auditar_rastreabilidade_revisor.py antes
New-Item -ItemType Directory -Path .\projeto-dashboard\relatorios\rodada-03\evidencias-revisor\execucao-20261017-rastreabilidade-01 -ErrorAction Stop | Out-Null
$env:DASHBOARD_EVIDENCE_DIR = "$PWD/projeto-dashboard/relatorios/rodada-03/evidencias-revisor/execucao-20261017-rastreabilidade-01"
& .\.venv\Scripts\python.exe -m pytest .\projeto-dashboard\tests -v --junitxml=./projeto-dashboard/relatorios/rodada-03/evidencias-revisor/execucao-20261017-rastreabilidade-01/pytest.xml 2>&1 | Tee-Object -FilePath .\projeto-dashboard\relatorios\rodada-03\evidencias-revisor\execucao-20261017-rastreabilidade-01\pytest.log
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-03\auditar_rastreabilidade_revisor.py depois
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-03\conferir_aceite_revisor.py
```

Todos com saída 0. Entre a auditoria posterior e a conferência de aceite, um comando Python de biblioteca padrão listou os arquivos de evidência/auxiliares, calculou SHA-256 e criou `manifesto-final.json` em modo `x`. Nenhuma ferramenta antiga que escreve em rodada 02 foi reexecutada.

Investigação inicial: leituras dos relatórios/XML/auditoria e do conferidor da coordenação; `Get-Item ... | Select-Object FullName,Length,CreationTimeUtc,LastWriteTimeUtc | ConvertTo-Json`; leitura do log com `Get-Content ... -Encoding Unicode | Select-Object -Last 7`; cálculo somente leitura de hashes/variantes de terminação/BOM e conversão dos horários para UTC com Python. Metadados e cópias relevantes ficaram no snapshot; o comando de investigação não modificou os arquivos.

Resultado do novo conferidor: **APROVADO: 126 arquivos selados; versão 14 produto/10 testes; histórico rodada 02 preservado; JUnit rodada 03 = 44/0/0/0.**

## Revisão da mesma versão após nova execução

- Reexecutadas preservação/limpeza/tipos/ausências/duplicatas, recálculo independente, exemplo conhecido, dados publicados e perfil/documentação.
- Reexecutados três indicadores, dois gráficos e todas as células da tabela, cada filtro isolado, nove combinações, limpar e vazio. Fixture sintética de 3 vendas/R$ 121,00 continua separada dos dados reais de **180 vendas, 548 unidades, R$ 20.059,00 e ticket R$ 111,44**.
- C1: três regressões de geometria passaram. C2: nove regressões de ocultação passaram. C3: três regressões pré-KPI passaram; erros intencionais aceitos somente como rejeição esperada nas fixtures, não no dashboard. Guardas reais de console/runtime/rede passaram nos casos normais.
- HTTP real, comando do servidor README, viewports CDP exatos 375×812 e 1366×900, teclado/foco e legibilidade passaram novamente.
- **Abri e examinei nesta rodada** as quatro novas imagens `visual-375-topo.png`, `visual-1366-topo.png`, `visual-375-table-wrap-fim.png` e `visual-1366-table-wrap-fim.png` no diretório exclusivo. KPIs/controles legíveis, gráficos desktop coerentes, tabela rolada até o fim e R$ 44,00 final, sem defeito visual bloqueante. A revisão das 16 imagens do tester já realizada continua aplicável e seus arquivos foram preservados. Não se trata de mera existência de screenshots.

## Devolutiva e pendências

**Nenhuma pendência obrigatória de produto/testes na versão atual.** A falha de rastreabilidade do aceite anterior foi tratada preservando o incidente e substituindo o fundamento da aprovação por execução nova, íntegra e verificável; não por alteração silenciosa dos hashes antigos. Autoria/comando da regravação histórica continuam indeterminados, sem alegação de resolução forense.

Ao coordenador: use **este parecer, o novo XML e o manifesto da rodada 03** na consolidação. O conferidor histórico da rodada 02 continuará falhando corretamente contra seu hash antigo; **não o alterei**. Pode executar o novo `conferir_aceite_revisor.py` para conferir a referência atual sem sobrescrever nada. Não reutilizar destinos de execução: qualquer nova rodada precisa de outro diretório e relatório.

Mantidos os limites declarados: validação local, emulação Chrome/CDP, sem aparelho físico, auditoria WCAG integral, reconciliação financeira externa ou publicação. Para abrir, da raiz: `.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site`, depois `http://localhost:8000`.
