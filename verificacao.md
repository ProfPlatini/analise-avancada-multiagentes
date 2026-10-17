# Verificação da análise de vendas da papelaria

## Avaliação geral: pronta, com a ressalva sobre duplicatas

Conferi `vendas_papelaria.csv`, `papelaria_limpa.csv`, `resumo.md` e `graficos.py`. Recalculei os valores localmente com `.venv/Scripts/python.exe`, pandas e `Decimal`, sem usar fontes externas.

## Cálculos conferidos

- **Original:** 182 linhas de dados, 8 colunas e 180 `id_venda` distintos.
- **Duplicatas:** duas linhas excedentes exatas. Após removê-las, restam 180 vendas e 180 IDs únicos; não há IDs com linhas diferentes.
- **Quantidade de vendas:** 180 vendas na cópia limpa. A soma da coluna `quantidade` é **548 unidades**. Nas linhas brutas, essa soma é 550 porque duas unidades pertencem às vendas duplicadas.
- **Total vendido recalculado independentemente:** somando `quantidade × preco_unitario` no original após remover somente duplicatas exatas, obtive **R$ 20.059,00**. O total armazenado em `papelaria_limpa.csv` também é R$ 20.059,00, e cada `valor_venda` confere com a fórmula.
- **Conferência das categorias:** Acessórios **R$ 10.517,00** + Livros **R$ 7.438,00** + Papelaria **R$ 2.104,00** = **R$ 20.059,00**. Coincide com o total geral.
- O total calculado sem deduplicar o original é **R$ 20.066,00**; a diferença de R$ 7,00 é o valor das duas linhas repetidas. Portanto, esse total bruto não deve ser usado como total de vendas únicas.

## Código e gráficos

- `graficos.py` lê `papelaria_limpa.csv`, localizado junto ao próprio script, e agrupa `valor_venda` por categoria e cidade. A base e a métrica estão corretas.
- As agregações por cidade conferidas são: Campinas **R$ 8.578,00**, Santos **R$ 6.937,50** e Sorocaba **R$ 4.543,50**; somam o mesmo total geral.
- O código define o limite inferior do eixo Y como zero, rotula os valores em reais e usa títulos que descrevem o valor vendido. Não encontrei erro de cálculo ou de base no código.

## Revisão das conclusões e ressalvas

- Os números do resumo sobre duplicatas, contagens, categorias e total estão corretos. Acrescentei ao `resumo.md` a contagem explícita de vendas/unidades e a diferença entre o total bruto original e o total deduplicado.
- **Valor vendido não é lucro**: os arquivos não apresentam custos, despesas ou margem para calcular lucro.
- A validação é restrita aos arquivos locais fornecidos; não foi feita reconciliação com sistema de vendas ou registros financeiros externos.
- Sugestão não bloqueante: incluir o período (2026-01-01 a 2026-03-31) nos títulos ou subtítulos dos gráficos para contextualizar o recorte.
