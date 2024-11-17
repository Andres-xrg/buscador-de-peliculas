const tipo = document.getElementById('tipo');
const busqueda = document.getElementById('busqueda');
const boton = document.getElementById('buscar');
const resultados = document.getElementById('resultados');

tipo.addEventListener('change', () => {
    alert(`su categoria es: ${tipo.value}`);
});

busqueda.addEventListener('keydown', (e) => {
    if (!/[a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(e.key) && e.key !== "Backspace") {
        e.preventDefault();
    }
});

boton.addEventListener('click', async () => {
    const archivo = tipo.value; 
    const query = busqueda.value.toUpperCase().trim();
    resultados.innerHTML = '';

    try {
        const response = await fetch(archivo);
        const data = await response.json();

        const encontrados = data.data.filter(item =>
            item.nombre.startsWith(query)
        );

        if (encontrados.length === 0) {
            resultados.innerHTML = '<li>No se encontraron resultados</li>';
        } else {
            encontrados.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.nombre;

                const p = document.createElement('p');
                p.textContent = item.sinopsis;
                p.style.display = 'none';

                li.addEventListener('mouseover', () => {
                    p.style.display = 'block';
                });

                li.addEventListener('mouseout', () => {
                    p.style.display = 'none';
                });

                li.appendChild(p);
                resultados.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
    }
});
