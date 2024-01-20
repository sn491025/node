const Joi = require('joi');
const express = require('express');
const app = express();
const courses = [
    { id: 1, courseName: 'python' },
    { id: 2, courseName: 'java' },
    { id: 3, courseName: 'C And C++' },
];


app.use(express.json());

app.delete('/api/courses/:coursesId', (req, res) => {
    console.log(req.params);
    const course = courses.find(i => i.id === parseInt(req.params.coursesId));

    if (!course) return res.status(404).send('The course with the given Id not found');

    courses.splice(course, 1);
    res.send(courses)
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port ${port} is listen`));