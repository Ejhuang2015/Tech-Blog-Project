// Dependencies
// =============================================================
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const passport = require("passport");
const querystring = require("querystring");
const withAuth = require('../utils/auth');

require("dotenv").config();

// Get Routes (Read)
// =============================================================
// Homepage
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['name'] },
      ],
    });
    // Convert postData into a more readable format
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render the page via Handlebars
    res.render('homepage', { posts, loggedIn: res.locals.isAuthenticated });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Blog Post Page
router.get('/post/:id', async (req, res) => {
  try {
    // Get the specific post's data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Comment, include: [{ model: User, attributes: ['name'] }] },
      ],
    });
    // Convert postData into a more readable format
    const posts = postData.get({ plain: true });
    // Render the page via Handlebars
    res.render('post', { ...posts, loggedIn: res.locals.isAuthenticated });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        { model: User, attributes: ["name"] }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: res.locals.isAuthenticated });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logged OUt
router.get("/loggedOut", (req, res) => {
  res.render('loggedOut');
});
// Authentication Routes
// =============================================================
// Login
router.get('/login', passport.authenticate("auth0", { scope: "openid email profile" }), (req, res) => {
  try {
    // res.render('login');
    // Redirect to main page
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Callback
router.get("/callback", (req, res, next) => {
  // Check user authentication
  passport.authenticate("auth0", (err, user, info) => {
    // If error, throw error
    if (err) {
      return next(err);
    }
    // If user does not exist, redirect back to login page.
    if (!user) {
      return res.redirect("/login");
    }
    //Login and authenticate the user
    req.logIn(user, async (err) => {
      // If error, throw error
      if (err) {
        return next(err);
      }
      // Redirect user to previous page or main page and delete session.
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;

      // Store the id and email into the model database (Check if it exists first)
      const checkUserExist = await User.findAll({
        where: {
          id: user.id
        }
      });
      if (checkUserExist && checkUserExist.length > 0) {
        // Redirect to homepage
        res.redirect(returnTo || "/");
      } else {
        const newUser = await User.create({
          id: user.id,
          name: user.displayName,
          email: user.displayName,
        })
        // Redirect to the "fill in information" screen which asks for a name/username
        // If left empty, use email
        res.redirect(returnTo || "/"); //Temp
      }
    });
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logOut();

  // Create the return to URL after logging out
  let returnTo = req.protocol + "://" + req.hostname;
  // If using local host + port, change URL to include port
  const port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = process.env.NODE_ENV === "production" ? `${returnTo}/` : `${returnTo}:${port}/`;
  }

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies, requires https
  }

  // Logout through auth0 and go to log out page
  const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: `${returnTo}loggedOut`,
  });
  logoutURL.search = searchString;
  logoutURL.searchParams
  res.redirect(logoutURL);
});

// Exports
// =============================================================
module.exports = router;