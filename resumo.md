# Análise e tratamento — vendas_papelaria.csv

## Perfil do arquivo original

- **182 linhas de dados** (183 linhas físicas contando o cabeçalho) e **8 colunas**.
- Grão: uma linha por venda; `id_venda` identifica a venda.
- Intervalo de datas: 2026-01-01 a 2026-03-31.
- `id_venda` tinha 180 valores distintos em 182 linhas, por causa de duas vendas repetidas.

## Problemas encontrados

- **2 duplicatas exatas**: `V0010` e `V0020`, cada uma registrada duas vezes. Não havia IDs repetidos com conteúdo divergente.
- **Cidade:** 6 registros tinham espaços no início e/ou fim.
- **Categoria:** 3 registros usavam `acessórios` em minúsculas em vez de `Acessórios`.
- **Forma de pagamento:** 4 valores vazios.
- Não foram encontradas larguras de linha inconsistentes, datas inválidas, quantidades ou preços vazios/não numéricos, nem quantidades ou preços negativos/zerados.

## Tratamento em `papelaria_limpa.csv`

- O arquivo original foi preservado; as operações foram aplicadas somente à cópia.
- Removidas somente as duas linhas excedentes das duplicatas exatas (comparação da linha original inteira). Nenhuma venda com mesmo ID e dados diferentes foi removida.
- Removidos espaços nas bordas dos valores de `cidade`.
- Categorias padronizadas para `Livros`, `Papelaria` e `Acessórios`.
- Pagamentos vazios preenchidos com `Não informado`.
- Adicionada a coluna `valor_venda`, calculada como `quantidade * preco_unitario`, com duas casas decimais.

## Resultado

- Cópia final: **180 linhas de dados e 9 colunas**; `id_venda` ficou único.
- Quantidade considerada: **180 vendas** (548 unidades nos itens). As 182 linhas brutas representam 180 vendas após retirar as duas linhas duplicadas.
- Categorias: Acessórios 65, Livros 54, Papelaria 61.
- Pagamentos: Cartão 52, Dinheiro 56, Não informado 4, Pix 68.
- Soma recalculada de `valor_venda`: **R$ 20.059,00**. O total de R$ 20.066,00 obtido diretamente das linhas brutas inclui R$ 7,00 das duas duplicatas excedentes; não é o total da cópia deduplicada.
- Valor vendido representa vendas brutas registradas, não lucro.

Os cálculos e a geração da cópia foram executados localmente com `.venv/Scripts/python.exe`, usando apenas o CSV local, sem integrações com bancos de dados.
