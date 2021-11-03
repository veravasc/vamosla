/* JS Vera Vasconcelos | PROJETO 1 Web Design II | FBAUP | Docente Pedro Amado | outubro 2021 */

// DEFINIR VARIÁVEIS ------------------------------------------------------------------------------------------------------------------------

// Cursor
let mousePosX = 0,
    mousePosY = 0,
    delay = 8, // Delay da elipse difusa ao mover o rato 
    revisedMousePosX = 0,
    revisedMousePosY = 0;

let timeout = 0; // Timeout para a elipse mover-se aleatoriamente com a inatividade do rato

// Cor aleatória para a elipse difusa
// Math.random retorna um número entre 0 e 1
let x = Math.floor(Math.random() * 150); //Red pode variar entre 0 e 150
let y = Math.floor(Math.random() * 100); //Green pode variar entre 0 e 100
let z = Math.floor(Math.random() * 130); //Blue pode variar entre 0 e 130
let cursorColor = 'rgb(' + x + ',' + y + ',' + z + ')';


// FUNÇÕES ----------------------------------------------------------------------------------------------------------------------------------

// Cursor
// Inspirado em https://getbutterfly.com/how-and-why-i-added-a-circle-following-my-mouse-pointer/
document.addEventListener('DOMContentLoaded', () => { // Apenas corre após o DOM estar carregado
    console.log('DOM completamente carregado'); // Manda a confirmação para a consola

    mouseCircle = document.getElementById('mouseCircle');

    // Função para quando o rato move
    document.onmousemove = (e) => { 
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    };

    // Delay ao mover o rato
    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);
        revisedMousePosX += (mousePosX - revisedMousePosX) / delay; // Através da posição X
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay; // Através da posição Y
        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }

    delayMouseFollow(); // Corre a função
});

// Cor aleatória para a elipse difusa
function randomCursorColor() {
    console.log('Cursor color ' + cursorColor);
    mouseCircle.style.background = cursorColor;
}

randomCursorColor();

// Parte central do cursor com biblioteca Kursor (https://lusaxweb.github.io/Kursor/)
new kursor({
    type: 1, //Existem 3 opções
    removeDefaultCursor: true
});

// Mudar o peso da tipografia consoante mouseover
function changeWeight1() {




    //document.querySelector('#word1').style.fontVariationSettings = '\'CNTR\' 90';
    document.querySelector('#word1').style.fontWeight = '900'; // Quando o rato está sobre a word1, muda o peso para 900, e...
    document.querySelector('#word2').style.fontWeight = '700'; // muda o peso da word2 para 700, e...
    document.querySelector('#word3').style.fontWeight = '480'; // word3 para 480...
    document.querySelector('#word4').style.fontWeight = '300';
    document.querySelector('#word5').style.fontWeight = '200';
    document.querySelector('#word6').style.fontWeight = '100';
}

function changeWeight2() {
    document.querySelector('#word1').style.fontWeight = '700'; 
    document.querySelector('#word2').style.fontWeight = '900'; // Quando o rato está sobre a word2, muda o peso para 900...
    document.querySelector('#word3').style.fontWeight = '700';
    document.querySelector('#word4').style.fontWeight = '480';
    document.querySelector('#word5').style.fontWeight = '300';
    document.querySelector('#word6').style.fontWeight = '200';
}

function changeWeight3() {
    document.querySelector('#word1').style.fontWeight = '480';
    document.querySelector('#word2').style.fontWeight = '700';
    document.querySelector('#word3').style.fontWeight = '900'; // Quando o rato está sobre a word3, muda o peso para 900...
    document.querySelector('#word4').style.fontWeight = '700';
    document.querySelector('#word5').style.fontWeight = '480';
    document.querySelector('#word6').style.fontWeight = '300';
}

function changeWeight4() {
    document.querySelector('#word1').style.fontWeight = '300';
    document.querySelector('#word2').style.fontWeight = '480';
    document.querySelector('#word3').style.fontWeight = '700';
    document.querySelector('#word4').style.fontWeight = '900'; // Quando o rato está sobre a word4, muda o peso para 900...
    document.querySelector('#word5').style.fontWeight = '700';
    document.querySelector('#word6').style.fontWeight = '480';
}

function changeWeight5() {
    document.querySelector('#word1').style.fontWeight = '200';
    document.querySelector('#word2').style.fontWeight = '300';
    document.querySelector('#word3').style.fontWeight = '480';
    document.querySelector('#word4').style.fontWeight = '700';
    document.querySelector('#word5').style.fontWeight = '900'; // Quando o rato está sobre a word5, muda o peso para 900...
    document.querySelector('#word6').style.fontWeight = '700';
}

function changeWeight6() {
    document.querySelector('#word1').style.fontWeight = '100';
    document.querySelector('#word2').style.fontWeight = '200';
    document.querySelector('#word3').style.fontWeight = '300';
    document.querySelector('#word4').style.fontWeight = '480';
    document.querySelector('#word5').style.fontWeight = '700';
    document.querySelector('#word6').style.fontWeight = '900'; // Quando o rato está sobre a word6, muda o peso para 900...
}




/*
function changeContrast1() {
    document.querySelector('#word1').style.fontVariationSettings = '\'CNTR\' 90';


}
*/


// EVENT LISTENERS --------------------------------------------------------------------------------------------------------------------------

// Event listeners para mudar peso da tipografia
word1.addEventListener('mouseover', changeWeight1);
word2.addEventListener('mouseover', changeWeight2);
word3.addEventListener('mouseover', changeWeight3);
word4.addEventListener('mouseover', changeWeight4);
word5.addEventListener('mouseover', changeWeight5);
word6.addEventListener('mouseover', changeWeight6);





//word1.addEventListener('mouseover', changeContrast1);



// Elipse difusa divaga sozinha quando deteta inatividade do utilizador durante 3 segundos (definido no idleTimeout) 
function idleTimeout(out, onIdle, onUnidle) {
    startTimer();

    function startTimer() {
        timeout = setTimeout(onExpires, out);
        document.addEventListener('mousemove', onActivity); // Deteta movimento do rato
        document.addEventListener('keypress', onActivity); // Deteta uso do teclado
    }

    function onExpires() {
        // Contar do 0
        timeout = 0;
        onIdle();
    }

    function onActivity() {
        if (timeout) clearTimeout(timeout);
        else onUnidle();
        // Turn off event listeners
        document.removeEventListener('mousemove', onActivity);
        document.removeEventListener('keypress', onActivity);
        setTimeout(startTimer, 1000);
    }
}

idleTimeout(3000, function () { // 3 segundos de inatividade
    $(document).ready(function () {
        animateMouse('#mouseCircle'); // Chamar a elipse difusa
    });

    function makeNewPosition() {
        // Às dimensões da janela subtrai o diâmetro da elipse difusa do rato (50)
        let h = $(window).height() - 50;
        let w = $(window).width() - 50;
        let nh = Math.floor(Math.random() * h);
        let nw = Math.floor(Math.random() * w);
        return [nh, nw];
    }

    function animateMouse(myclass) {
        let newq = makeNewPosition();
        $(myclass).animate({ top: newq[0], left: newq[1] }, 2000, function () {
            animateMouse(myclass);
        });
    }

}, function () {
    mouseCircle = document.getElementById('mouseCircle');

    document.onmousemove = (e) => { // Evento para quando o rato move
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    };

    // Voltar a chamar a função da elipse difusa que segue o rato
    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();
});

// Quando o scroll ultrapassa os 100px, esconde a seta scrolldown
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('img').fadeOut(); // Desaparecimento suave
    }
    else {
        $('img').fadeIn(); // Aparecimento suave
    }
});