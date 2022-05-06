const express = require('express')
const router = express.Router()

const CreateService = require('../services/Create')
const RetrieveService = require('../services/Retrieve')
const UpdateService = require('../services/Update')
const DeleteService = require('../services/Delete')
const RegistrationService = require('../services/Registration')
const GenerateBarcode = require('../services/GenerateBarcode')

router.post(`/registration`, async (req, res) => {
  const { name, barcode, idNumber, dateOfBirth, address, phone, email, socialMedia, urgencyName, urgencyPhone } = req.body;
  var birthDate = new Date(dateOfBirth).toLocaleDateString();
  var joinDate = new Date().toLocaleDateString();
  const result = await RegistrationService(name, barcode, idNumber, birthDate, address, phone, email, socialMedia, urgencyName, urgencyPhone, joinDate);
  if (result) {
    res.status(200).send({
      status: result,
      message: "Successfully Registered!"
    })
  } else {
    console.log(result);
    res.status(500).send({
      status: result,
      message: "Register Failed!"
    })
  }
})

router.post(`/create`, async (req, res) => {
  const { username, password } = req.body

  const results = await CreateService(username, password)

  if (results) {
    res
      .status(200)
      .send({
        status: results,
        message: "Successfully Created!"
      })
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: "Not Created!"
      })
  }
})

router.post(`/get-credentials`, async (req, res) => {
  const {email} = req.body;
  const result = await RetrieveService(email);
  if (result) {
    console.log(result[0]);
    res.status(200).send({
      status: true,
      message: "Successfully Registered!",
      data: result[0]
    })
  } else {
    console.log(false);
    res.status(500).send({
      status: result,
      message: "Register Failed!"
    })
  }
})

router.post(`/generate-barcode`, async (req, res) => {
  const {barcode} = req.body;
  createdDate = new Date().toLocaleDateString();
  const result = await GenerateBarcode(barcode, createdDate);
  if (result) {
    res.status(200).send({
      status: true,
      message: "Successfully Registered!",
      data: result
    })
  } else {
    console.log(false);
    res.status(500).send({
      status: result,
      message: "Generate Barcode Failed!" 
    })
  }
})

// router.post(`/get-credentials` , async (req, res) => {
//   const { email } = req.body

//   const results = await RetrieveService(email)

//   if (results) {
//     res
//       .status(200)
//       .send(results[0])
//     // console.log(result);
//   } else {
//     res
//       .status(500)
//       .send({
//         status: results,
//         message: "Not Retrieved!"
//       })
//   }
// })

router.get(`/retrieve`, async (req, res) => {
  const { fields } = req.query

  const results = await RetrieveService(fields)

  if (results) {
    res
      .status(200)
      .send(results)
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: "Not Retrieved!"
      })
  }
})

router.post(`/update`, async (req, res) => {
  const { id, newUsername, newPassword } = req.body

  const results = await UpdateService(id, newUsername, newPassword)

  if (results) {
    res
      .status(200)
      .send({
        status: results,
        message: "Successfully Updated!"
      })
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: "Not Updated!"
      })
  }
})

router.get(`/delete`, async (req, res) => {
  const { id } = req.query

  const results = await DeleteService(id)

  if (results) {
    res
      .status(200)
      .send({
        status: results,
        message: "Successfully Deleted!"
      })
  } else {
    res
      .status(500)
      .send({
        status: results,
        message: "Not Deleted!"
      })
  }
})

module.exports = router