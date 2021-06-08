const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
require("dotenv").config();
<<<<<<< HEAD

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
=======
const auth = require("../auth");
>>>>>>> main

router.post("/signup", async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // creating User Model after registration
    const userData = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isTutor: req.body.isTutor,
    };
    const userRegistration = await User.create(userData);
    auth.createJwtSession(req, res, userRegistration);
    res.status(201).json();
    // TODO: if (isTutor === true) {res.render('quiz')}

<<<<<<< HEAD
        res.status(201).json(userRegistration);
    });

    // TODO: if (isTutor === true) {res.render('quiz')}
    // users.push(req.body);
    // res.status(201).send(req.body);
=======
>>>>>>> main
    // handle unique username
});


router.post("/login", async (req, res) => {
    const currentUser = await User.findOne({
        where: { username: req.body.username },
    });
    if (!currentUser) {
        res.status(404).send("Incorrect User name, would you like to sign up?");
    }
    console.log("this is current" + currentUser);
    try {
        if (await bcrypt.compare(req.body.password, currentUser.password)) {
            currentUser.password = undefined;
            auth.createJwtSession(req, res, currentUser);
            res.status(302).redirect("/profile");
        } else {
            res.status(404).send("Incorrect Password");
        }
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

//profile page update user data
// update product data

// TODO:
router.put("/user/:id", (req, res) => {
    try {
        User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: "Profile successfully updated!" });
    } catch (err) {
        res.status(500).send(`${err}`);
    }
});

<<<<<<< HEAD
router.post("/tutor", async (req, res) => {
    const plainTutor = await User.findOne({
        where: { username: req.body.tutorUsername },
    });
    if (!searchedTutor) {
        // TODO: replace .send with a view modification
        res.status(404).send(
            "This Tutor does not exist or that user is not a tutor"
        );
    }
    const plainTutor = searchedTutor.get({ plain: true });
    res.render("tutors", { plainTutor });
});

=======
router.post(
    "/tutor",
    [auth.isLoginNeeded, auth.loadUserDataFromJwtSession],
    async (req, res) => {
        const plainTutor = await User.findOne({
            where: { username: req.body.tutorUsername, isTutor: true },
        });
        if (!plainTutor) {
            // TODO: replace .send with a view modification
            res.status(404).send(
                "This Tutor does not exist or that user is not a tutor"
            );
        }
        const tempTutor = searchedTutor.get({ plain: true });
        res.render("tutors", { plainTutor });
    }
);

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.reset();
    }
    res.redirect("/");
});
>>>>>>> main
module.exports = router;
