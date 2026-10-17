# Resultado final — APROVADO

**Construtor, tester e revisor aprovaram a mesma versão de produto e testes.**
Nenhum teste obrigatório pendente ou defeito conhecido no escopo examinado.
O dashboard, a preparação reproduzível e a análise estão em `projeto-dashboard/`.

## Resultado da base

Entrada: `papelaria_limpa.csv`, derivada de `vendas_papelaria.csv`.
Período: 01/01/2026 a 31/03/2026. Cada linha/`id_venda` representa uma venda,
não uma unidade de produto ou cliente.

- Valor vendido: **R$ 20.059,00** — receita bruta registrada, não lucro.
- Quantidade: **180 vendas**, correspondendo a 548 unidades.
- Ticket médio: **R$ 111,44** (valor vendido dividido pelo número de vendas).

Site estático com três indicadores, dois gráficos, tabela, filtros sincronizados
por cidade/categoria, limpar filtros e mensagem de resultado vazio. Não exige
servidor de aplicação ou banco de dados. Há rolagem local de gráficos/tabela
quando necessária no celular.

## Versão final e aprovações

Sem commit Git. Os manifestos abaixo listam os hashes individuais dos **14
arquivos de produto/fontes** e **10 arquivos de testes/documentação**:

| Manifesto | SHA-256 |
| --- | --- |
| `rodada-02/evidencias-tester/produto-depois.json` | `E2C0113812FAB23271DC4CDAF2C76B6C47627034A72149D557CBE0B504554452` |
| `rodada-02/evidencias-tester/testes-depois.json` | `7CC6629C3ACFD3963FBA79FF5F458B7CD80ED5A73B1194F46F346DF6CBB2A7B1` |
| `rodada-03/evidencias-revisor/manifesto-final.json` | `B89FCFFAD1B7869FEFF61B96F89BF5974A24E560AAE7DF9AB14B72EF1834376B` |
| `rodada-03/auditoria-final-coordenacao.json` | `88FE82F6B4A51190177A8D669B318B90FF256F55E38A5FEEEB5A72808A47648B` |

Caminhos desta seção relativos a `projeto-dashboard/relatorios/`.

- **Construtor:** `rodada-02/construtor.md` e `aceite-final-construtor.md`.
- **Tester:** `rodada-02/tester.md`.
- **Revisor vigente:** `rodada-03/revisor.md` e `adendo-preservacao-revisor.md`.

## Testes executados e evidências

| Execução independente | Resultado | JUnit e log |
| --- | --- | --- |
| Tester | **44 passaram**, 0 falhas/erros/ignorados; 177,67 s | `rodada-02/evidencias-tester/pytest-execucao-01.{xml,log}` |
| Revisor, rodada 03 | **44 passaram**, 0 falhas/erros/ignorados; 167,79 s | `rodada-03/evidencias-revisor/execucao-20261017-rastreabilidade-01/pytest.{xml,log}` |

Foram executados: preservação dos CSVs/resultados, limpeza campo a campo,
colunas/tipos/ausências/duplicatas, preparador com entradas inválidas, recálculos
independentes e exemplo conhecido, cada célula da tabela, ambos gráficos e
indicadores, todos os filtros isolados e combinados, vazio e limpar, HTTP,
console/JavaScript/rede, teclado/foco e viewports Chrome/CDP **375×812 e
1366×900**. O exemplo sintético de R$ 121,00 é exclusivamente de teste.

As lacunas C1/C2/C3 foram corrigidas e verificadas por regressões: barras
positivas/proporcionais, visibilidade das saídas e detecção de erros desde a
inicialização. Erros intencionais dessas regressões não são erros aceitos do
dashboard. Preparação/análise executadas duas vezes com resultados idênticos.
Capturas desktop/celular foram **abertas e examinadas**, inclusive gráficos e
tabela rolados; detalhes em `rodada-02/evidencias-tester/INSPECAO-VISUAL.md` e
no parecer vigente do revisor.

Coordenação executou `rodada-03/conferir_aceite_revisor.py` e
`rodada-03/registrar_final_coordenacao.py`: saída 0, **162 conferências** de
arquivos, versão e evidências consistentes. Isso é auditoria das evidências,
não outra execução da suíte.

## Histórico e incidentes de rastreabilidade

Os CSVs e resultados anteriores permanecem íntegros. Dois incidentes foram
detectados pela auditoria, sem ocultar divergências ou alterar referências para
fazê-las passar:

1. XML/auditoria antigos do revisor foram regravados após o parecer da rodada
   02. Essa evidência foi retirada como fundamento da aprovação. O revisor
   preservou o incidente e refez a suíte em diretório exclusivo na rodada 03,
   com manifesto selado e hashes conferidos. Ver `rodada-03/revisor.md`.
2. `rodada-01/tester.md` recebeu uma atualização posterior. Ela não foi
   revertida. O conteúdo original foi recuperado da leitura integral inicial,
   com **SHA-256 exatamente igual ao manifesto inicial**, e ambos os estados
   estão em `rodada-03/incidente-historico/tester-rodada01-{original,atualizado}.md`.
   Dos 12 arquivos iniciais, 11 seguem iguais no lugar e esse relatório original
   está preservado no arquivo recuperado. A exceção é explícita na auditoria e
   foi aprovada em `rodada-03/adendo-preservacao-revisor.md`.

Autoria/comando dessas atualizações não foram determinados. Produto e testes
nunca precisaram mudar por esses incidentes. A execução adicional mencionada
no relatório histórico atualizado não é usada como evidência canônica aqui.

As três skills estão ausentes em `.agents/skills/`; foram lidas e aplicadas
suas alternativas existentes em `.opencode/skills/`. O histórico não foi
reescrito para afirmar uso anterior de skills ausentes.

## Como abrir e reproduzir

No terminal PowerShell do VS Code, na pasta principal:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra **http://localhost:8000**. Pare com `Ctrl+C`.
Comandos completos para preparar os dados, gerar a análise e executar os testes
estão em `projeto-dashboard/README.md`.

**Pasta publicável: `projeto-dashboard/site/`. Publicação não realizada**,
conforme o escopo. As conclusões se limitam aos arquivos fornecidos; não houve
reconciliação financeira externa, teste em aparelho físico ou auditoria WCAG
integral. Esses limites estão documentados e não são testes obrigatórios
ocultamente pendentes. Qualquer alteração de produto/testes exige nova
validação e revisão da versão alterada.
