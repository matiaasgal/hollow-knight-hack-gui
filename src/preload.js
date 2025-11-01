const { contextBridge } = require('electron');
const { spawn } = require('child_process');

contextBridge.exposeInMainWorld('electronAPI', {
  ejecutarScriptDinero: (dinero) => {
    return new Promise((resolve, reject) => {
      const pythonScript = spawn('python', ['./src/logic/money.py', dinero]);

      let stdout = '';
      let stderr = '';

      pythonScript.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonScript.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonScript.on('close', (code) => {
        console.log(`Proceso de Python terminado con código ${code}`);
        if (code === 0) {
          resolve(stdout.trim() || 'Operación completada exitosamente');
        } else {
          reject({ code, stderr: stderr.trim() });
        }
      });

      pythonScript.on('error', (err) => {
        reject({ error: err.message });
      });
    });
  },
});