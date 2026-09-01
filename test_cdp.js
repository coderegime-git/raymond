const { spawn } = require('child_process');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=375,812',
    'http://localhost:8081/raymond/introduce-us.html'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const targets = await listRes.json();
    const target = targets.find(t => t.url.includes('introduce-us.html'));
    if (!target) return;

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        const handler = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === reqId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);
    await send('Runtime.enable');

    const res = await send('Runtime.evaluate', {
      expression: `new Promise(resolve => {
        const toggle = document.getElementById('mobile-toggle');
        toggle.click();
        setTimeout(() => {
          const drawer = document.getElementById('mobile-drawer');
          resolve({
            active: drawer.classList.contains('active'),
            left: getComputedStyle(drawer).left,
            rect: drawer.getBoundingClientRect()
          });
        }, 500);
      })`,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('After 500ms transition:', res.result.value);

    ws.close();
  } catch(e) {
    console.error('Error:', e);
  } finally {
    edge.kill();
  }
}

run();
