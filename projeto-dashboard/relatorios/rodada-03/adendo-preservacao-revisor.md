# Adendo do REVISOR — preservação do relatório histórico

## Parecer

**APROVADO quanto à resolução de preservação e à mesma versão final do produto/testes.** Os 12 conteúdos do manifesto inicial estão integralmente disponíveis: **11 nos caminhos originais e 1 recuperado com hash exato**, sem eliminar a versão atualizada. Os 14 arquivos do produto, 10 dos testes e 126 arquivos selados da rodada 03 permanecem iguais. JUnits canônicos: tester execução 01 e revisor rodada 03, ambos com **44 testes, 0 falhas, 0 erros e 0 skips**.

Este é um adendo novo; nenhum arquivo existente foi alterado por mim. Não executei nova suíte: a mudança identificada é de relatório, não de produto/testes. A auditoria de preservação/versionamento foi executada e está registrada abaixo. A consolidação final da coordenação ainda é uma etapa futura, não um resultado que este adendo presume.

## Incidente confirmado, sem ocultação

Li os dois estados arquivados, o arquivo atualmente no caminho histórico, `rodada-02/preservacao-inicial.json` e o script atual `rodada-03/registrar_final_coordenacao.py`.

- O relatório original de 47 linhas era de preparação, com execução pendente e status BLOQUEADO. O recuperado coincide com o conteúdo lido no início desta sessão e, decisivamente, com o SHA-256 do manifesto inicial.
- O relatório atual de 118 linhas, com título “registro atualizado”, é diferente: acrescenta resultados e narrativa posterior, inclusive referência a 44 testes em 177,26 s e `evidencias-tester/execucao-02/`. Sua afirmação textual de preservação do planejamento **não significa identidade byte a byte com o relatório inicial**.
- O caminho histórico mudou, portanto não se pode declarar que os 12 arquivos ficaram inalterados em seus locais. O que se comprova agora é preservação integral dos 12 **conteúdos originais**, com recuperação documentada de um deles e preservação adicional do conteúdo atualizado.
- Não identifiquei autor, processo ou momento comprovado dessa alteração. Uma narrativa em primeira pessoa dentro do relatório não é prova de autoria. Não reverto/sobrescrevo o arquivo atual nem atribuo o incidente a qualquer agente.

## Estados preservados e hashes conferidos

Todos os caminhos nesta tabela são relativos a `projeto-dashboard/relatorios/`:

| Estado | Caminho | SHA-256 |
|---|---|---|
| Original recuperado | `rodada-03/incidente-historico/tester-rodada01-original.md` | `8C4C9ADCD3AC853EAECFE0A15B5628FDDE83BD63244F4769705D9D0C674F888E` |
| Atualizado arquivado | `rodada-03/incidente-historico/tester-rodada01-atualizado.md` | `38018A5EDA43A85DDA96F8E810CE59A7F828BDCDE800DBE423FE884F88348AA3` |
| Atual no caminho histórico | `rodada-01/tester.md` | `38018A5EDA43A85DDA96F8E810CE59A7F828BDCDE800DBE423FE884F88348AA3` |

A cópia atualizada arquivada é idêntica em bytes ao caminho histórico. O hash original recuperado é exatamente o esperado pelo manifesto, não um novo valor de referência escolhido para aceitar a mudança. O manifesto inicial permanece com SHA-256 `F3F982CD53BC8C5A5A8C930352955D02D7D5A6E74BE608BDC697AD599E882F75`.

O novo `evidencia-adendo-preservacao-revisor.json` discrimina, para cada uma das 12 entradas, caminho original, hash inicial, hash atual, coincidência no local original e fonte efetivamente conferida. Registra **uma e somente uma exceção**, sem mascarar `coincide_no_caminho_original: false` nessa entrada.

## Conferências executadas

Da raiz do workspace, PowerShell:

```powershell
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-03\conferir_preservacao_adendo_revisor.py
& .\.venv\Scripts\python.exe .\projeto-dashboard\relatorios\rodada-03\conferir_aceite_revisor.py
Get-FileHash .\projeto-dashboard\relatorios\rodada-03\evidencia-adendo-preservacao-revisor.json,.\projeto-dashboard\relatorios\rodada-03\conferir_preservacao_adendo_revisor.py,.\projeto-dashboard\relatorios\rodada-03\incidente-historico\tester-rodada01-original.md,.\projeto-dashboard\relatorios\rodada-03\incidente-historico\tester-rodada01-atualizado.md -Algorithm SHA256 | Format-List Path,Hash
```

Todos terminaram com saída 0. Primeiro comando: **12 conteúdos originais (11 no lugar + 1 recuperado), atualizado preservado; 14 produto/10 testes/126 selados iguais; tester01 e revisor03 = 44/0/0/0**. Segundo: **126 arquivos selados; versão 14 produto/10 testes; histórico rodada 02 coberto por esse inventário preservado; JUnit rodada 03 = 44/0/0/0**. A auditoria anterior não abrangia o relatório da rodada 01; esta conferência nova fecha especificamente essa lacuna, sem reinterpretar seu inventário como mais amplo do que era.

O auxiliar novo lê os manifestos e XMLs, verifica os dois estados e só cria uma evidência **nova, em modo exclusivo `x`**. Não regrava o selo da rodada 03 nem modifica evidências anteriores. Este adendo e suas novas evidências não estão entre os 126 arquivos já selados; possuem referência separada:

- `rodada-03/evidencia-adendo-preservacao-revisor.json`: `8DCBDA6FA16887CCF04DBC66A356E72A156E57A9B119C97090D5541B5D2ACDAB`.
- `rodada-03/conferir_preservacao_adendo_revisor.py`: `43438D754763EF48E433B07C2D29A4270FBFC57D606481183EDB22DE95C96FB6`.

## Evidências canônicas e necessidade de reteste

- Tester: `rodada-02/evidencias-tester/pytest-execucao-01.xml`, SHA-256 `1AB1A6E4099C9B2B02772D4E521E3EB0BACCAD860CB9694181B4B3546BCA60D0`.
- Revisor: `rodada-03/evidencias-revisor/execucao-20261017-rastreabilidade-01/pytest.xml`, SHA-256 `06AFB4579057E846AC7D570FAD0970773661D7C6796CA6AE15B7975EFC2A9F1C`.
- Selo do revisor: `rodada-03/evidencias-revisor/manifesto-final.json`, SHA-256 `B89FCFFAD1B7869FEFF61B96F89BF5974A24E560AAE7DF9AB14B72EF1834376B`, com todas as 126 entradas conferidas.

Li ambos os JUnits por parser: 44 casos distintos cada, contagens nulas de falhas/erros/skips e ausência desses nós. Não uso `execucao-02/`, sua duração alegada ou o relatório histórico atualizado como fundamento canônico de aprovação. Preservá-los não equivale a atestar sua execução/proveniência. Também não reabilito o XML inconsistente antigo do revisor, já tratado no parecer da rodada 03.

**Nova execução de testes não necessária:** versão e suíte aprovadas permanecem byte a byte iguais; a preservação documental foi resolvida por conferência de conteúdo/hash. Qualquer mudança posterior em produto/testes exige o ciclo de testes/revisão aplicável. Uma nova alteração documental exige auditoria documental, sem fabricar resultados de teste.

## Avaliação do fallback proposto pela coordenação

**Aceitável com escopo estrito e transparente.** O script atual, que li, ainda usa o caminho original para todas as entradas e falhou corretamente: não o alterei nem alego que a auditoria final nova já foi criada.

Para a alteração futura da coordenação não enfraquecer o aceite, deve:

1. Fixar a exceção **somente** à entrada `projeto-dashboard/relatorios/rodada-01/tester.md` do manifesto de preservação. Nenhum fallback genérico para arquivo divergente, produto, teste ou dado.
2. Manter o hash original esperado `8C4C...`; exigir que o arquivo recuperado corresponda integralmente a esse hash. Não substituir o esperado por `38018...`.
3. Conferir também o estado atualizado: arquivo histórico atual e cópia arquivada ambos com `38018...`, iguais em bytes. Qualquer nova divergência deve falhar, não ser aceita automaticamente como outra atualização.
4. Registrar separadamente caminho/hash esperado, caminho/hash atual divergente, caminho de recuperação e hashes dos dois arquivos arquivados. Declarar **conteúdo original recuperado em outro caminho**, não “arquivo original nunca alterado”.
5. Exigir os outros 11 originais nos respectivos caminhos, os 14 arquivos de produto/10 de testes sem exceção e o selo/JUnits canônicos intactos.
6. Acrescentar este incidente/adendo ao registro final, preservando todos os relatórios/manifestações anteriores. Não apresentar `execucao-02` como substituição da execução canônica 01.

Esse mecanismo preserva o critério de identidade do conteúdo original, em vez de removê-lo; a localização alternativa é uma exceção nominada e auditável. A aprovação aqui é da **resolução verificada e dessa proposta estrita**, não uma revisão antecipada do código que a coordenação ainda vai alterar.

## Limites e encaminhamento

Conteúdo original e atualizado integralmente preservados; produto/testes/evidências canônicas íntegros; nenhuma pendência obrigatória de teste. Autoria e circunstâncias da alteração histórica continuam indeterminadas. A igualdade com o hash inicial comprova recuperação exata dos bytes, não continuidade de custódia no caminho original.

Ao coordenador: consolidar o aceite com este adendo e a exceção explícita acima; a futura implementação/auditoria final deve ser conferida sem omitir o incidente. Não há correção de produto ou cobertura a devolver ao construtor/tester. Nenhum arquivo existente foi alterado pelo revisor nesta atividade.
