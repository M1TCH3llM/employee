const mysql = require("mysql2");
const inquire = require("inquirer");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "roo1234",
    database: "employee_db",
  },
  console.log("Connected to the employee_db.")
);

function dbQuery(view) {
  let dbQuery = `${view}`;

  db.query(`SELECT * FROM ${view}`, function (err, results) {
    console.table(results);
    interface();
  });
}
//TODO function to add department

function depAdd(eDepAdd) {
  // let depName = `${eDepAdd}`;
  if (eDepAdd !== 0) {
    db.query(`INSERT INTO department (name) VALUES ("${eDepAdd}");`);
    console.log("Department Successfully ADDED");
    interface();
  }
}
// // TODO function to add role

function roleAdd(answers) {
  const { eRoleAddName, eRoleAddSalary, eRoleAddDep } = answers;

  db.query(
    `INSERT INTO role_info (title, salary, department_id) VALUES ("${eRoleAddName}", "${eRoleAddSalary}", "${eRoleAddDep}");`
  );
  interface();
}
// // TODO function to inport values to add employee

function addEmp(answers) {
  const { first_name, last_name, manager, role_id, manager_id } = answers;
  console.log(first_name, last_name, manager, role_id, manager_id);
  db.query(
    `INSERT INTO employee (first_name, last_name, manager, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${manager}, ${role_id}, ${manager_id});`
  );
  console.log("Employee Successfully ADDED");
  interface();
}

//function to que this query for View Roles

function viewRole() {
  db.query(
    "SELECT * FROM role_info JOIN department ON role_info.department_id = department.id",
    function (err, results) {
      console.table(results);
      interface();
    }
  );
}

function viewEmp() {
  console.log("hey is me");
  db.query(
    `SELECT emp.id, emp.first_name, emp.Last_name, ri.title, dep.name AS department, ri.salary, emp.manager_id, emp2.first_name AS manager
    FROM employee AS emp
    INNER JOIN role_info AS ri ON emp.role_id = ri.id
    INNER JOIN department AS dep ON ri.department_id = dep.id
    LEFT JOIN employee AS emp2 ON emp2.id = emp.manager_id `,
    function (err, results) {
      console.table(results);
      interface();
    }
  );
}

function getRolesFromDatabase() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id AS value, title FROM role_info", (err, results) => {
      const roles = results.map((row) => {
        return {
          value: row.value, // This assumes that the database query returns 'value' and 'title' fields
          name: row.title,
        };
      });
      resolve(roles);
    });
  });
}

function getDepartmentsFromDatabase() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id AS value, name FROM department", (err, results) => {
      if (err) {
        reject(err);
      } else {
        const roles = results.map((row) => {
          return {
            value: row.value, // This assumes that the database query returns 'value' and 'title' fields
            name: row.name,
          };
        });
        resolve(roles);
      }
    });
  });
}

function getManagersFromDatabase() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id AS value, first_name FROM employee Where manager = 1",
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const roles = results.map((row) => {
            return {
              value: row.value, // This assumes that the database query returns 'value' and 'title' fields
              name: row.first_name,
            };
          });
          resolve(roles);
        }
      }
    );
  });
}

const menuQ = [
  {
    name: "menu",
    type: "list",
    message: "What would you like to do today?",
    choices: ["View Departments", "Edit Databases"],
  },
  {
    name: "view",
    type: "list",
    message: "What would you like view?",
    choices: ["department", "role_info", "employee"],
    when: (answer) => answer.menu === "View Departments",
  },
  {
    name: "editIndex",
    type: "list",
    message: "What would you like to edit?",
    choices: ["Departments", "Roles", "Employees"],
    when: (answer) => answer.menu === "Edit Databases",
  },
  {
    name: "eDep",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Department", "Delete Department"],
    when: (answer) => answer.editIndex === "Departments",
  },
  {
    name: "eDepAdd",
    type: "input",
    message: "What would you like to name this new department?",
    when: (answer) => answer.eDep === "Add Department",
  },
  {
    name: "eRole",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add Role", "Delete Role"],
    when: (answer) => answer.editIndex === "Roles",
  },
  {
    name: "eRoleAddName",
    type: "input",
    message: "What would you like to name this role?",
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eRoleAddSalary",
    type: "input",
    message: "What is the role salary?",
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eRoleAddDep",
    type: "list",
    message: "Enter department id for the role",
    choices: async function () {
      try {
        const department = await getDepartmentsFromDatabase();
        return department;
      } catch (error) {
        console.error("Error fetching departments:", error);
        return [];
      }
    },
    when: (answer) => answer.eRole === "Add Role",
  },
  {
    name: "eEmployees",
    type: "list",
    message: "What would you like to do",
    choices: ["Add Employee", "Delete Employee"],
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "first_name",
    type: "input",
    message: "employee first name",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "last_name",
    type: "input",
    message: "employee last name",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "role_id",
    type: "list",
    message: "Select a role:",
    choices: async function () {
      try {
        const roles = await getRolesFromDatabase();
        return roles;
      } catch (error) {
        console.error("Error fetching roles:", error);
        return [];
      }
    },
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "manager",
    type: "confirm",
    message: "are they a manager?",
    when: (answer) => answer.editIndex === "Employees",
  },
  {
    name: "manager_id",
    type: "list",
    message: "Who is their manager?",
    choices: async function () {
      try {
        const managers = await getManagersFromDatabase();
        return managers;
      } catch (error) {
        console.error("Error fetching managers:", error);
        return [];
      }
    },
    when: (answer) => answer.manager === false,
  },
];

function interface() {
  inquire.prompt(menuQ).then((answers) => {
    console.log(answers);

    const {
      menu,
      view,
      eDepAdd,
      eRoleAddName,
      eEmployees,
      first_name,
      last_name,
      role_id,
      manager,
      manager_id,
    } = answers;
    console.log(
      menu,
      view,
      eDepAdd,
      eRoleAddName,
      eEmployees,
      first_name,
      last_name,
      role_id,
      manager,
      manager_id
    );

    if (view === "department") {
      dbQuery(view);
    } else if (view === "role_info") {
      viewRole();
    } else if (view === "employee") {
      viewEmp();
    }

    if (eDepAdd) {
      depAdd(eDepAdd);
    }

    if (eRoleAddName) {
      roleAdd(answers);
    }

    if (eEmployees) {
      addEmp(answers);
      console.log(answers);
      console.log(eEmployees);
    }
  });
}

interface();
