const internModel = require("../models/internModel");
const CollegeModel = require('../models/collegeModel');
// exports.createIntern = async (req, res) => {
//   try {
//     const internData = req.body;
//     const createIntern = await internModel.create(internData);
//     res.status(201).send({
//       status: true,
//       InternData: createIntern,
//     });
//   } catch (error) {
//     res.status(400).send({
//       status: false,
//       message: error.message,
//     });
//   }
// };
exports.createIntern = async (req, res) => {
  try {
    const data = req.body;

    // check data is exist | key exist in data
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Post body data must be required!" });
    }

    let { name, email, mobile, collegeName } = data;

    // validate it's values
    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "Intern's name is missing" });
    }
    if (!/^([a-zA-Z. ]){1,100}$/.test(name)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Name should contain only alphabetic chacraters",
        });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, msg: "Intern's email is missing" });
    }
   

    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, msg: "Intern's mobile number is missing" });
    }
    
    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, msg: "Intern's college name is missing" });
    }
    

    // check if college id is exist in our collection OR not
    const inCollegeDb = await CollegeModel.findOne({
      name: collegeName.trim(),
      isDeleted: false,
    });
    // console.log(inCollegeDb);

    if (!inCollegeDb) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "The college where you belong doesn't exist",
        });
    }

    // check if email address is exist in our collection OR not
    let duplicateEmail = await internModel.findOne({ email: email });
    if (duplicateEmail) {
      return res
        .status(409)
        .send({ status: false, msg: "Email already exists" });
    }

    // check if phone number is exist in our collection OR not
    let duplicateMobile = await internModel.findOne({ mobile: mobile });
    if (duplicateMobile) {
      return res
        .status(409)
        .send({ status: false, msg: "Mobile number already exists" });
    }

    let insertData = {
      name,
      email,
      mobile,
      collegeId: inCollegeDb._id,
    };

    // now - create a document in the collection
    const create = await internModel.create(insertData);
    return res.status(201).send({ status: true, data: create });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

exports.getIntern = async (req, res) => {
  const getInterndata = await internModel.find();
  res.send({
    status: true,
    data: {
      getInterndata,
    },
  });
};
