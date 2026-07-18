Projeto DevClub

O projeto consiste na criação de uma página institucional do DevClub que mostre quem é o DevClub: formações, quem somos, alunos, empresas que contratam, tutores.

Resolvi criar uma página utilizando os conhecimentos que tenho: HTML + CSS + JavaScript puros.

Estrutura

├── index.html - estrutura das seções
├── css/style.css - design + estilos
├── js/script.js - interações

A página conta também com alguns efeitos visuais:

buildGrid / animateAmbientGrid / drawTrendLine — geram e animam o grid de commits. No hero, células acendem/apagam aleatoriamente a cada 220ms (setInterval). Na seção final, um IntersectionObserver dispara
drawTrendLine quando a seção entra na viewport, acendendo as células que formam a curva ascendente.

Efeito de digitação (typeLoop) — cicla profissões anteriores dos alunos ("motorista de app", "vendedor"...) até chegar em "você", reforçando que qualquer pessoa pode migrar de carreira. Usa setTimeout
recursivo controlando um índice de caractere (charIndex) e um estado (deleting) pra saber se está escrevendo ou apagando.

Lanterna no hero — no mousemove, calcula a posição do cursor em porcentagem (getBoundingClientRect) e guarda em duas variáveis CSS (--mx, --my). O CSS usa essas variáveis dentro de um radial-gradient
pra desenhar o círculo de luz seguindo o mouse.

Scroll reveal genérico — um único IntersectionObserver observa qualquer elemento com a classe .reveal e adiciona .is-visible quando entra na tela (fade + slide via CSS transition, não JS animando estilo
direto — mais performático).

Contadores animados — anima os números da seção "quem somos" com requestAnimationFrame e easing ease-out cubic, disparado só quando a seção é vista.

Menu hamburguer — clique alterna a classe is-active no próprio botão; o CSS gira/esconde as 3 barrinhas formando um X.
