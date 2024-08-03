const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a new backend url');
  process.exit(1);
}

const newUrl = args[0];
changeBackendUrl(newUrl);

function changeBackendUrl(url) {
  const environmentPath = path.join(__dirname, '../../src/environments/environment.production.ts');
  const environment = fs.readFileSync(environmentPath, 'utf8');

  const newEnvironment = environment.replace(/(baseUrl: ')(.*)(')/, `$1${url}$3`);

  fs.writeFileSync(environmentPath, newEnvironment);

  console.log(`Backend url changed to ${url}`);
}
