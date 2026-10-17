# Adendo de revisão estática da cobertura — REVISOR

## Escopo e versão

Lidos `tests/PLANO.md`, a versão atual de `tests/test_dashboard_browser.py` e `tests/manifesto-pos-revisao.json`. Comparados os hashes dos oito arquivos com o manifesto corrigido e com os hashes da revisão anterior: somente PLANO e módulo de navegador mudaram entre os oito arquivos listados. Os outros seis mantêm a versão já examinada. Relatório preliminar preservado.

SHA-256 do módulo de navegador: `42F87B9C9BB821F9144331699069B916EFB6F2BB1A7F59CEC55A33F9A3AF27D3`.
SHA-256 de PLANO: `1A6A81AFEBDB7D6FEDAF1239A32ED4F12AE2DB218E315836387266C3BA78B9F2`.

**Não examinei produto, não executei/coletei testes e não editei produto/testes.** Somente leituras e este comando de hashes foram realizados na raiz do workspace:

```powershell
$manifest = Get-Content .\projeto-dashboard\tests\manifesto-pos-revisao.json -Raw | ConvertFrom-Json
$manifest | ForEach-Object { $atual = (Get-FileHash -LiteralPath $_.arquivo -Algorithm SHA256).Hash; [PSCustomObject]@{arquivo=$_.arquivo; sha256_atual=$atual; coincide=($atual -eq $_.sha256)} } | ConvertTo-Json
```

Resultado: código de saída 0; oito entradas com `coincide: true`.

## C1 — resolvido na implementação, execução PENDENTE

`test_dashboard_browser.py:92-107` agora exige largura máxima positiva para valores positivos, largura individual positiva para cada valor positivo e altura positiva. Mantém origem comum e proporcionalidade. O contraexemplo de todas as barras zeradas não satisfaz os novos asserts.

Há três instâncias de regressão declaradas em `:110-121`: duas devem rejeitar larguras `(0, 0)` e `(100, 0)` para valores positivos; a terceira aceita geometria proporcional positiva. São dados sintéticos de teste, não dados observados da papelaria. A rejeição/aceitação real ainda precisa ser comprovada pela execução. A altura positiva está implementada; não há regressão dedicada de altura zero, mas isso não impede o fechamento estático do achado original C1.

## C2 — resolvido na implementação, execução PENDENTE

`assert_output_visibility`, em `:124-157`, verifica existência, `is_displayed()` e área positiva dos três KPIs, contagem e dois contêineres de gráficos. Em conjuntos não vazios exige tabela/cabeçalho, ambos SVGs, rótulos/valores e uma linha representativa com valores apresentados. Não exige que todas as linhas caibam simultaneamente na tela. No vazio exige mensagens visíveis e ausência de linhas/SVGs, com tabela oculta.

A função é chamada por `assert_view_matches` (`:160-161`), inclusive no estado inicial dos dois tamanhos e após interações por teclado. Nove casos em `:221-241` ocultam saídas apenas no DOM da sessão, esperam rejeição da guarda e retiram CSS em `finally`. Mantêm os asserts numéricos e o oráculo; nenhum produto publicado é modificado por esses casos. Os contraexemplos de tabela `display:none` e gráfico `visibility:hidden` são agora explicitamente cobertos.

A inspeção de capturas permanece necessária: visibilidade e dimensão positivas não provam contraste, ausência de sobreposição ou legibilidade de toda a tabela. PLANO `:111-115` agora exige exame registrado e capturas complementares após rolagem, sem confundir screenshot salvo com revisão realizada.

## C3 — novo déficit: cobertura de erros/rede reduzida no navegador padrão

**Prioridade média; devolver ao tester.** Não é defeito observado no produto; conclusão obtida por leitura estática da mudança de testes.

- A versão anterior usava Chrome e verificava console/performance em todos os testes de navegador. A atual seleciona **Firefox por padrão** (`:27-34`). Console SEVERE, falhas de carregamento, respostas >=400 e recursos efetivamente carregados só são verificados no ramo Chrome (`:58-78`).
- `open_dashboard` faz `browser.get`, aguarda KPI e só depois instala listeners de `error`/`unhandledrejection` (`:210-218`). Assim, o array consultado no teardown não registra erros já ocorridos na inicialização. Também não captura `console.error` por si só.
- **Contraexemplo para futura regressão controlada, não executado:** uma página que primeiro produz erro JavaScript síncrono em um script e depois inicializa normalmente seus indicadores em outro script pode chegar ao estado esperado antes de os listeners serem instalados. No caminho Firefox, esse erro anterior não aparece no array nem é consultado em logs. Um recurso adicional ausente também não é coberto pelos quatro caminhos fixos de `test_http_assets.py` e não tem rastreamento de rede equivalente nesse ramo.
- **Solicitação:** garantir captura desde antes dos scripts da página e cobertura equivalente de console/rede no navegador escolhido, ou manter execução Chrome obrigatória para esse requisito e documentar/executar sua verificação completa de inicialização e interações. Acrescentar regressão controlada que demonstre rejeição de erro ocorrido antes de os KPIs ficarem prontos. Não enfraquecer a exigência de carregamento sem erros de JavaScript/recursos ausentes.
- A troca de navegador precisa de justificativa/limitações no PLANO e nos comandos. O PLANO ainda descreve Chrome real e viewport CDP exato (`:55`, `:61`), enquanto o teste atual usa `set_window_size` e verifica largura interna por intervalo (`:301-312`). Os intervalos ainda distinguem tela pequena e grande; não são, porém, evidência de viewport exato 375×812 nem de emulação mobile por CDP. Corrigir a descrição para o que for efetivamente executado, sem apresentar teste de largura responsiva como teste em aparelho real.

## Cobertura preservada e verificações futuras

Mantidas as comparações independentes de KPIs, todos os campos da tabela, dois agrupamentos/gráficos, todas as opções/pares, limpar, exemplo HTTP e vazio controlado (`:244-298`). O vazio artificial na base real continua identificado como defensivo, separado do vazio alcançável na fixture sintética de três vendas. Mantidos os fluxos de Tab, foco, selects e limpar por teclado nos dois tamanhos (`:301-349`).

Dependem de execução autorizada: coleta efetiva e contagem de casos, três regressões de geometria, nove de ocultação, comportamento Selenium/CSS, teclado e largura real do viewport, HTTP/console/rede, todos os filtros e leitura das capturas. Documentação final e produto serão examinados somente após entrega estável e evidências do tester.

## Conclusão

**C1 e C2 resolvidos na implementação estática dos testes; confirmação empírica PENDENTE.** A suficiência global da cobertura continua **REPROVADA nesta revisão estática**, agora por C3, até correção ou evidência de caminho obrigatório equivalente. Revisão final permanece **BLOQUEADA/PENDENTE** até liberação do construtor, execução completa, relatório do tester e exame da mesma versão do produto. Nenhuma aprovação do projeto ou alegação de testes passados nesta fase.
