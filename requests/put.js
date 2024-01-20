const Joi = require('joi');
const express = require('express');
const app = express();
const courses = [
    { id: 1, courseName: 'python' },
    { id: 2, courseName: 'java' },
    { id: 3, courseName: 'C And C++' },
];

app.use(express.json());


app.put('/api/courses/:courseId', (req, res) => {

    const course = courses.find(i => i.id === parseInt(req.params.courseId));

    if (!course) res.status(404).send('The course with the given Id not found');

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.courseName = req.body.courseName;
    res.send(course);

});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port ${port} is listen`));