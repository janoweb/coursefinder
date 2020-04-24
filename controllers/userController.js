const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const basic = require('./basicHandler');

const filterObj = (obj, ...allowedFields)=> {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] =obj[el]; 
    })
    return newObj;
}

exports.getAllUsers = catchAsync (async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status : 'success',
        result : users.length,
        data : { 
            users
        }
    }); 
});

exports.updateMe = catchAsync (async (req, res, next) => {
    //1. create error if users tries to update the password
    if (req.body.password || req.body.confirmPassword) {
        return next(new AppError('Unavailable! To update your password, please go to updateMyPassword!', 400))
    }
    //2. Filter out unwanted field names
    const filteredBody = filterObj(req.body, 'name', 'email');

    //3. Update user
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true, 
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async( req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
})

exports.getUser = (req, res) => {
    res.status(500).json({
        status : 'error', 
        message: 'This route is not yet implemented'
    });
}
exports.createUser = (req, res) => {
    res.status(500).json({
        status : 'error', 
        message: 'This route is not yet implemented'
    });
}

//Admin routes for CRUD on users:
exports.updateUser = basic.updateOne(User); //Do NOT update password using this function.
exports.deleteUser = basic.deleteOne(User);