const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareaBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir el Menú
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Crear Tarea
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;

      case '2':
        // Listar Tareas
        tareas.listadoCompleto();
        break;

      case '3':
        // Listar Completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case '4':
        // Listar Pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        // Listar Pendientes
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);
        break;
      case '6':
        // Listar Pendientes
        const id = await listadoTareaBorrar(tareas.listadoArray);

        if (id !== '0') {
          const confirm = await confirmar('¿Está seguro que deseas borrar esta tarea?');

          if (confirm) {
            tareas.borrarTarea(id);
            console.log('Tarea borrada con éxito');
          }
        }

        break;
    }

    guardarDB(tareas.listadoArray);

    await pausa();
  } while (opt !== '0');
};

main();
