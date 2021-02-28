const express = require('express');
const {
    getCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(
        advancedResults(Course, {
            path: 'bootcamp',
            select: 'name description'
        }),
        getCourses
    )
    .post(protect, authorize('publisher', 'admin'), createCourse);

router
    .route('/:id')
    .get(getCourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse)
    .put(protect, authorize('publisher', 'admin'), updateCourse);

module.exports = router;
