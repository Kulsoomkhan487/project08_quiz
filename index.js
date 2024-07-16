import chalk from "chalk";
import inquirer from "inquirer";
const apiLink = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    //for username
    let name = await inquirer.prompt({
        name: "StudentName",
        type: "input",
        message: "Enter Your Name"
    });
    for (let index = 0; index < 10; index++) {
        let answers = [...data[index].incorrect_answers, data[index].correct_answer];
        let ans = await inquirer.prompt({
            name: "Quiz",
            type: "list",
            message: data[index].question,
            choices: answers.map((value) => value)
        });
        if (ans.Quiz == data[index].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.blue("Correct"));
        }
        else {
            console.log(`Correct answerf is ${chalk.bold.italic.red(data[index].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.bold.green(name.StudentName)}, Your score is ${chalk.bold.red(score)}, Out of ${chalk.bold.red('10')}`);
};
startQuiz();
