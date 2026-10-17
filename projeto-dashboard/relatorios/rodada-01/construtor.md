# Relatório do Construtor — rodada 01

## Versão examinada

Sem commit: a pasta de trabalho não é um repositório Git. Hashes SHA-256 dos arquivos relevantes:

| Arquivo | SHA-256 |
|---|---|
| `vendas_papelaria.csv` (original) | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` (entrada) | `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB` |
| `projeto-dashboard/scripts/preparar_dados.py` | `BF80A448B0369E1FC9A2489D13A2A4F1DF239B957DC5B14978AB2AFC5104B238` |
| `projeto-dashboard/site/index.html` | `48035A78FADEAB9B02B7B6FD4022611495860FBAFD31E43DC18E4930FA2097FF` |
| `projeto-dashboard/site/styles.css` | `6FB10906AB6CA91B63DE3169C508B59B9A194CA85A6B3B96908C9BC2117C467D` |
| `projeto-dashboard/site/app.js` | `5BE1C780D18E6173BB0BA9D6834D88204ED1E340D4FFB4898C603509B6025770` |
| `projeto-dashboard/site/data/dashboard.json` | `F717799C5F61708C1D69CEE30A8631C3EA5C8AC46C8335265778FC2A16B3F291` |
| `projeto-dashboard/README.md` | `23B5A6E5C8BEABCDDB9A89633468602773225272F938832D2D1660B793F0AB50` |

## Construído

- `scripts/preparar_dados.py` usa pandas para validar a base limpa e gerar JSON em centavos para o site, sem modificar os CSVs nem retirar registros. Documenta/exige IDs únicos, campos presentes, datas ISO, tipos numéricos e igualdade entre quantidade × preço e valor da venda.
- Dashboard estático com indicadores de valor vendido, número de vendas e ticket médio; gráficos SVG por categoria e cidade; tabela detalhada; filtros sincronizados de cidade/categoria, ação limpar e estado vazio. Interface responsiva, com controles nativos de teclado/foco e aviso de carregamento.
- `README.md` documenta definições, limitações, regras de preparação e comandos para preparar, testar e servir localmente. `projeto-dashboard/site/` é a pasta publicável.
- Registrado que as skills `explore-data`, `data-visualization` e `validate-data` não estavam presentes e não foram usadas.

## Comandos e evidências

- Execução: `& .\.venv\Scripts\python.exe .\projeto-dashboard\scripts\preparar_dados.py` — concluída; gerou `site/data/dashboard.json`, com 180 vendas, 548 unidades, período 2026-01-01 a 2026-03-31 e R$ 20.059,00 vendidos.
- Conferência da estrutura/ausências/tipos da fonte: `.venv/Scripts/python.exe -c "import pandas as pd; d=pd.read_csv('papelaria_limpa.csv'); print(d.shape); print(d.dtypes); print(d.isna().sum().to_dict())"` — 180 × 9, campos sem valores ausentes; quantidade inteira e campos monetários numéricos.
- `& .\.venv\Scripts\python.exe -m py_compile .\projeto-dashboard\scripts\preparar_dados.py` — compilação Python concluída sem erro.
- Hashes obtidos com `Get-FileHash ... -Algorithm SHA256`; o hash do CSV limpo coincide com o registrado na preparação do tester. O hash do CSV original também foi registrado para comparação.

## Pendências e devolutiva

- A suíte automatizada e os testes HTTP/navegador, filtros reais, console, acessibilidade e viewports não foram executados pelo construtor; são **PENDENTES** para o tester. O relatório inicial do tester aguardava a entrega e os arquivos `tests/PLANO.md` e `tests/test_oracle.py` foram preservados sem edição.
- O ambiente ainda não tem `pytest` instalado na `.venv`; o README traz o comando de instalação antes da execução da suíte. O tester pode ajustar o comando conforme a suíte final.
- Não foi realizada revisão independente pelo revisor. Não afirmar aprovação conjunta nem que todos os testes passaram.

## Status

**APROVADO — entrega do construtor concluída.** Testes e revisão independente permanecem **PENDENTES**; este status não é aprovação final do projeto.
