
//Express Imports
const router = require('express').Router();
//place in express imports
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//Sequelize Imports
const { User } = require('../../db/models');


//Middleware Imports
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

//Middleware
router.use(restoreUser);

//routes for api (place under middlewares)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

// Keep this route to test frontend setup in Mod 5
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


//Routes
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;



