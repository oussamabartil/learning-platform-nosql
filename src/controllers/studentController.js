const { ObjectId } = require("mongodb");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createStudent(req, res) {
  try {
    const { name, age, course } = req.body;

    // Validation des données
    if (!name || !age || !course) {
      return res
        .status(400)
        .json({ error: "Les champs name, age et course sont obligatoires." });
    }

    // Insérer l'étudiant dans MongoDB
    const insertResult  = await mongoService.insertOne("students", {
      name,
      age,
      course,
      createdAt: new Date(),
    });

  
    const newStudent = await mongoService.findOneById(
        "students",
        insertResult.insertedId
      );
    // Mettre à jour le cache avec les données de l'étudiant
    await redisService.cacheData(
      `student_${newStudent.insertedId}`,
      newStudent,
      3600 
    );

    return res
      .status(201)
      .json({ message: "Étudiant créé avec succès", data: newStudent });
  } catch (error) {
    console.error("Erreur lors de la création d'un étudiant:", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

async function getAllStudents(req, res) {
//   try {
//     const students = await mongoService.findAll("students");
//     return res.status(200).json({ data: students });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des étudiants:", error);
//     return res.status(500).json({ error: "Erreur serveur interne" });
//   }
 try {
    // Récupérer tous les étudiants depuis MongoDB
    const students = await mongoService.findAll("students");
console.log(students);
    // Vérifier si des étudiants ont été trouvés
    if (!students || students.length === 0) {
      return res.status(404).json({ error: "Aucun étudiant trouvé." });
    }

    // Retourner les étudiants
    return res.status(200).json({ data: students });
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "ID étudiant invalide." });
    }

    // Vérifier si les données sont en cache
    const cachedStudent = await redisService.getData(`student_${studentId}`);
    if (cachedStudent) {
      return res
        .status(200)
        .json({ fromCache: true, data: JSON.parse(cachedStudent) });
    }

    // Récupérer l'étudiant depuis MongoDB
    const student = await mongoService.findOneById("students", studentId);
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }

    // Mettre à jour le cache
    await redisService.cacheData(`student_${studentId}`, student, 3600);

    return res.status(200).json({ data: student });
  } catch (error) {
    console.error("Erreur lors de la récupération d'un étudiant par ID:", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "ID étudiant invalide." });
    }

    // Mettre à jour les données de l'étudiant
    const result = await mongoService.updateOne(
      "students",
      { _id: new ObjectId(studentId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }

    // Supprimer les données en cache
    await redisService.deleteData(`student_${studentId}`);

    return res
      .status(200)
      .json({ message: "Étudiant mis à jour avec succès.", data: result });
  } catch (error) {
    console.error("Erreur lors de la mise à jour d'un étudiant:", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

async function deleteStudent(req, res) {
  try {
    const studentId = req.params.id;

    if (!ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "ID étudiant invalide." });
    }

    const result = await mongoService.deleteOne("students", {
      _id: new ObjectId(studentId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Étudiant non trouvé." });
    }

    // Supprimer les données en cache
    await redisService.deleteData(`student_${studentId}`);

    return res.status(200).json({ message: "Étudiant supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression d'un étudiant:", error);
    return res.status(500).json({ error: "Erreur serveur interne" });
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
