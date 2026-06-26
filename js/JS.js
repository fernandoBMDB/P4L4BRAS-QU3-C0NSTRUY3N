document.addEventListener("DOMContentLoaded", () => {
    // === ELEMENTOS DEL DOM ===
    const botonesDificultad = document.querySelectorAll(".btn-dif");
    const btnIniciar = document.getElementById("btn-iniciar");
    const btnComprobar = document.getElementById("btn-comprobar");
    const palabraPantalla = document.getElementById("palabra-pantalla");
    const palabraUsuario = document.getElementById("palabra-usuario");
    const contadorAciertos = document.getElementById("contador-aciertos");
    const contadorErrores = document.getElementById("contador-errores");
    const palabraActualTxt = document.getElementById("palabra-actual");
    const esferasProgreso = document.querySelectorAll(".progreso-esferas .esfera");
    const etiquetaNivel = document.querySelector(".etiqueta-nivel");

    // === ESTADO DEL JUEGO ===
    let urlDestino = "NivelFacil.html"; 
    let aciertos = 0;
    let errores = 0;
    let indicePalabra = 1;
    const totalPalabras = 10;
    let dificultadActual = "FÁCIL";

    // === BANCO DE PALABRAS ===
    const bancoPalabras = {
        "FÁCIL": [
            ["Adios", "Adiós"], ["Aser", "Hacer"], ["Sapato", "Zapato"],
            ["Abeces", "A veces"], ["Minimo", "Mínimo"], ["Baca", "Vaca"],
            ["Arbol", "Árbol"], ["Difisil", "DifÍcil"], ["Protejido", "Protegido"], ["Con migo", "Conmigo"]
        ],
        "MEDIO": [
            ["Almuada", "Almohada"], ["Alrrededor", "Alrededor"], ["Pasiencia", "Paciencia"],
            ["Disiplina", "Diciplina"], ["Auja", "Aguja"], ["Talvez", "Tal vez"],
            ["Sancudo", "Zancudo"], ["Bivora", "Vibora"],
            ["Umano", "Humano"], ["Estravagante", "Extravagante"]
        ],
        "DIFÍCIL": [
             ["Epidemológico", "Epidemiológico"],
  ["exhuberante", "exuberante"],
  ["Venefisencia", "Beneficencia"],
  ["caractérez", "Caracteres"],
  ["vicisictud", "vicisitud"], ["Consiensia", "Consciencia"],
            ["Trasendencia", "trascendencia"], ["Contemporaneo", "Contemporáneo"],
            ["Venevolencia", "Benevolencia"], ["Estravagante", "Extravagante"]
        ]
    };

    // === SELECCIÓN DE DIFICULTAD ===
    botonesDificultad.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesDificultad.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            dificultadActual = boton.classList.contains("facil") ? "FÁCIL" :
                               boton.classList.contains("medio") ? "MEDIO" : "DIFÍCIL";

            urlDestino = boton.getAttribute("data-url");
            etiquetaNivel.textContent = `⭐ NIVEL: ${dificultadActual}`;
            reiniciarSimulador();
        });
    });

    // === BOTÓN INICIAR ===
    btnIniciar.addEventListener("click", () => {
        alert(`¡Cargando pantalla de juego: ${dificultadActual}!`);
        window.location.href = urlDestino;
    });

    // === BOTÓN COMPROBAR ===
    btnComprobar.addEventListener("click", validarPalabra);
    palabraUsuario.addEventListener("keypress", e => e.key === "Enter" && validarPalabra());

    // === VALIDACIÓN DE PALABRAS ===
    function validarPalabra() {
        const intento = palabraUsuario.value.trim().toLowerCase();
        const palabraCorrecta = bancoPalabras[dificultadActual][indicePalabra - 1][1].toLowerCase();

        if (!intento) {
            alert("Por favor, escribe una palabra antes de comprobar.");
            return;
        }

        if (intento === palabraCorrecta) {
            aciertos++;
            contadorAciertos.textContent = aciertos;
            marcarEsfera(indicePalabra, "completada");
            alert("¡Excelente! ¡Palabra correcta! 🎉");
        } else {
            errores++;
            contadorErrores.textContent = errores;
            alert(`¡Ups! La respuesta correcta era: ${palabraCorrecta} 💡`);
        }

        avanzarPalabra();
    }

    // === FUNCIONES AUXILIARES ===
    function avanzarPalabra() {
        if (indicePalabra < totalPalabras) {
            indicePalabra++;
            actualizarInterfazProgreso();
        } else {
            alert("¡Has terminado este nivel! Haz clic en Iniciar para cargar el siguiente.");
            reiniciarSimulador();
        }
    }

    function actualizarInterfazProgreso() {
        palabraActualTxt.textContent = indicePalabra;
        palabraPantalla.textContent = bancoPalabras[dificultadActual][indicePalabra - 1][0];

        esferasProgreso.forEach((esfera, idx) => {
            esfera.classList.toggle("activa", idx + 1 === indicePalabra);
        });

        palabraUsuario.value = "";
        palabraUsuario.focus();
    }

    function marcarEsfera(numero, clase) {
        if (esferasProgreso[numero - 1]) {
            esferasProgreso[numero - 1].classList.add(clase);
        }
    }

    function reiniciarSimulador() {
        aciertos = 0;
        errores = 0;
        indicePalabra = 1;
        contadorAciertos.textContent = aciertos;
        contadorErrores.textContent = errores;

        esferasProgreso.forEach(esfera => esfera.classList.remove("completada", "activa"));
        actualizarInterfazProgreso();
    }

    // Inicializar interfaz al cargar
    reiniciarSimulador();
});
