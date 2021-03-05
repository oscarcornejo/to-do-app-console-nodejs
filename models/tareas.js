const Tarea = require('./tarea');

/**
 * _listado:
 *  {'uuid-1234-1234-1': {id: 12, desc: lorem impsum, completadoEn: 976545 } },
 *  {'uuid-1234-1234-2': {id: 13, desc: lorem impsum, completadoEn: 976545 } },
 */

class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];
    Object.keys(this._listado).forEach((item) => {
      const tarea = this._listado[item];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArray.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completadoEn } = tarea;

      const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;

    this.listadoArray.forEach((tarea, index) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

      if (completadas) {
        // mostrar completadas
        if (completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green}. ${desc} :: ${completadoEn.green}`);
        }
      } else {
        // mostrar pendientes
        if (!completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
