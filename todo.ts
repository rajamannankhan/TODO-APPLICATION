#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
interface todoList {
  task: string;
  completed: boolean;
}

let TodoList: todoList[] = [];

let mainMenu = async () => {
  let { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message:chalk.bold.yellowBright ("WHAT DO YOU WANNA DO?"),
    choices: ["ADD TASK", "VIEW LIST", "MARK AS COMPLETED", "EXIT"],
  });
  switch (action) {
    case "ADD TASK":
      await addtask();
      break;
    case "VIEW LIST":
      await viewlist();
      break;
    case "MARK AS COMPLETED":
      await markcompleted();
      break;
    case "EXIT":
      console.log(chalk.bold.greenBright("GOOD BYE!"));
      return;
  }mainMenu();
};
let addtask = async () => {
  let { task } = await inquirer.prompt({
    name: "task",
    type: "input",
    message: chalk.italic.blueBright("ADD YOUR TASK"),
  });
  TodoList.push({ task, completed: false });
  console.log(chalk.green("YOUR TASK HAS BEEN ADDED SUCCESSFULY"));
};
let viewlist = () => {
  console.log(chalk.bold.greenBright("<---TODO LIST--->"));
  TodoList.forEach((item, index) => {
    console.log(`${index + 1}.[${item.completed ?chalk.bold.yellowBright ("x") : ""}]${item.task} `);
  });
  console.log("**********");
};
let markcompleted = async () => {
  let { index } = await inquirer.prompt({
    type: "number",
    name: "index",
    message:chalk.blue(chalk.italic.blueBright ("MARK THE TASK WHICH YOU HAVE COMPLETED")),
  });
  if (index <= 1 || index > TodoList.length) {
    console.log(chalk.redBright("INVALID TASK NUMBER PLEASE INPUT VALID TASK NUMBER"));
    return;
  }
  TodoList[index - 1].completed = true;
  console.log(chalk.greenBright("TASK HAS BEEN MARKED AS COMPLETED")); 
};
mainMenu();
