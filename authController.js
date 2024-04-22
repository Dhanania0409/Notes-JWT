const User = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [];

app.post('/api/auth/register', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error creating the user');
    }
});

// exports.register = async (req, res) => {
//     try {
//         let user = await User.findOne({ username: req.body.username });
//         if (user) {
//             return res.status(400).send('User already exists');
//         }

//         // const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         user = new User({
//             username: req.body.username,
//             password: req.body.password
//         });
//         await user.save();

//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         console.error('Registration error:', error); 
//         res.status(500).send('Error creating the user');
//     }
// };

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send('User does not exist');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const payload = {
            id: user._id,
            username: user.username
        };

        jwt.sign(
            payload,
            '744f89b17f6c97053eb8e7aca7dc0c120a9fcb755ffcf2cc087be168947c6eef591811eb5a1fd9db447f2f1263a8c14bbbaa5af15c150982b606a7a3d4d35f96', 
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
    } catch (error) {
        res.status(500).send('Server error');
    }
};
