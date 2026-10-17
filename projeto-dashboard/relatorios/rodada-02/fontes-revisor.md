# Verificação preliminar independente das fontes — REVISOR

## Escopo e identificação

Foram conferidos somente `vendas_papelaria.csv`, `papelaria_limpa.csv`, as regras/resultados previamente lidos em `resumo.md` e `verificacao.md` e a preservação dos arquivos listados no manifesto inicial. **Não foram examinados nem editados produto ou testes.** Nenhum CSV, resultado anterior ou relatório histórico foi alterado.

Sem commit no workspace. SHA-256 das fontes conferidas:

- Original: `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`.
- Limpo: `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB`.
- Manifesto `preservacao-inicial.json`: `F3F982CD53BC8C5A5A8C930352955D02D7D5A6E74BE608BDC697AD599E882F75`.
- Auxiliar `conferir_fontes_revisor.py`: `BFDC2299B39B1BB9E5053AC02FE6DC1A676396B9D50456FB6D692F5DE0B4B496`.
- Resultado `fontes-revisor-evidencia.json`: `ACE96714C3EBE1C9E988CF89B03CBE20A5A10EF9FBDB2E9D4CCE92721BC428C6`.

Auxiliar, manifesto e evidência ficam nesta pasta `projeto-dashboard/relatorios/rodada-02/`. O JSON registra os hashes individuais de todos os arquivos preservados e os resultados detalhados.

## Método independente

Script exclusivo do revisor usando apenas biblioteca padrão (`csv`, `Decimal`, `Counter`, `datetime`, `hashlib` e auxiliares). Não importa nem executa `limpar.py`, código do dashboard ou suíte do tester. Reconstrói a cópia limpa diretamente das linhas originais segundo as regras documentadas e compara **todas as células e a ordem das 180 linhas**, incluindo o formato de duas casas de `valor_venda`.

1. Confere cabeçalhos e larguras; identifica duplicatas pela tupla completa da linha original, antes de normalizar.
2. Mantém a primeira ocorrência de cada linha exata; verifica separadamente IDs conflitantes.
3. Retira espaços nas bordas de cidade, aplica categorias canônicas e preenche pagamentos vazios com `Não informado`.
4. Recalcula quantidade × preço com `Decimal`, em centavos, e compara com a coluna calculada. Ticket usa total / número de vendas, com arredondamento `ROUND_HALF_UP` na exibição.
5. Recalcula totais e agrupamentos do conjunto reconstituído; confere fechamento dos subtotais e referências da análise anterior.

## Comandos realmente executados

Na raiz do workspace, PowerShell:

```powershell
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-02\conferir_fontes_revisor.py
```

Resultado: **código de saída 0**, JSON emitido no console e salvo em `fontes-revisor-evidencia.json`; lista `erros` vazia. Isto é execução da conferência de fontes, **não da suíte do projeto**.

```powershell
Get-FileHash .\projeto-dashboard\relatorios\rodada-02\conferir_fontes_revisor.py,.\projeto-dashboard\relatorios\rodada-02\fontes-revisor-evidencia.json,.\projeto-dashboard\relatorios\rodada-02\preservacao-inicial.json -Algorithm SHA256 | Format-List Path,Hash
```

Resultado: código de saída 0; hashes registrados acima. Também foram realizadas leituras dos cabeçalhos/amostras das duas fontes e do manifesto por ferramenta de leitura.

## Resultados

- **Preservação:** todos os **12 arquivos** do manifesto mantêm o SHA-256 inicial, incluindo CSVs, documentos, scripts/gráficos anteriores, AGENTS.md e relatórios da rodada 01. Isso prova igualdade com o manifesto fornecido, não autenticidade anterior à sua criação.
- **Estrutura:** original com 182 linhas de dados e 8 colunas; limpo com 180 linhas e 9 colunas; cabeçalhos e larguras corretos.
- **Duplicatas:** somente duas linhas excedentes exatas, `V0010` e `V0020`, uma de cada. Original com 180 IDs distintos, sem IDs de conteúdo divergente; cópia limpa com 180 IDs únicos.
- **Limpeza:** seis cidades com espaços, três categorias não canônicas e quatro pagamentos vazios no original. A reconstituição coincidiu integralmente com a cópia limpa.
- **Ausências:** apenas quatro pagamentos vazios no bruto; nenhuma ausência nos nove campos do limpo. Datas ISO válidas; quantidades inteiras positivas e preços positivos/numéricos finitos; cada valor de venda corresponde ao produto exato.
- **Período:** 01/01/2026 a 31/03/2026.
- **Original sem deduplicar:** 182 registros, 550 unidades e R$ 20.066,00. A diferença de R$ 7,00 e duas unidades corresponde às duas linhas excedentes; esses 182 registros não são 182 vendas únicas.
- **Limpo:** 180 vendas, 548 unidades, **R$ 20.059,00**, ticket médio **R$ 111,44**. Valor vendido não significa lucro.

| Categoria | Vendas | Unidades | Valor vendido |
|---|---:|---:|---:|
| Acessórios | 65 | 196 | R$ 10.517,00 |
| Livros | 54 | 161 | R$ 7.438,00 |
| Papelaria | 61 | 191 | R$ 2.104,00 |

| Cidade | Vendas | Unidades | Valor vendido |
|---|---:|---:|---:|
| Campinas | 70 | 205 | R$ 8.578,00 |
| Santos | 60 | 191 | R$ 6.937,50 |
| Sorocaba | 50 | 152 | R$ 4.543,50 |

| Forma de pagamento | Vendas | Unidades | Valor vendido |
|---|---:|---:|---:|
| Cartão | 52 | 139 | R$ 5.135,50 |
| Dinheiro | 56 | 174 | R$ 7.456,00 |
| Não informado | 4 | 12 | R$ 636,00 |
| Pix | 68 | 223 | R$ 6.831,50 |

Todos os agrupamentos fecham em R$ 20.059,00. Totais, contagens por categoria/pagamento e valores por categoria/cidade coincidem com `resumo.md` e `verificacao.md`. Nenhuma divergência encontrada nas fontes examinadas; nenhuma correção a encaminhar nesta etapa.

## Estado da revisão

**Evidência preliminar concluída, sem aprovação do projeto.** A revisão final está **BLOQUEADA** até a entrega estável e aprovação do tester. Código do produto, dados preparados para o site, cobertura da suíte, evidências HTTP/navegador, interface, filtros e documentação final permanecem **PENDENTES** para a próxima etapa. Não houve reconciliação com sistema de vendas ou fonte financeira externa.
