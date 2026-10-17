# Coordenação — retomada, rodada 02

## Entrada e escopo

Continuação do projeto existente solicitada pelo usuário conforme `AGENTS.md`.
Entrada confirmada pelo histórico: `papelaria_limpa.csv`, derivada de
`vendas_papelaria.csv`. Não se trata de escolher uma nova base.
Preservar CSVs, resultados anteriores e relatórios da rodada 01.

Três subagentes reais: construtor (produto/documentação), tester (testes e
evidências), revisor (revisão independente). Correções de produto retornam ao
construtor, testes ao tester; sem edição concorrente dos mesmos arquivos.

## Critérios de aprovação registrados antes da conclusão

- Preparação reproduzível com Python/pandas e regras de limpeza, grão,
  cálculos e limitações documentados; nenhuma alteração dos CSVs originais.
- Site estático com valor vendido, quantidade de vendas e ticket médio,
  dois gráficos, tabela, filtros por cidade e categoria sincronizados,
  limpar filtros e resultado vazio sem `NaN`/divisão por zero.
- Valores em reais e texto claro; uso em computador/celular e por teclado.
- Testes executados de integridade, tipos, ausências, duplicatas, cálculos
  independentes, exemplo conhecido, correspondência DOM/dados, filtros,
  HTTP, JavaScript e interação real em navegador nos dois tamanhos.
- README com comandos efetivamente verificados e pasta publicável `site/`.
- Suíte completa final aprovada, sem pendências, e aprovação dos três agentes
  referente aos mesmos hashes de produto/testes. Falta de recurso é bloqueio,
  não aprovação.

As skills exigidas estão ausentes nos caminhos `.agents/skills/`. Foram
encontradas e lidas em `.opencode/skills/`, e essas versões alternativas são
as orientações utilizadas nesta retomada. O histórico não será reescrito.

## Preservação: SHA-256 no início da retomada

Comando: `Get-FileHash -Algorithm SHA256 -Path AGENTS.md,vendas_papelaria.csv,papelaria_limpa.csv,resumo.md,verificacao.md,limpar.py,perfil.py,graficos.py,categorias.png,cidades.png`.

| Arquivo | SHA-256 |
| --- | --- |
| AGENTS.md | E1D8B7C4BC6463F53BF2383C12803BE5C90CB5F50F7106E908A02B8EA9400B7E |
| vendas_papelaria.csv | BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF |
| papelaria_limpa.csv | 6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB |
| resumo.md | 8FA1F216D0F26E1AA77C314D904BD5122D6ABC2AD2681D4203E4A0698F864F10 |
| verificacao.md | ED6B317986271C98484C9213F4B92148141E99A3BC546B6F53E983538E6ED4CA |
| limpar.py | AA6C405B1DEA59F70F68058C703992E868EF0E5BD6D29A01D40BAF4344B5089C |
| perfil.py | 7B1DF71E87F49011DC7BC4A44A0CBBE776B340B19D847531B30C93F1A4726AD8 |
| graficos.py | 9533BF25D06602B93808ED574E38F9D621ED4E595C20C315628A870D21652E9D |
| categorias.png | 876F4F16C8C14DC2EB15DE388CB29A2B7BBFD2FD510AD9EFFD4442685547832E |
| cidades.png | 1B76C548A748BBC4AF5DCA0751AA54B4B32B19EFE2133F42482EF3B16B90B7B8 |
| relatorios/rodada-01/construtor.md | 8558A94E71ABC3ED8C3FEA0FAE6C967A780447AED5EDE175C518731C2D293082 |
| relatorios/rodada-01/tester.md | 8C4C9ADCD3AC853EAECFE0A15B5628FDDE83BD63244F4769705D9D0C674F888E |

Status inicial: execução em andamento; testes e revisão final **PENDENTES**.

## Evidências de preservação e fontes

- `preservacao-inicial.json`: manifesto dos 12 arquivos anteriores.
- `preservacao-conferencia.json`: comparação feita pela coordenação, todos
  os 12 hashes preservados.
- `fontes-revisor.md` e `fontes-revisor-evidencia.json`: conferência
  independente do revisor, com reconstituição de todas as células da cópia
  limpa usando biblioteca padrão e Decimal. Resultado sem divergências:
  180 vendas, 548 unidades, R$ 20.059,00 e ticket de R$ 111,44.

Estas conferências de fontes não substituem testes do dashboard nem revisão
final da versão entregue.

A coordenação também reexecutou
`.\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-02\conferir_fontes_revisor.py`:
código de saída 0, `erros: []`, reconstituição integral idêntica e 12 arquivos
preservados. O resultado reproduziu a evidência do revisor.

## Preparação dos testes

Tester informou preparação concluída, ainda sem executar a suíte: Chrome 155
real iniciado via Selenium, dependências disponíveis. `tests/PLANO.md` registra
a matriz e os comandos; `testes-manifesto-preexecucao.json` identifica os oito
arquivos de testes/documentação antes da execução. A liberação depende da
entrega estável do construtor. A sondagem de navegador não é aprovação.

Revisão preliminar independente da cobertura (`cobertura-preliminar-revisor.md`)
identificou dois falsos positivos possíveis: barras de largura zero e conteúdo
oculto ainda presente no DOM. Ambos foram devolvidos ao mesmo tester para
fortalecer os testes e acrescentar regressões, sem alterar o produto. O primeiro
manifesto de testes permanece como histórico; não representa a próxima versão.

## Encerramento

**APROVADO**, conforme `../FINAL.md`. Tester executou 44 casos e revisor
reexecutou os mesmos 44 na rodada 03, sem falhas/erros/skips, na mesma versão
de produto e testes aceita pelo construtor. Auditoria final de versão/evidências
em `../rodada-03/auditoria-final-coordenacao.json`, 162 conferências aprovadas.

Incidentes posteriores às conferências iniciais são descritos integralmente
no FINAL: evidência antiga do revisor substituída como fundamento por execução
nova exclusiva; relatório histórico do tester atualizado por autoria não
determinada, com original recuperado de hash exato e os dois estados preservados
sem reverter a atualização. A afirmação inicial de 12 arquivos iguais refletia
o instante daquela conferência, não imutabilidade posterior do relatório.
