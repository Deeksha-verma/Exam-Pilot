const Questions = require("../models/questions");
const User = require("../models/users");
const generateRandomQuestions = require("../ai_module/AI");

module.exports.generateQuestions = async (req, res) => {
  try {
    console.log(req.body);
    const numQuestions = req.body.numQuestions;
    const timeAllotted = req.body.timeAllotted;
    const scheduledTime = req.body.scheduledTime;
    const name = req.body.name;

    const file = req.file;

    if (!file || !numQuestions || !timeAllotted || !scheduledTime || !name) {
      return res
        .status(500)
        .json({ message: "Missing one or more parameters" });
    }

    const imagePath = req.file.path;
    console.log(imagePath);
    if (!imagePath)
      return res.status(500).json({ message: "Missing syllabus image" });

    const generatedQuestionsText = await generateRandomQuestions(
      imagePath,
      numQuestions
    );
    console.log(generatedQuestionsText);
    const questionArray = [];

    let cnt = 1;
    let i = 0;
    let idx = 0;
    let q = false,
      a = false,
      b = false,
      c = false,
      d = false;

    while (idx < generatedQuestionsText.length) {
      let temp = "";

      while (generatedQuestionsText[idx] !== "#") {
        temp += generatedQuestionsText[idx];
        idx++;
      }

      temp = temp.trim();

      temp = temp
        .replace(`**Q${cnt}`, "")
        .replace(`**Q.`, "")
        .replace("**A.", "")
        .replace("**B.", "")
        .replace("**C.", "")
        .replace("**D.", "")
        .replace("**Ans.", "")
        .replace("**Ans", "")
        .replace(`**Ans${cnt}.`, "")
        .replace(`**Ans${cnt}`, "");

      if (!q) {
        questionArray[i] = {
          question: temp,
          optA: "",
          optB: "",
          optC: "",
          optD: "",
          ans: "",
        };
        q = true;
      } else if (!a) {
        questionArray[i].optA = temp;
        a = true;
      } else if (!b) {
        questionArray[i].optB = temp;
        b = true;
      } else if (!c) {
        questionArray[i].optC = temp;
        c = true;
      } else if (!d) {
        questionArray[i].optD = temp;
        d = true;
      } else {
        for (let j = 0; j < temp.length; j++) {
          if (
            temp[j] == "A" ||
            temp[j] == "B" ||
            temp[j] == "C" ||
            temp[j] == "D"
          ) {
            questionArray[i].ans = temp[j];
          }
        }
        q = false;
        a = false;
        b = false;
        c = false;
        d = false;
        cnt++;
        i++;
      }

      idx++;
    }

    const newQuestions = new Questions({
      Name: name,
      timeAllotted: timeAllotted,
      scheduledTime: scheduledTime,
      questions: questionArray,
      numQuestions: numQuestions,
    });

    await newQuestions.save();

    res.json({ message: "Questions generated successfully" });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUpcomingExams = async (req, res) => {
  try {
    const upcomingExamsArray = await Questions.find({});

    if (upcomingExamsArray.length > 0) {
      res.status(200).json({
        message: "Successfully retrieved all upcoming exams from the database",
        exams: upcomingExamsArray,
      });
    } else {
      res.status(500).json({ message: "No upcoming exams exist!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in fetching upcoming exams", error });
  }
};

module.exports.checkExam = async (req, res) => {
  try {
    console.log(req.body);
    const { answers, examId, studentId } = req.body;
    const student = await User.findOne({ _id: studentId });
    const exam = await Questions.findOne({ _id: examId });
    if (!student || !exam)
      return res.status(400).json({ message: "No user or Exam found" });
    let examsGiven = student.examsGiven;
    examsGiven++;
    console.log(exam);
    const questions = exam.questions;
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].ans === answers[i]) score++;
    }
    let avg = student.score;
    avg = (avg + score) / examsGiven;
    student.examsGiven = examsGiven;
    student.score = avg;
    await student.save();
    return res.status(200).json({ message: "Exam Successfully Checked!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
