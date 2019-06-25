const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/shoppingMongoose',
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'nightwayne', 
  resave: false, 
  saveUninitialized: false,
  store: store
}))

app.use((req, res, next) => {
  if (!req.session.user) {
    //console.log('hresasasre');
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      //console.log('hrere');
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
 });


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// //atlas
// mongoose
// .connect(
//   'mongodb+srv://###username###:###pwd###@cluster0-tr9bs.mongodb.net/shoppingMongoose?retryWrites=true&w=majority'
// )
// //local server
mongoose.connect('mongodb://localhost:27017/shoppingMongoose', {useNewUrlParser: true})
.then(result => {
  console.log('Connected to local server!');
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'nightwayne',
        email: 'abc@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});