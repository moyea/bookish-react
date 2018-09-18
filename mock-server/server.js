const jsonServer = require('json-server');
// const url = require('url');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const _ = require('lodash');
// const qs = require('qs');


// server.use((req, res, next) => {
//   console.log(req.query);
//   // const query = url.parse(req.url).query;
//   // req.query = qs.parse(query);
//   next();
// });

server.use((req, res, next) => {
  const parts = req.path.split('/');

  if (!_.isNaN(_.toNumber(_.last(parts)))) {
    req.entity = _.nth(parts, -2);
  } else {
    req.entity = _.last(parts);
  }
  next();
});

server.use((req, res, next) => {
  if (req.method === 'DELETE' && req.query['_cleanup']) {
    const db = router.db;
    db.set(req.entity, []).write();
    console.log('cleanup ok!');
    res.sendStatus(204);
  } else {
    next();
  }
});

server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is Running');
});
