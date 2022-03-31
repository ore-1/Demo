
const grid = new Muuri('.grid', {
    layout: {
        rounding : false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    /*Los listener de los enlaces para las Categorias*/
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((element) => { 
        element.addEventListener('click', (event) => {
            event.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            event.target.classList.add('activo');

            const categoria = event.target.innerHTML.toLowerCase();
            categoria=== 'todos' ? grid.filter('[data-categoria]') :
            grid.filter(`[data-categoria ="${categoria}"]`);
        });
    });
    /*Los listner para la barra Busqueda con las etiquetas*/

    document.querySelector('#barra-busqueda').addEventListener('input', (event) => {
        const busqueda = event.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });
    /*Listener para imagenes*/
    
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((element) => {
       

        element.addEventListener('click', () => {
            const ruta = element.getAttribute('src');
            const descripcion = element.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });
    //listener del button cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });
    //listener del overlay

    overlay.addEventListener('click', (event) => {
        event.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});