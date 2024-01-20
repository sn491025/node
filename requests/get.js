const express = require('express');
const app = express();
const courses = [
    { id: 1, coursesName: 'python' },
    { id: 2, coursesName: 'java' },
    { id: 3, coursesName: 'C And C++' },
];

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:courseId', (req, res) => {
    const course = courses.find(i => i.id === parseInt(req.params.courseId));

    if (!course) res.status(404).send('The course with the given Id not found ');
    res.send(course);
})

app.get('/api/courses/:coursesID/:coursesName', (req, res) => {
    res.send(req.params);
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port ${port} is listen`));