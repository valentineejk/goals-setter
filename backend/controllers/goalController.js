const asyncHandler=require('express-async-handler')

// @desc Get Goals
// @route Get /api/goals
//@access Private
const getGoals=asyncHandler(async (req,res) => {

    res.status(200).json({
        "message": "Get Goals"
    })
})
// @desc Set Goals
// @route POST /api/goals
//@access Private
const setGoal=asyncHandler(async (req,res) => {


    if(!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({
        "message": "create Goals"
    })
})
// @desc Update Goals
// @route PUT /api/goals/:id
//@access Private
const updateGoal=asyncHandler(async (req,res) => {
    res.status(200).json({
        "message": `Update Goal ${req.params.id}`
    })
})
// @desc Delete Goals
// @route DELETE /api/goals
//@access Private
const deleteGoal=asyncHandler(async (req,res) => {
    res.status(200).json({
        "message": `Update Goal ${req.params.id}`
    })
})
module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}