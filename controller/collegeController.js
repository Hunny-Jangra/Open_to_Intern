const CollegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

// exports.craeteCollege = async(req, res) => {
//     try{
//         const collegeData = req.body;
//         const creteCollege = await CollegeModel.create(collegeData);

//         res.status(200).send({
//             status: true,
//             collegeData: creteCollege
//         })
//     }catch(error) {
//         res.status(400).send({
//             status: false,
//             message: error.message
//         })
//     }
// }

exports.createCollege = async function (req, res) {
    try {
        const data = req.body;
        let { name, fullName, logoLink } = data;
        

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Data is required to add a college" })
        }
      
        if (!name) return res.status(400).send({ status: false, msg: "Name is mandatory" })

        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is mandatory" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is mandatory" })

        const collegeExist = await CollegeModel.findOne({ name: name })

        if (collegeExist) {
            return res.status(400).send({ status: false, msg: "College name already exists" })
        }
        let createdCollege = await CollegeModel.create(data)
        return res.status(201).send({ status: true, data: createdCollege })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}



// exports.getcollegeDetails = async(req, res) => {
//     try{

//         const getData = await CollegeModel.find({}).populate('interns');
//         res.status(200).send({
//             status: true,
//             data: getData
//         })
//     }catch(error) {
//         res.status(400).send({
//             status: false,
//             message: error.message
//         })
//     }

// }

exports.getCollege = async function (req, res) {
    try {

        const collegeName = req.query.collegeName

        const collegeFilter = {}

        collegeFilter.name = collegeName.toLowerCase()
        collegeFilter.isDeleted = false

        const college = await CollegeModel.findOne(collegeFilter)

        if (!college) return res.status(404).send({ status: false, msg: "No college found" })

        const internFilter = {}
        internFilter.collegeId = college._id
        internFilter.isDeleted = false

        const interns = await internModel.find(internFilter).select({ name: 1, email: 1, mobile: 1 })//.count()

        const internList = {}
        internList.name = college.name
        internList.fullName = college.fullName
        internList.logoLink = college.logoLink
        internList.interns = ["No intern apply for this college.. !"]
        if (interns.length > 0) { internList.interns = interns }

        return res.status(200).send({ status: true, msg: "data found", data: internList })
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}