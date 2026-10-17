# Análise avançada multiagentes

Repositório com os fluxos de trabalho, as skills, os relatórios e o site estático
da análise de vendas da papelaria. O site está configurado para publicação no
Render por meio do arquivo `render.yaml`.

## O que está publicado

- `AGENTS.md`: fluxo e critérios para explorar dados, criar dashboards e fazer
  revisão independente.
- `.opencode/skills/`: instruções Markdown das skills `explore-data`,
  `data-visualization` e `validate-data`.
- `projeto-dashboard/relatorios/`: relatórios Markdown das rodadas, incluindo
  o parecer final e o histórico de correções/incidentes.
- `projeto-dashboard/ANALISE.md`, `resumo.md` e `verificacao.md`: análise e
  resultados documentados.
- `projeto-dashboard/tests/PLANO.md`: plano documentado de testes.
- `projeto-dashboard/site/`: arquivos estáticos necessários para servir o
  dashboard, incluindo `data/dashboard.json`.
- `render.yaml`: configuração do serviço estático no Render; pasta publicada
  `projeto-dashboard/site/`, sem comando de build.

O repositório não inclui CSVs-fonte, scripts de análise/preparação, dependências,
logs ou capturas. Portanto, ele pode hospedar o dashboard usando os dados já
preparados, mas não reproduz a análise nem refaz a preparação dos dados.

## Publicar no Render

No Render, crie um **Blueprint** apontando para este repositório e para a branch
`main`; o Render detectará `render.yaml` e configurará um site estático. A
publicação usa diretamente `projeto-dashboard/site/`, sem build. O push ao
GitHub prepara o deploy, mas não cria nem publica o serviço no Render; essa
etapa precisa ser confirmada na conta do Render.

**Atenção:** o arquivo publicado `projeto-dashboard/site/data/dashboard.json`
contém os 180 registros detalhados (IDs, data, cidade, produto, categoria,
pagamento, quantidade e valores). Um site público torna esses dados acessíveis
na internet. Confirme que há autorização para divulgar os registros antes de
concluir a criação do serviço no Render.

## Navegação

- [Resultado final](projeto-dashboard/relatorios/FINAL.md)
- [Dashboard estático](projeto-dashboard/site/index.html)
- [Fluxo de trabalho dos agentes](AGENTS.md)
- [Skill: exploração de dados](.opencode/skills/explore-data/SKILL.md)
- [Skill: visualização de dados](.opencode/skills/data-visualization/SKILL.md)
- [Skill: validação de dados](.opencode/skills/validate-data/SKILL.md)

Os relatórios históricos foram mantidos para transparência; em caso de
divergência entre um registro preliminar e a conclusão, consulte
`projeto-dashboard/relatorios/FINAL.md` e o parecer vigente da rodada 03.
