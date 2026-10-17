# Dashboard de vendas da papelaria

Dashboard estático construído a partir de `papelaria_limpa.csv` (180 vendas, de 01/01/2026 a 31/03/2026). Na base, cada linha representa uma venda identificada por `id_venda`. O valor vendido é a soma da coluna `valor_venda`; a quantidade de vendas conta linhas, e o ticket médio é valor vendido dividido por quantidade de vendas. Valor vendido é receita bruta registrada, não lucro.

## Preparar os dados

Abra o terminal do VS Code na pasta principal do projeto e execute no PowerShell:

```powershell
.\.venv\Scripts\python.exe -m pip install pandas
.\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py
.\.venv\Scripts\python.exe .\projeto-dashboard\scripts\analisar_dados.py
```

O primeiro script lê `papelaria_limpa.csv` sem modificá-lo, confere colunas, ausências, IDs, datas, tipos e a igualdade `quantidade × preço unitário = valor_venda`; depois gera `projeto-dashboard/site/data/dashboard.json` e um `favicon.ico` local válido. Os valores monetários são exportados em centavos inteiros. Não são removidas linhas nem duplicatas nesta etapa: o script exige `id_venda` único e espera receber o CSV já limpo.

## Executar testes

Na pasta principal, instale as dependências e execute a suíte completa. Os testes usam Selenium e Chrome headless real (Chrome 155 disponível neste ambiente). Instale o Google Chrome se necessário; o Selenium Manager resolve o driver compatível, podendo precisar de internet na primeira execução.

```powershell
.\.venv\Scripts\python.exe -m pip install -r .\projeto-dashboard\tests\requirements.txt
.\.venv\Scripts\python.exe -m pytest -q .\projeto-dashboard\tests
```

O servidor HTTP dos testes é iniciado automaticamente. Os resultados e pendências válidos são os dos relatórios em `relatorios/`; não confunda gerar o perfil com aprovar os testes. Playwright/Chromium não são usados pela suíte atual.

## Abrir o dashboard

Na pasta principal, inicie o servidor HTTP local:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra <http://localhost:8000> no navegador. Para parar o servidor, volte ao terminal e pressione `Ctrl+C`. **A pasta publicável em hospedagem estática é `projeto-dashboard/site/`**; publique seu conteúdo mantendo `data/dashboard.json` no caminho relativo `data/`.

## O que o painel mostra

Os filtros de cidade e categoria atualizam juntos os três indicadores, os gráficos de valor vendido por categoria e cidade e a tabela detalhada. Há botão para limpar filtros e aviso quando não há resultados. O ticket médio é exibido como R$ 0,00 quando nenhum registro corresponde aos filtros, evitando divisão por zero.

## Regras e limitações

- `papelaria_limpa.csv` já contém os tratamentos da análise anterior: duplicatas exatas foram removidas, espaços nas bordas de cidade foram aparados, categorias foram padronizadas, pagamentos vazios viraram `Não informado` e `valor_venda` foi calculado como quantidade × preço. O CSV original `vendas_papelaria.csv` e a cópia limpa não são alterados pelo dashboard.
- O script de preparação não repete a limpeza; falha com erro explícito se detectar dados incompatíveis. Ele exige `id_venda` único, campos obrigatórios não vazios, data no formato ISO e valores monetários com até duas casas decimais.
- Os KPIs e gráficos descrevem os registros fornecidos localmente. Não há custos, despesas, margem ou reconciliação com um sistema financeiro; portanto, não é possível concluir lucro ou validar vendas externas.
- `ANALISE.md` e `analise/perfil.json` são gerados pelo segundo comando: documentam grão, perfil das duas fontes, limpeza histórica, estatísticas, agrupamentos, checagens e limitações. Não substituem revisão independente.
- As três skills estão ausentes no caminho solicitado `.agents/skills/`. Nesta rodada foram lidas e aplicadas as versões alternativas em `.opencode/skills/{explore-data,data-visualization,validate-data}/SKILL.md`, sem alterar a análise anterior.
