// Función para manejar la carga de la imagen
function loadImage(event) {
    const file = event.target.files[0];
    const imgElement = document.getElementById("image");
    const reader = new FileReader();

    // Cargar la imagen seleccionada en el elemento <img>
    reader.onload = function () {
        imgElement.src = reader.result; // Establece la imagen cargada
        imgElement.style.display = "block"; // Muestra el elemento <img>

        console.log("Imagen cargada correctamente:", imgElement.src);
        classifyImage(); // Clasificar la imagen después de cargarla
    };

    reader.readAsDataURL(file); // Leer la imagen como DataURL
}

// Función para cargar el modelo y clasificar la imagen
async function classifyImage() {
    try {
        const imgElement = document.getElementById("image");

        // Cargar el modelo MobileNet
        const model = await mobilenet.load();
        console.log("Modelo cargado correctamente");

        // Clasificar la imagen
        const predictions = await model.classify(imgElement);
        console.log("Predicciones:", predictions);

        // Mostrar solo el primer resultado
        const topPrediction = predictions[0]; // Obtener la primera predicción
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Predicción: ${topPrediction.className} (${(topPrediction.probability * 100).toFixed(2)}%)`;
    } catch (error) {
        console.error("Error al clasificar la imagen:", error);
    }
}
