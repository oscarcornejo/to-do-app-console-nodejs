const colors = require('colors');

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log('========================'.green);
    console.log(' Selecione una opción '.green);
    console.log('========================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Borrar tarea`);
    console.log(`${'6.'.green} Salir \n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};
const pausa = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
