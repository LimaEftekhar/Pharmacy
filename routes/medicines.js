const express = require("express");
const router = express.Router();

const {
  getAllMedicines,
  getMedicine,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicines");

router.route('/').post(addMedicine).get(getAllMedicines)
router.route('/:id').get(getMedicine).delete(deleteMedicine).patch(updateMedicine)


module.exports= router