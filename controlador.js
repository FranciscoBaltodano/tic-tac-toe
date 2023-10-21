let mode = document.getElementById("mode");
let nombreX = document.getElementById("nombreX");
let nombre0 = document.getElementById("nombre0");
let puntajeX = document.getElementById("puntajeX");
let puntaje0 = document.getElementById("puntaje0");
let resultado = document.getElementById("resultado");
let paneles = Array.from(document.querySelectorAll(".panel"));

let contadorX = 0;
let contador0 = 0;
let dark = true;
let equis = true;
let cpuPuedeJugar = false;

patronGanador = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
patronCPU = [[0,1,2],[3,4,5],[6,7,8],
            [1,2,0],[4,5,3],[7,8,6],
            [0,2,1],[3,5,4],[6,8,7],
            [0,3,6],[1,4,7],[2,5,8],
            [3,6,0],[4,7,1],[5,8,2],
            [0,6,3],[1,7,4],[2,8,5],
            [0,4,8],[4,8,0],[0,8,4],
            [6,4,2],[2,4,6],[6,2,4]];

paneles.forEach(panel => {
    // Animaciones
    panel.addEventListener("mouseenter", () => {
        panel.classList.add("hover");
    });
    panel.addEventListener("mouseleave", () => {
        panel.classList.remove("hover");
    });

    // Al hacer click en un panel
        panel.addEventListener("click", () => {
                
            // si el panel esta disponible (vacio)
                if (panel.innerHTML === "") {     
                    
                    // Animaciones
                        panel.classList.add("click");
                        setTimeout(() => {
                            panel.classList.remove("click");
                            panel.classList.add("afterClick");
                        }, 600);

                    // Animacion y movimiento del CPU
                        setTimeout(() => {
                                panel.classList.remove("afterClick");
                                verificarGanador(); 
                                if(cpuPuedeJugar){
                                    cpuMovimiento();
                                };
                        }, 1200);
                        
                    // llenar el panel
                        setTimeout(() => {
                                if(cpuPuedeJugar){
                                    panel.innerHTML = "x";
                                }else{
                                    equis ? (panel.innerHTML = "x") : (panel.innerHTML = "o");
                                }
                        }, 600);

                    // Cambiar de equis a cero
                        equis = !equis;
                };
        });
});

const modoDeJuego=()=>{
    cpuPuedeJugar = !cpuPuedeJugar;

    cpuPuedeJugar ? 
        (mode.innerHTML="2 Players",
        nombre0.value=" CPU",
        resultado.innerText="Modo de juego: Contra el CPU")
        : 
        (mode.innerHTML="CPU MODE",
        nombre0.value="Player0",
        resultado.innerText="Modo de juego: 2PLAYERS");

    reiniciar();
};

const verificarGanador = () => {
    for (let i = 0; i < 8; i++) {
        const condicion = patronGanador[i];
        const a = paneles[condicion[0] - 1];
        const b = paneles[condicion[1] - 1];
        const c = paneles[condicion[2] - 1];
        if (a.innerHTML !== "" && a.innerHTML === b.innerHTML && b.innerHTML === c.innerHTML) {
            
            a.style.backgroundColor="green"
            b.style.backgroundColor="green"
            c.style.backgroundColor="green"
            
            setTimeout(() => {
                a.style.backgroundColor="#5d5d5e38"
                b.style.backgroundColor="#5d5d5e38"
                c.style.backgroundColor="#5d5d5e38"
            }, 1000);
            
            if (a.innerHTML=="x") {
                resultado.innerHTML=`El ganador es ${nombreX.value}`;
                contadorX ++
            } else {
                resultado.innerHTML=`El ganador es ${nombre0.value}`;
                contador0 ++
            }       
            puntajeX.innerText = contadorX;
            puntaje0.innerText = contador0;
            reiniciar();
        }
    }
};

const cpuMovimiento = () => {
    if (paneles.every(panel => panel.innerHTML !== "")) {
        // Todas las casillas están llenas, terminar la función sin hacer ningún movimiento
        reiniciar();
    }

    for (let i = 0; i < patronCPU.length; i++) {
        const [pos1, pos2, pos3] = patronCPU[i];
        if (paneles[pos1].innerHTML === "x" && paneles[pos2].innerHTML === "x" && paneles[pos3].innerHTML === "") {
            paneles[pos3].innerHTML = "o";
            verificarGanador();
            return;
        }
    }
    // Si no hay una jugada específica para bloquear al jugador, hacer un movimiento aleatorio
    let numero;
    do {
        numero = Math.floor(Math.random() * 9);
    } while (paneles[numero].innerHTML !== "");

    paneles[numero].innerHTML = "o";
    verificarGanador();
};

const reiniciar=()=>{
    paneles.forEach(panel => {
        panel.innerHTML=""
        panel.classList.remove("click")
        panel.classList.remove("afterClick")
    });
};

const darkMode = () => {
    let body = document.body; 
    if (dark) {
        body.style.backgroundColor = "#00192f";
        body.style.color = "white";
    } else {
        body.style.backgroundColor = "white"; 
        body.style.color = "#002342";
    }
    body.style.transition = "3s";
    dark = !dark;
}



