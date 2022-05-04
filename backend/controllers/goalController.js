const asyncHandler=require('express-async-handler')
const goal=require('../models/goalModel')

// @desc Get Goals
// @route Get /api/goals
//@access Private
const getGoals=asyncHandler(async (req,res) => {

    const goals=await goal.find({})
    res.status(200).json(goals)
})

// @desc Set Goals
// @route POST /api/goals
//@access Private
const setGoal=asyncHandler(async (req,res) => {


    if(!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal=await goal.create({
        text: req.body.text
    })


    res.status(200).json(goal)



})

// @desc Update Goals
// @route PUT /api/goals/:id
//@access Private
const updateGoal=asyncHandler(async (req,res) => {

    const goal=await goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }

    const updatedGoal=await goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true,})

    res.status(200).json(updatedGoal)
})

// @desc Delete Goals
// @route DELETE /api/goals
//@access Private
const deleteGoal=asyncHandler(async (req,res) => {

    const goal=await goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal Not Found')
    }


    await goal.remove()
    res.status(200).json({
        id: req.params.id
    })
})


module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}