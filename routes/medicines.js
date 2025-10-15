const express = require("express");
const router = express.Router();

const {
  getAllMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicines");

router.route('/').post(createMedicine).get(getAllMedicines)
router.route('/:id').get(getMedicine).delete(deleteMedicine).patch(updateMedicine)


module.exports= router