const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const _ = require('lodash');

const relations = {
  'books': 'reviews'
};

function buildRewrite(relations) {
  return _.reduce(relations, (acc, embed, resources) => {
    acc[`/${resources}/:id`] = `/${resources}/:id?_embed=${embed}`;
    console.log(acc);
    return acc;
  }, {});
}

server.use(jsonServer.bodyParser);

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
    if (relations[req.entity]) {
      db.set(relations[req.entity], []).write();
    }
    res.sendStatus(204);
  } else {
    next();
  }
});

// 记录post提交的数据
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('post data:=>', JSON.stringify(req.body));
  }
  next();
});

server.use(middlewares);
server.use(jsonServer.rewriter(buildRewrite(relations)));
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is Running at: 8080');
});
