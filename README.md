Projeto DevClub

O projeto consiste na criação de uma página institucional do DevClub que mostre quem é o DevClub: formações, quem somos, alunos, empresas que contratam, tutores.

Resolvi criar uma página utilizando os conhecimentos que tenho: HTML + CSS + JavaScript puros.

Estrutura

├── index.html      → estrutura das seções
├── css/style.css   → design + estilos
├── js/script.js    → interações

A página conta também com alguns efeitos visuais:

O sublinhado (_) piscando, utilizei o componente @keyframe e blink que diz "na metade do tempo, fique invisível", aplicada em loop infinito com trocas instantâneas, fazendo parecer um cursor piscando.

Trecho que digita as profissões: Utilizei o componente setTimeout recursivo, fazendo com que a função chame ela mesma de novo depois de um tempinho, controlando um "estado" (charIndex, deleting) que decide se está escrevendo ou apagando.

Um efeito de luz utilizando o componente de evento mousemove + variáveis CSS (--mx, --my). O JS só calcula a posição do mouse em porcentagem e guarda nessas variáveis; quem desenha o círculo de luz é o CSS (radial-gradient), que já está "escutando" essas variáveis.

Por mim, os quadrinhos de fundo preenchendo cor, utilizei o componente setInterval (repete a cada 220 milissegundos) + troca de className. O grid inteiro é um monte de <div> gerados por JS (buildGrid); a cada intervalo, um quadrado aleatório apaga e outro acende, dando aquela sensação de "atividade" contínua, tipo o gráfico de contribuições do GitHub.
