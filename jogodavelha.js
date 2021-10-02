window.addEventListener('DOMContentLoaded', () => {
    const areas = Array.from(document.querySelectorAll('.area'));
    const playerDisplay = document.querySelector('.display-player');
    const botaoReiniciar = document.querySelector('#reiniciar');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let jogadorAtual = 'X';
    let jogoAtivo = true;

    const PLAYERX_GANHOU = 'PLAYERX_GANHOU';
    const PLAYERO_GANHOU = 'PLAYERO_GANHOU';
    const VELHA = 'VELHA';

    const condicoesVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function resultados() {
        let venceuRound = false;
        for (let i = 0; i <= 7; i++) {
            const condicoes = condicoesVitoria[i];
            const a = board[condicoes[0]];
            const b = board[condicoes[1]];
            const c = board[condicoes[2]];
            
            if (a === '' || b === '' || c === '') {
                continue;
            }
            
            if (a === b && b === c) {
                venceuRound = true;
                break;
            }
        }

        if (venceuRound) {
            announce(jogadorAtual === 'X' ? PLAYERX_GANHOU : PLAYERO_GANHOU);
            jogoAtivo = false;
            return;
        }

        if (!board.includes('')){
            announce(VELHA);
        }
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_GANHOU:
                announcer.innerHTML = 'Player <span class="playerO">O</span> ganhou';
                break;
            case PLAYERX_GANHOU:
                announcer.innerHTML = 'Player <span class="playerX">X</span> ganhou';
                break;
            case VELHA:
                announcer.innerText = 'Velha';
        }
        announcer.classList.remove('hide');
    };

    const acaoValida = (area) => {
        if (area.innerText === 'X' || area.innerText === 'O'){
            return false;
        }

        return true;
    };

    const atualizar =  (index) => {
        board[index] = jogadorAtual;
    }

    const mudarPlayer = () => {
        playerDisplay.classList.remove(`player${jogadorAtual}`);
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
        playerDisplay.innerText = jogadorAtual;
        playerDisplay.classList.add(`player${jogadorAtual}`);
    }

    const acao = (area, index) => {
        if(acaoValida(area) && jogoAtivo) {
            area.innerText = jogadorAtual;
            area.classList.add(`player${jogadorAtual}`);
            atualizar(index);
            resultados();
            mudarPlayer();
        }
    }
    
    const reiniciarBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        jogoAtivo = true;
        announcer.classList.add('hide');

        if (jogadorAtual === 'O') {
            mudarPlayer();
        }

        areas.forEach(area => {
            area.innerText = '';
            area.classList.remove('playerX');
            area.classList.remove('playerO');
        });
    }

    areas.forEach( (area, index) => {
        area.addEventListener('click', () => acao(area, index));
    });

    botaoReiniciar.addEventListener('click', reiniciarBoard);
});