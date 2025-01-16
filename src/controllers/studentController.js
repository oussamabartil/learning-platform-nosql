const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createStudent(req, res) {
  try {
    const studentData = req.body;
    const result = await mongoService.insertOne(
      db.getDb().collection("students"),
      studentData
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function getAllStudents(req, res) {
    try {
      const students = await db.getDb().collection("students").find().toArray();
      res.status(200).json(students);
    } catch (error) {
      console.error("Error getting students:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  async function getStudentById(req, res) {
    try {
      const studentId = req.params.id;
  
      const cachedStudent = await redisService.getData(`student:${studentId}`);
      if (cachedStudent) {
        return res.status(200).json(cachedStudent);
      }
  
      const student = await mongoService.findOneById(
        db.getDb().collection("students"),
        studentId
      );
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      await redisService.cacheData(`student:${studentId}`, student, 3600); // Cache for 1 hour
      res.status(200).json(student);
    } catch (error) {
      console.error("Error getting student by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }