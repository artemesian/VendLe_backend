const express = require("express");
const router = express.Router();
const Payment = require("../controllers/payment_controller.js");

router.post("/payment/create", Payment.createPayment);
router.get("/payment", Payment.getAllPayment);
router.get("/payment/one", Payment.getOnePayment);
router.put("/payment/update", Payment.updatePayment);
router.delete("/payment/delete", Payment.deletePayment);
module.exports = router;
