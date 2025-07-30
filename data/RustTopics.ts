import { Topic } from "../redux/programReducer"; //  reuse the Topic type
const RustTopics: { topics: Topic[] } = {
  topics: [
    {
      "title": "Hello World",
      "description": "Basic Rust program structure",
      "mode": "beginner",
      "program": "fn main() {\n    println!(\"Hello, World!\");\n}",
      "error": 0,
      "unlock": true
    },
    {
      "title": "Variables and Data Types",
      "description": "Declaring variables and using data types",
      "mode": "beginner",
      "program": "fn main() {\n    let a: i32 = 10;\n    let b: f64 = 3.14;\n    let c: char = 'A';\n    println!(\"{} {} {}\", a, b, c);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Control Flow",
      "description": "Using if-else statements",
      "mode": "beginner",
      "program": "fn main() {\n    let x = 10;\n    if x > 0 {\n        println!(\"Positive\");\n    } else {\n        println!(\"Non-positive\");\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Loops",
      "description": "Using loops in Rust",
      "mode": "beginner",
      "program": "fn main() {\n    for i in 0..5 {\n        println!(\"{}\", i);\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Functions",
      "description": "Defining and calling functions",
      "mode": "beginner",
      "program": "fn greet() {\n    println!(\"Hello!\");\n}\n\nfn main() {\n    greet();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Ownership",
      "description": "Understanding ownership in Rust",
      "mode": "intermediate",
      "program": "fn main() {\n    let s1 = String::from(\"Hello\");\n    let s2 = s1;\n    // println!(\"{}\", s1); // This will cause an error\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Borrowing",
      "description": "Using references and borrowing",
      "mode": "intermediate",
      "program": "fn main() {\n    let s1 = String::from(\"Hello\");\n    let len = calculate_length(&s1);\n    println!(\"Length: {}\", len);\n}\n\nfn calculate_length(s: &String) -> usize {\n    s.len()\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Structs",
      "description": "Defining and using structs",
      "mode": "intermediate",
      "program": "struct Point {\n    x: i32,\n    y: i32,\n}\n\nfn main() {\n    let p = Point { x: 1, y: 2 };\n    println!(\"Point: ({}, {})\", p.x, p.y);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Enums",
      "description": "Defining and using enums",
      "mode": "intermediate",
      "program": "enum Color {\n    Red,\n    Green,\n    Blue,\n}\n\nfn main() {\n    let c = Color::Green;\n    match c {\n        Color::Red => println!(\"Red\"),\n        Color::Green => println!(\"Green\"),\n        Color::Blue => println!(\"Blue\"),\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Pattern Matching",
      "description": "Using pattern matching with match",
      "mode": "intermediate",
      "program": "fn main() {\n    let number = 13;\n    match number {\n        1 => println!(\"One\"),\n        2 => println!(\"Two\"),\n        _ => println!(\"Not one or two\"),\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Error Handling",
      "description": "Using Result and Option types for error handling",
      "mode": "intermediate",
      "program": "fn divide(x: f64, y: f64) -> Result<f64, String> {\n    if y == 0.0 {\n        Err(String::from(\"Cannot divide by zero\"))\n    } else {\n        Ok(x / y)\n    }\n}\n\nfn main() {\n    match divide(10.0, 0.0) {\n        Ok(result) => println!(\"Result: {}\", result),\n        Err(e) => println!(\"Error: {}\", e),\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Modules",
      "description": "Creating and using modules",
      "mode": "intermediate",
      "program": "mod my_module {\n    pub fn greet() {\n        println!(\"Hello from my_module!\");\n    }\n}\n\nfn main() {\n    my_module::greet();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Traits",
      "description": "Defining and implementing traits",
      "mode": "advanced",
      "program": "trait Speak {\n    fn speak(&self);\n}\n\nstruct Dog;\n\nimpl Speak for Dog {\n    fn speak(&self) {\n        println!(\"Woof!\");\n    }\n}\n\nfn main() {\n    let dog = Dog;\n    dog.speak();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Concurrency",
      "description": "Using threads for concurrency",
      "mode": "advanced",
      "program": "use std::thread;\n\nfn main() {\n    let handle = thread::spawn(|| {\n        for i in 1..5 {\n            println!(\"Thread: {}\", i);\n        }\n    });\n    handle.join().unwrap();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Smart Pointers",
      "description": "Using Box and Rc for memory management",
      "mode": "advanced",
      "program": "fn main() {\n    let b = Box::new(5);\n    println!(\"Value: {}\", b);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Lifetimes",
      "description": "Understanding lifetimes in Rust",
      "mode": "advanced",
      "program": "fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {\n    if s1.len() > s2.len() {\n        s1\n    } else {\n        s2\n    }\n}\n\nfn main() {\n    let s1 = String::from(\"long string\");\n    let s2 = \"short\";\n    let result = longest(&s1, s2);\n    println!(\"Longest: {}\", result);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Macros",
      "description": "Creating and using macros in Rust",
      "mode": "advanced",
      "program": "#macro_rules! say_hello {\n    () => {\n        println!(\"Hello, Macro!\");\n    };\n}\n\nfn main() {\n    say_hello!();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Pattern Matching with Enums",
      "description": "Advanced pattern matching with enums",
      "mode": "advanced",
      "program": "enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n}\n\nfn main() {\n    let msg = Message::Move { x: 10, y: 20 };\n    match msg {\n        Message::Quit => println!(\"Quit\"),\n        Message::Move { x, y } => println!(\"Move to ({}, {})\", x, y),\n        Message::Write(text) => println!(\"Write: {}\", text),\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Asynchronous Programming",
      "description": "Using async/await for asynchronous programming",
      "mode": "advanced",
      "program": "use std::future::Future;\n\nasync fn async_function() {\n    println!(\"Async function called!\");\n}\n\nfn main() {\n    let future = async_function();\n    futures::executor::block_on(future);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Traits with Default Methods",
      "description": "Defining traits with default method implementations",
      "mode": "advanced",
      "program": "trait Speak {\n    fn speak(&self);\n    fn greet(&self) {\n        println!(\"Hello!\");\n    }\n}\n\nstruct Cat;\n\nimpl Speak for Cat {\n    fn speak(&self) {\n        println!(\"Meow!\");\n    }\n}\n\nfn main() {\n    let cat = Cat;\n    cat.speak();\n    cat.greet();\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Type Inference",
      "description": "Understanding type inference in Rust",
      "mode": "intermediate",
      "program": "fn main() {\n    let x = 5; // i32\n    let y = 3.5; // f64\n    let z = \"Hello\"; // &str\n    println!(\"x: {}, y: {}, z: {}\", x, y, z);\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Unsafe Rust",
      "description": "Using unsafe code for low-level programming",
      "mode": "advanced",
      "program": "fn main() {\n    let x: i32 = 42;\n    let r: *const i32 = &x;\n    unsafe {\n        println!(\"Value: {}\", *r);\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Cargo and Crates",
      "description": "Using Cargo for package management and building projects",
      "mode": "beginner",
      "program": "// Create a new project with Cargo:\n// cargo new my_project\n// cd my_project\n// cargo build\n// cargo run\n",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Testing in Rust",
      "description": "Writing tests in Rust",
      "mode": "intermediate",
      "program": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\n#[cfg(test)]\nmod tests {\n    use super::*;\n    #[test]\n    fn test_add() {\n        assert_eq!(add(2, 3), 5);\n    }\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Iterators",
      "description": "Using iterators for collection manipulation",
      "mode": "intermediate",
      "program": "fn main() {\n    let vec = vec![1, 2, 3, 4, 5];\n    let sum: i32 = vec.iter().sum();\n    println!(\"Sum: {}\", sum);\n}",
      "error": 0,
      "unlock": false
    }
  ]
};

export default RustTopics;
