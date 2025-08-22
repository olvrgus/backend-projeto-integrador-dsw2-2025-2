
# [Título do seu projeto]
 Doom’s Disk — loja virtual de discos

## 1) Problema

     Colecionadores e donos de loja de vinil sofrem para organizar e cadastrar seus discos em suas coleções ou em lojas virtuais simples. A falta de organização no catálogo, dificuldade de buscar por artista, ano ou gênero e a ausência de um sistema prático atrapalham, fazendo com que eles percam tempo ou comprem discos repetidos. Isso importa porque uma experiência confusa desestimula o colecionador e dificulta o acesso aos discos desejados. O objetivo do projeto é criar uma aplicação web que organize os discos de vinil, oferecendo busca e filtros, facilitando o gerenciamento da coleção e melhorando a experiência do usuário.


Colecionadores, em suas lojas virtuais, tem dificuldade em organizar e listar seus discos.
Isso causa desordem e desperdicio de tempo.
No início, o foco será colecionadores com o objetivo de cadastrar seus discos corretamente em suas lojas, listando preço, gênero, artista, ano e condição.


## 2) Atores e Decisores (quem usa / quem decide)


Usuários principais: Clientes e Visitantes
Decisores/Apoiadores: O dono da loja que quer cadastrar os seus discos


## 3) Casos de uso (de forma simples)


Todos: [ações comuns, ex.: Logar/deslogar; Manter dados cadastrais]
Cliente: Logar/deslogar; Manter dados cadastrais, adicionar e remover produtos do carrinho de compras.
Dono da Loja: Manter dados sobre os produtos, manter produtos e categorias no sistema.


## 4) Limites e suposições


Limites: data de entrega final do projeto (30/11),  
Suposições: internet, navegador, GitHub, tempo de teste de 10 minutos
Plano B: caso não haja internet, rodar o arquivo local caso tenha a opção de salvar no local storage.


## 5) Hipóteses + validação
<!-- Preencha as duas frases abaixo. Simples e direto.
     EXEMPLO Valor: Se o aluno ver sua posição na fila, sente mais controle e conclui melhor a atividade.
     Validação: teste com 5 alunos; sucesso se ≥4 abrem/fecham chamado sem ajuda.
     EXEMPLO Viabilidade: Com app no navegador (HTML/CSS/JS + armazenamento local),
     criar e listar chamados responde em até 1 segundo na maioria das vezes (ex.: 9 de cada 10).
     Validação: medir no protótipo com 30 ações; meta: pelo menos 27 de 30 ações (9/10) em 1s ou menos. -->
H-Valor: Se o cliente consegue filtrar o gênero, ano, artista, preço, e condição do disco que procura, então consegue otimizar sua experiência de compra, logo melhora a sua experiência/usabilidade geral e melhora a reputação da loja.


Validação (valor): teste rápido com o professor; sucesso se conseguir manter produtos no sistema/adicionar e remover do carrinho: [meta simples].


H-Viabilidade: Com  a aplicação no navegador (HTML/CSS/JS + armazenamento local), manter e listar produtos em até 1 segundo na maioria das vezes (ex.: 9 de cada 10).  


Validação (viabilidade): [me dição no protótipo]; meta: [n] s ou menos na maioria das vezes (ex.: 9/10).


## 6) Fluxo principal e primeira fatia
<!-- Pense “Entrada → Processo → Saída”.
     EXEMPLO de Fluxo:
     1) Aluno faz login
     2) Clica em "Pedir ajuda" e descreve a dúvida
     3) Sistema salva e coloca na fila
     4) Lista mostra ordem e tempo desde criação
     5) Professor encerra o chamado
     EXEMPLO de 1ª fatia:
     Inclui login simples, criar chamado, listar em ordem.
     Critérios de aceite (objetivos): criar → aparece na lista com horário; encerrar → some ou marca "fechado". -->
**Fluxo principal (curto):**  
1) [entrada do usuário] → 2) [processo] → 3) [salvar algo] → 4) [mostrar resultado]


**Primeira fatia vertical (escopo mínimo):**  
Inclui: [uma tela], [uma ação principal], [salvar], [mostrar algo]  
Critérios de aceite:
- [Condição 1 bem objetiva]
- [Condição 2 bem objetiva]


## 7) Esboços de algumas telas (wireframes)
<!-- Vale desenho no papel (foto), Figma, Excalidraw, etc. Não precisa ser bonito, precisa ser claro.
     EXEMPLO de telas:
     • Login
     • Lista de chamados (ordem + tempo desde criação)
     • Novo chamado (formulário simples)
     • Painel do professor (atender/encerrar)
     EXEMPLO de imagem:
     ![Wireframe - Lista de chamados](img/wf-lista-chamados.png) -->
[Links ou imagens dos seus rascunhos de telas aqui]


## 8) Tecnologias
<!-- Liste apenas o que você REALMENTE pretende usar agora. -->


### 8.1 Navegador
**Navegador:** [HTML/CSS/JS| /Bootstrap/., se houver]  
**Armazenamento local (se usar):** [LocalStorage/IndexedDB/—]  
**Hospedagem:** [GitHub Pages/—]


### 8.2 Front-end (servidor de aplicação, se existir)
**Front-end (servidor):** [ex.: Next.js/React/—]  
**Hospedagem:** [ex.: Vercel/—]


### 8.3 Back-end (API/servidor, se existir)
**Back-end (API): JS com Express 
**Banco de dados: MySQL
**Deploy do back-end: GitHub


## 9) Plano de Dados (Dia 0) — somente itens 1–3
<!-- Defina só o essencial para criar o banco depois. -->


### 9.1 Entidades
<!-- EXEMPLO:
     - Usuario — pessoa que usa o sistema (aluno/professor)
     - Chamado — pedido de ajuda criado por um usuário -->
- [Entidade 1] — [o que representa em 1 linha]
- [Entidade 2] — [...]
- [Entidade 3] — [...]


### 9.2 Campos por entidade
<!-- Use tipos simples: uuid, texto, número, data/hora, booleano, char. -->


### Usuario
| Campo           | Tipo                          | Obrigatório | Exemplo            |
|-----------------|-------------------------------|-------------|--------------------|
| id              | número                        | sim         | 1                  |
| nome            | texto                         | sim         | "Ana Souza"        |
| email           | texto                         | sim (único) | "ana@exemplo.com"  |
| senha_hash      | texto                         | sim         | "$2a$10$..."       |
| papel           | número (0=aluno, 1=professor) | sim         | 0                  |
| dataCriacao     | data/hora                     | sim         | 2025-08-20 14:30   |
| dataAtualizacao | data/hora                     | sim         | 2025-08-20 15:10   |


### Chamado
| Campo           | Tipo               | Obrigatório | Exemplo                 |
|-----------------|--------------------|-------------|-------------------------|
| id              | número             | sim         | 2                       |
| Usuario_id      | número (fk)        | sim         | 8f3a-...                |
| texto           | texto              | sim         | "Erro ao compilar"      |
| estado          | char               | sim         | 'a' \| 'f'              |
| dataCriacao     | data/hora          | sim         | 2025-08-20 14:35        |
| dataAtualizacao | data/hora          | sim         | 2025-08-20 14:50        |


### 9.3 Relações entre entidades
<!-- Frases simples bastam. EXEMPLO:
     Um Usuario tem muitos Chamados (1→N).
     Um Chamado pertence a um Usuario (N→1). -->
- Um [A] tem muitos [B]. (1→N)
- Um [B] pertence a um [A]. (N→1)






