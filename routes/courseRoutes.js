const express = require('express');
const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController')
const router = express.Router();
const reviewRouter = require('./../routes/reviewRoutes');

//Use review router with this query
router.use('/:courseId/reviews', reviewRouter);

router
    .route('/top-5-courses')
    .get(courseController.topCourses, courseController.getAllCourses);
// router
//     .route('/course-stats')
//     .get(courseController.getCourseStats);
router
    .route('/')

    // authController.protect ensures only logged in users will be able to access certain routes
    //authController.restrictTo enables only specified users to access routes
    .get(authController.protect, 
        courseController.getAllCourses)
    .post(authController.protect,
        authController.restrictTo('admin', 'school'),
        courseController.createCourse,
    );
router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse,
        authController.restrictTo('admin', 'school'))
    .delete(authController.protect,
        authController.restrictTo('admin'), 
        courseController.deleteCourse);

router
    .route('/:id')
    .post('/register', authController.register)        

module.exports = router;

