let nombreX = document.getElementById("nombreX")
let nombre0 = document.getElementById("nombre0")
let puntajeX = document.getElementById("puntajeX")
let puntaje0 = document.getElementById("puntaje0")
let resultado = document.getElementById("resultado")
let cpuBtn = document.getElementById("cpuBtn");
let paneles = Array.from(document.querySelectorAll(".panel"))

let contadorX = 0;
let contador0 = 0;
let equis = true;
let dark = true;
let cpu = false;
patronGanador = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

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

const reiniciar=()=>{
    paneles.forEach(panel => {
        panel.innerHTML=""
        panel.classList.remove("click")
        panel.classList.remove("afterClick")
    });
}

const verificarGanador = () => {
    for (let i = 0; i < 8; i++) {
        const condicion = patronGanador[i];
        const a = paneles[condicion[0] - 1].innerHTML;
        const b = paneles[condicion[1] - 1].innerHTML;
        const c = paneles[condicion[2] - 1].innerHTML;
        if (a !== "" && a === b && b === c) {
            if (a=="x") {
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

paneles.forEach(panel => {
    panel.addEventListener("mouseenter", () => {
        panel.classList.add("hover");
    });

    panel.addEventListener("mouseleave", () => {
        panel.classList.remove("hover");
    });

    panel.addEventListener("click", () => {
        if (panel.innerHTML === "") {
            panel.classList.add("click");

            setTimeout(() => {
                panel.classList.remove("click");
                panel.classList.add("afterClick");
            }, 600);
            
            setTimeout(() => {
                panel.classList.remove("afterClick");
                verificarGanador(); 
            }, 1200);
            
            if(!cpu){
                setTimeout(() => {
                    equis ? (panel.innerHTML = "x") : (panel.innerHTML = "o");
                }, 600);
            }else{
                panel.innerHTML = "x"
            }

            equis = !equis;
        }
    });
});