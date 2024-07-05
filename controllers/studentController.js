//GET ALL STUDENTS LIST

const db = require("../config/db");

const getStudents = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM students");
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Record found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All Students Records",
      totalStudents: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Student API",
      error,
    });
  }
};

//GET STUDENT BY ID
const getStudentByID = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid or Provide Student id",
      });
    }

    //const data = await db.query(`SELECT * FROM students WHERE id=` + studentId);
    const data = await db.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]);

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Record found",
      });
    }

    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error on Get student by id in API",
      error,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, roll_no, medium, fees } = req.body;
    if (!name || !roll_no || !medium || !fees) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const data = await db.query(
      `INSERT INTO students (name,roll_no,fees,medium) VALUES(?,?,?,?)`,
      [name, roll_no, fees, medium]
    );

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Error in INSERT QUERY",
      });
    }

    res.status(201).send({
      success: true,
      message: "New Student Record Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create student API",
      error,
    });
  }
};

//UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or provide id",
      });
    }

    const { name, roll_no, fees, medium } = req.body;
    const data = await db.query(
      `UPDATE students SET name =?, roll_no =?, fees=?,medium=? WHERE id =?`,
      [name, roll_no, fees, medium, studentId]
    );
    if (!data || data.length === 0) {
      return res.status(500).send({
        success: false,
        message: "Error in UPDATE data",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student Record Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update student API",
      error,
    });
  }
};

//DELETE STUDENT

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Student Id or Valid Student Id",
      });
    }

    await db.query(`DELETE FROM students WHERE id =?`, [studentId]);
    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete student API",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent,
};
