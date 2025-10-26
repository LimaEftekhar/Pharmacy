const Medicine = require('../models/medicine')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


//Get all medicines
const getAllMedicines = async (req, res) =>{
    const medicines = await Medicine.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({medicines, count: medicines.length})
}

//Get a job
const getMedicine = async (req, res) =>{
    const {
        user: {userId},
        params: {id: medicineId},
    } = req

    const medicine = await Medicine.findOne({
        _id: medicineId,
        createdBy: userId,
    })

    if (!medicine) {
        throw new NotFoundError(`No medicine with id ${medicineId}`)
    }
    res.status(StatusCodes.OK).json({medicine})
}

//create a medicine record
const addMedicine = async (req, res) =>{
 req.body.createdBy = req.user.userId
  const medicine = await Medicine.create(req.body)
  res.status(StatusCodes.CREATED).json({ medicine })
}

//update a medicine record
const updateMedicine = async (req, res) =>{
    const {
        body: {name, costPrice, sellingPrice, quantity, expirationDate},
        user: {userId},
        params: {id: medicineId},
    } = req
    if (name === '' || costPrice === '' || sellingPrice === '' || quantity ==='' || expirationDate === '' ) {
        throw new BadRequestError('required fields cannot be empty')
    }

    const medicine = await Medicine.findByIdAndUpdate(
        {_id: medicineId, createdBy: userId },
        req.body,
        {new: true, runValidators: true}
    )

    if(!medicine){
        throw new NotFoundError(`No medicine with id ${medicineId}`) 
    }

    res.status(StatusCodes.OK).json({medicine})
}

// delete a medicine record
const deleteMedicine = async (req, res) =>{
    const {
        user: {userId},
        params: {id: medicineId},
    } = req

    const medicine = await Medicine.findByIdAndDelete({
        _id: medicineId,
        createdBy: userId,
    })

    if(!medicine){
        throw new NotFoundError(`No medicine with id ${medicineId}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllMedicines,
    getMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine
}
