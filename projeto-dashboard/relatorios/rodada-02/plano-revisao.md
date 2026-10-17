# Plano de revisão independente — rodada 02

## Escopo e estado

Preparação do REVISOR, sem examinar produto em alteração, executar suíte ou editar produto/testes. A revisão final e `revisor.md` ficam **PENDENTES** até o tester aprovar uma versão identificada e entregar evidências completas. Este plano não aprova o projeto.

Fontes lidas: `AGENTS.md`, `resumo.md`, `verificacao.md` e relatórios `construtor.md` e `tester.md` da rodada 01. Não há `revisor.md` naquela rodada na listagem consultada. As três skills estão ausentes no caminho prescrito `.agents/skills/`; foram lidas as alternativas expressamente indicadas em `.opencode/skills/{explore-data,data-visualization,validate-data}/SKILL.md` para orientar este checklist.

Não foi examinada uma versão do produto nesta etapa; hashes do relatório antigo são referências históricas, não identificação da próxima entrega. Operações realizadas: somente leitura/listagem das fontes acima e criação deste plano. Nenhum comando de teste executado.

## Portão de entrada e rastreabilidade

- [ ] Construtor e tester entregam relatórios da rodada com hashes SHA-256 de scripts, HTML, CSS, JavaScript, dados preparados, documentação e testes relevantes; confirmar que se referem à mesma versão.
- [ ] Evidências da execução completa incluem comando exato, resultado, quantidade de testes, falhas, skips e localização de logs/capturas. Aprovação textual não substitui evidência.
- [ ] Toda alteração posterior aos testes exige nova execução dos testes afetados; a versão final precisa de execução completa e revisão correspondente.
- [ ] Comparar testes anteriores e novos, quando disponíveis: exclusões, asserts relaxados, mocks de interação e xfails/skips precisam de justificativa. Nenhum critério obrigatório pode desaparecer.
- [ ] Preservar histórico da rodada 01 e resultados anteriores. Não afirmar que o CSV bruto foi explicitamente escolhido: o tester anterior registra `papelaria_limpa.csv` como base solicitada; distinguir entrada limpa e origem bruta na documentação.

## Metodologia e precisão — explore-data / validate-data

- [ ] Significado de cada linha e `id_venda` documentados: uma venda, não uma unidade de produto; 180 vendas versus 548 unidades.
- [ ] Preservação do original e dos arquivos anteriores comprovada por hashes de referência, não apenas existência atual.
- [ ] Linhagem reproduzível do bruto à cópia limpa e desta ao site; esclarecer se o preparador só valida a cópia limpa. Documentar comandos reais e dependências de cada etapa prometida.
- [ ] Limpeza justificada: remover apenas duas duplicatas exatas excedentes; espaços em cidade; caixa de categoria; quatro pagamentos vazios como `Não informado`. Não descartar IDs divergentes silenciosamente.
- [ ] Conferir colunas, tipos, ausências e campos calculados; valores monetários tratados com precisão explícita e arredondamento consistente.
- [ ] Oráculo independente do preparador e do JavaScript, preferencialmente biblioteca padrão/Decimal a partir dos CSVs. Não aceitar o valor calculado pelo próprio produto como único esperado.
- [ ] Conferir cada registro preparado e agrupamentos, não só total geral; subtotais devem fechar.
- [ ] Ticket = valor vendido / número de vendas filtradas; não média de médias nem divisão por unidades. Estado vazio sem divisão por zero.
- [ ] Período de 01/01/2026 a 31/03/2026 explícito. Vendas brutas registradas não são lucro; não inferir custos, causalidade ou validação financeira externa.

Referências documentais, ainda não recalculadas pelo revisor nesta rodada:

| Checagem | Esperado segundo análise anterior |
|---|---|
| Original | 182 linhas, 8 colunas, 180 IDs distintos |
| Limpo | 180 linhas, 9 colunas, IDs únicos |
| Total vendido | R$ 20.059,00 |
| Ticket arredondado a centavos | R$ 111,44 |
| Total bruto com duplicatas | R$ 20.066,00; diferença R$ 7,00 |
| Categorias | Acessórios R$ 10.517,00; Livros R$ 7.438,00; Papelaria R$ 2.104,00 |
| Cidades | Campinas R$ 8.578,00; Santos R$ 6.937,50; Sorocaba R$ 4.543,50 |

## Cobertura funcional e interface

- [ ] Três indicadores obrigatórios, dois gráficos, tabela, dois filtros por colunas reais e botão limpar; todos usam o mesmo subconjunto.
- [ ] Verificar cada opção de cada filtro isolado e combinações, com totais, ticket, agrupamentos e linhas esperados calculados independentemente.
- [ ] Distinguir opção sem filtro de resultado sem registros. Se todas as combinações reais tiverem registros, testar vazio mediante fixture controlada no navegador, deixando essa condição explícita; não alegar combinação natural inexistente.
- [ ] Limpar restaura opções e conteúdo geral. Vazio mostra mensagem clara, tabela/gráficos coerentes e nenhum `NaN`/infinito.
- [ ] HTTP real carregando HTML/CSS/JS/JSON sem recursos ausentes nem erro de JavaScript; não substituir por leitura local ou simples validação de sintaxe.
- [ ] Interação real no navegador, não apenas chamada direta a funções internas: selecionar filtros, combinar, limpar e verificar conteúdo renderizado.
- [ ] Evidências em telas pequena e grande: rótulos completos, moeda legível, controles utilizáveis, tabela acessível sem quebrar a página. Rolagem horizontal localizada pode ser apropriada à tabela.
- [ ] Teclado: alcançar filtros e botão, foco visível, alterar seleção e acionar limpar; labels associados aos controles. Existência de `select` por si só não prova interação.

## Visualizações e documentação — data-visualization

- [ ] Gráficos adequados à comparação de valores, barras partindo de zero, dimensões e unidades claras, valores/escala corretos; cores não são a única identificação.
- [ ] Títulos, período, fonte e contexto de filtros não induzem a erro. Rótulos continuam legíveis em celular; alternativa textual/tabela permite consultar dados.
- [ ] README curto em português simples, comandos válidos em PowerShell/Windows para preparar, instalar dependências necessárias, testar e servir HTTP.
- [ ] `site/` claramente identificada como pasta publicável; sem backend/banco e sem afirmar publicação realizada.

## Casos independentes a procurar na suíte

Os exemplos abaixo são critérios propostos, **não defeitos encontrados nem testes executados**:

1. Fixture de duas vendas: 2 unidades × R$ 10,00 e 1 unidade × R$ 40,00 → total R$ 60,00, 2 vendas, 3 unidades, ticket R$ 30,00. Detecta confusão entre venda/unidade e média de preço unitário.
2. Fixture incluindo uma cópia exata da primeira venda → após a regra documentada, mesmos resultados; ID repetido com conteúdo divergente exige tratamento explícito, não deduplicação silenciosa.
3. Subconjunto vazio → contagem zero, mensagem de vazio e ausência de `NaN`/infinito nos indicadores, gráficos e tabela; limpar retorna ao conjunto completo.
4. Segmentos com tamanhos diferentes → ticket agregado calculado pelas vendas, não média simples dos tickets dos segmentos.

## Devolutivas e decisão futura

Falta de cobertura/evidência volta ao tester; defeito de dados, produto ou documentação volta ao construtor. Cada achado final deverá incluir arquivo/local, cenário reproduzível, esperado versus observado, impacto e destinatário. Sem acesso a navegador ou sem evidência obrigatória, registrar **BLOQUEADO**, com verificações **PENDENTES**, nunca aprovação.

**Status desta preparação: BLOQUEADO para revisão final**, aguardando aprovação do tester, relatórios e identificação da versão estável. Checklist pronto; nenhum defeito do produto foi concluído nesta fase.
