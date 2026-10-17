# Relatório inicial — Tester (rodada 01)

## Versão examinada

Sem commit (workspace não é repositório Git). O produto ainda não existe em
`projeto-dashboard/`; esta é uma preparação pré-entrega.

- `papelaria_limpa.csv` SHA-256: `6837CC7DA1D692B911B767AD4CAF282DC375F50FBA97DD3C32BEBC44166444CB`
- `resumo.md` SHA-256: `8FA1F216D0F26E1AA77C314D904BD5122D6ABC2AD2681D4203E4A0698F864F10`
- `verificacao.md` SHA-256: `ED6B317986271C98484C9213F4B92148141E99A3BC546B6F53E983538E6ED4CA`

## Preparado/conferido

- Confirmada a base solicitada `papelaria_limpa.csv`: 180 linhas de vendas e
  nove colunas, conforme `resumo.md` e `verificacao.md`.
- Preparados `tests/PLANO.md` e `tests/test_oracle.py`. Oráculo usa somente
  biblioteca padrão e `Decimal`; exemplos esperados incluem R$ 20.059,00,
  180 vendas, 548 unidades, totais por categoria e por cidade.
- Não foram editados scripts, site ou README do construtor.
- Skills ausentes: `.agents/skills/explore-data/SKILL.md`,
  `.agents/skills/data-visualization/SKILL.md` e
  `.agents/skills/validate-data/SKILL.md`.

## Comandos e evidências

- Exploração de arquivos: ferramentas de leitura/glob; evidência em
  `tests/PLANO.md` e nos documentos preexistentes citados acima.
- Hashes de versão: `Get-FileHash papelaria_limpa.csv,resumo.md,verificacao.md -Algorithm SHA256`.
- Sondagem inicial de executáveis: `Get-Command python,py,node,npm,msedge,chrome -ErrorAction SilentlyContinue`.
  Python/Node estão no PATH; `msedge` e `chrome` não apareceram.
- **Suíte não executada**, conforme solicitado antes da indicação de produto
  pronto. Nenhuma evidência de teste de produto existe nesta etapa.

## Problemas, devolutivas e pendências

- Aguardando construtor concluir `scripts/`, `site/` e `README.md`; após aviso,
  ligar os testes aos formatos/controles reais e executar a suíte completa.
- Browser automation e carregamento/interação real ainda sem verificação;
  identificar se há navegador instalado ou automação disponível na próxima
  rodada.
- Verificações de dados integrados, artefatos, filtros, HTTP, console,
  teclado e responsividade: **PENDENTES**.

## Status

**BLOQUEADO** — planejamento e oráculo inicial preparados; execução bloqueada
até o construtor declarar o produto pronto. Este status não é aprovação.
