const Joi = require('joi');
const express = require('express');
const app = express();
const courses = [
    { id: 1, courseName: 'python' },
    { id: 2, courseName: 'java' },
    { id: 3, courseName: 'C And C++' },
];

app.use(express.json());

// validate Schema
const schema = Joi.object({
    courseName: Joi.string().min(2).required(),
});

// post request
app.post('/api/courses', (req, res) => {

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        courseName: req?.body?.courseName,
    };
    courses.push(course);
    res.send({ course, courses });
    console.log(courses);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port ${port} is listen`));