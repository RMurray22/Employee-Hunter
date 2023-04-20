INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Interconnected"),
        ("Sales"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Engineering Manager", 120000, 1),
        ("Engineering Lead", 100000, 1),
        ("Staff Engineer", 80000, 1),
        ("Finance Manager", 85000, 2),
        ("Accountant", 70000, 2),
        ("Brand Advocate Manager", 95000, 3),
        ("Brand Advocate Sr. Analyst", 82000, 3),
        ("Brand Advocate Analyst", 70000, 3),
        ("Sales Manager", 75000, 4),
        ("Salesperson", 65000, 4),
        ("Legal Manager", 110000, 5),
        ("Lawyer", 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Beetle",  1, NULL),
        ("Paul", "Beetle",  2, 1),
        ("George", "Beetle",  3, 1), 
        ("Ringo", "Beetle",  4, NULL), 
        ("Reannu", "Keeves",  5, 4),
        ("Hu", "Mann",  6, NULL), 
        ("Bingo", "Dog",  7, 6), 
        ("Bluey", "Dog",  8, 6), 
        ("Han", "Solo",  9, NULL), 
        ("Luke", "Skywalker",  10, 9), 
        ("Anakin", "Skywalker",  11, NULL), 
        ("Darth", "Vader",  12, 11);