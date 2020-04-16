const express = require('express');
const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController')
const router = express.Router();

// router.param('id', courseController.checkID);

router
    .route('/top-5-courses')
    .get(courseController.topCourses, courseController.getAllCourses);
// router
//     .route('/course-stats')
//     .get(courseController.getCourseStats);
router
    .route('/')

    // authController.protect ensures only logged in users will be able to view all courses
    .get(authController.protect, courseController.getAllCourses)
    .post(courseController.createCourse);
router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(authController.protect,
        authController.restrictTo('admin'), 
        courseController.deleteCourse);

module.exports = router;

