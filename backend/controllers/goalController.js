const asyncHandler = require('express-async-handler')
const goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc Get Goals
// @route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {

    const goals = await goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc Set Goals
// @route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {


    if (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await goal.create({
        text: req.body.text,
        user: req.user.id

    })


    res.status(200).json(goal)



})

// @desc Update Goals
// @route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const user = await Goal.findByIdAndUpdate(req.params.id, req.body.body, {
        new: true,
    })

    if (!user) {
        res, status(401)
        throw new Error('User Not Found')
    }


    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedGoal = await goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, })

    res.status(200).json(updatedGoal)
})

// @desc Delete Goals
// @route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const user = await Goal.findByIdAndUpdate(req.params.id, req.body.body, {
        new: true,
    })

    if (!user) {
        res, status(401)
        throw new Error('User Not Found')
    }


    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    await goal.remove()
    res.status(200).json({
        id: req.params.id
    })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}