# Análise reproduzível — vendas da papelaria

Gerado por `scripts/analisar_dados.py`; detalhes completos em `analise/perfil.json`. Os arquivos anteriores não são modificados.

## Pergunta, fonte e definições

Quanto foi vendido no recorte fornecido e como o valor se distribui entre categorias e cidades?
A entrada confirmada é `papelaria_limpa.csv`, derivada de `vendas_papelaria.csv`. Uma linha é uma venda e `id_venda` é sua chave única, conforme a atividade anterior. Não representa um cliente nem cada unidade vendida.
Período: 01/01/2026 a 31/03/2026. São datas sem horário/fuso; não há informação sobre atualização ou periodicidade da extração. Nenhuma junção, amostragem ou exclusão adicional é aplicada.

- Valor vendido: soma de `quantidade × preco_unitario`, conferida com `valor_venda`.
- Quantidade de vendas: contagem de linhas/IDs únicos (não soma de unidades).
- Ticket médio: total dividido pela contagem de vendas do mesmo recorte; não média de médias. Recorte vazio apresenta R$ 0,00.
- No JSON, preço e valor são centavos inteiros. A interface arredonda apenas a exibição em reais.

## Perfil e qualidade

| Campo | Papel | Tipo inferido | Ausentes na limpa | Distintos |
|---|---|---|---:|---:|
| id_venda | Identificador | str | 0 | 180 |
| data | Temporal | str | 0 | 90 |
| cidade | Dimensão | str | 0 | 3 |
| categoria | Dimensão | str | 0 | 3 |
| produto | Dimensão | str | 0 | 6 |
| quantidade | Métrica | int64 | 0 | 5 |
| preco_unitario | Métrica | float64 | 0 | 6 |
| forma_pagamento | Dimensão | str | 0 | 4 |
| valor_venda | Métrica | float64 | 0 | 29 |

O original tem 182 linhas e 8 colunas; a limpa tem 180 linhas e 9 colunas. Duas duplicatas exatas excedentes (V0010 e V0020) foram retiradas na atividade anterior, sem IDs divergentes eliminados. Foram aparados 6 valores de cidade, padronizados 3 valores `acessórios` e preenchidos 4 pagamentos ausentes como `Não informado` (não imputação de pagamento real).

A preparação do dashboard não deduplica nem refaz essa limpeza: valida a entrada e a exporta. A análise reconstitui essas regras em memória e compara com a cópia limpa. Não há ausentes, zeros ou negativos nos campos numéricos da limpa. Os IDs seguem V + quatro dígitos. Estatísticas, percentis, frequências, tamanhos de texto e correlações estão no perfil JSON.
Dias sem registros entre a primeira e a última data: 0. Isso não comprova cobertura completa do sistema de origem. Contagens mensais: 2026-01: 62, 2026-02: 56, 2026-03: 62.

## Indicadores e agrupamentos

**180 vendas; 548 unidades; R$ 20.059,00 vendidos; ticket médio R$ 111,44.**

| Dimensão | Grupo | Vendas | Unidades | Valor vendido | Participação no valor |
|---|---|---:|---:|---:|---:|
| categoria | Acessórios | 65 | 196 | R$ 10.517,00 | 52.43% |
| categoria | Livros | 54 | 161 | R$ 7.438,00 | 37.08% |
| categoria | Papelaria | 61 | 191 | R$ 2.104,00 | 10.49% |
| cidade | Campinas | 70 | 205 | R$ 8.578,00 | 42.76% |
| cidade | Santos | 60 | 191 | R$ 6.937,50 | 34.59% |
| cidade | Sorocaba | 50 | 152 | R$ 4.543,50 | 22.65% |
| forma_pagamento | Cartão | 52 | 139 | R$ 5.135,50 | 25.60% |
| forma_pagamento | Dinheiro | 56 | 174 | R$ 7.456,00 | 37.17% |
| forma_pagamento | Não informado | 4 | 12 | R$ 636,00 | 3.17% |
| forma_pagamento | Pix | 68 | 223 | R$ 6.831,50 | 34.06% |

Acessórios concentra o maior valor vendido por categoria; Campinas, por cidade. São comparações descritivas deste arquivo, não evidência de preferência dos clientes ou de efeito causal. A diferença de R$ 7,00 para o total bruto de R$ 20.066,00 vem das duas duplicatas excedentes.

## Escolhas visuais e interação

Duas comparações em barras horizontais, ordenadas pelo valor decrescente, evitam comparação de ângulos e permitem ler nomes sem rotação. As barras começam em zero; os dois painéis compartilham o maior valor como escala, recalculada no recorte. Rótulos diretos em R$ e resumo acessível não dependem somente da cor. O período e a fonte ficam visíveis. A tabela permite conferir cada venda. Em celular, os gráficos e a tabela têm rolagem horizontal local para preservar os rótulos.
Cidade e categoria são dimensões de baixa cardinalidade já existentes. Os filtros usam interseção e recalculam os três indicadores, dois agrupamentos e tabela a partir das mesmas linhas. Limpar restaura o conjunto completo. O período do cabeçalho descreve a fonte inteira, não uma seleção temporal.

## Validação e limites

Conferência do construtor: regras históricas reproduzidas em memória; valores recalculados com Decimal por venda; cada valor exportado comparado ao JSON; subtotais por cidade, categoria e pagamento fecham com o total. Esta checagem não é revisão independente. A suíte do tester e o parecer do revisor determinam a aprovação final; consulte os relatórios da rodada vigente.
Confiança analítica: compartilhar com ressalvas. Valor vendido é receita bruta registrada, nunca lucro; faltam custos, despesas, devoluções/status, clientes e validação com registros financeiros externos. Não inferir crescimento, sazonalidade anual, mercado, causalidade ou completude das vendas a partir de apenas este trimestre. Correlações envolvendo valor, quantidade e preço refletem também a fórmula multiplicativa, não causas independentes.

Próximas explorações possíveis (fora do escopo): acompanhar meses comparáveis; estudar distribuição do ticket por categoria; investigar a origem dos pagamentos não informados. Não remover valores extremos somente por destoarem da média.

## Skills e reprodução

Os três arquivos solicitados em `.agents/skills/` estão ausentes. Foram lidas e aplicadas as versões alternativas locais em `.opencode/skills/{explore-data,data-visualization,validate-data}/SKILL.md`: perfil e qualidade, escolha das barras/acessibilidade e conferência de cálculos/ressalvas. Não se afirma uso das versões ausentes.
Da raiz, execute primeiro `projeto-dashboard/scripts/preparar_dados.py` e depois `projeto-dashboard/scripts/analisar_dados.py` com `.venv/Scripts/python.exe`. As saídas são determinísticas para as mesmas fontes. Comandos completos de instalação e testes no README.
