const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

console.log("Initializing Passport Local Strategy...");

// Authentication Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received Credentials:', username);

        // Find the user by username
        const user = await Person.findOne({ username });

        if (!user) {
            console.log('User not found');
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password); 

        if (isPasswordMatch) {
            console.log('Login Successful');
            return done(null, user);
        } else {
            console.log('Incorrect Password');
            return done(null, false, { message: 'Incorrect password.' });
        }
    } catch (err) {
        console.error("Error in authentication:", err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Person.findById(id).select('-password');
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
