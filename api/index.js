const { handle } = require('../lib/router');
module.exports = async (req, res) => { if (!(await handle(req, res))) res.writeHead(404).end(); };
