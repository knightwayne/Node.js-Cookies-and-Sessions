const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  //console.log(req.get('Cookie').split('=')[1])
  //const isLoggedIn=req.get('Cookie').split('=')[1].toString();
  console.log('getlogin', req.session)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false  //admin page option display only on login
  });
};

exports.postLogin = (req, res, next) => { 
  // User.findById('5cf8fd6b3729da711a22b13b')
  // .then(user => {
  //     req.session.isLoggedIn = true;
  //     req.session.user = user;
  //     req.session.save(err => {
  //       console.log(err);
  //       res.redirect('/');
  //     });
  //   })
  // .catch(err => console.log(err));
  console.log('postlogin1', req.session);
  req.session.isLoggedIn=true;
  console.log('postlogin2', req.session);
  //res.setHeader('Set-Cookie', 'loggedIn=true');
  //req.isLoggedIn = true;  //invalid after response is sent. Request Dead after Response Sent
    res.redirect('/');
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log('Session Cleared!')
    console.log(err);
    res.redirect('/');
  });
};


