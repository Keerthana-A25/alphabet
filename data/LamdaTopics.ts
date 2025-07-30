import { TopicsByLanguage } from "../redux/programReducer";
const LamdaTopics = {
"C/C++": {
  topics: [
    {
      "title": "Hello World",
      "description": "Basic C program structure",
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  printf(\"Hello, World!\");\n  return 0;\n}",
      "error": 0,
      "unlock": true
    },
    {
      "title": "Data Types and Variables",
      "description": "Primitive data types in C",
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  int a = 10;\n  float b = 3.14;\n  char c = 'A';\n  printf(\"%d %f %c\", a, b, c);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Operators",
      "description": "Arithmetic and logical operators",
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  int a=5, b=3;\n  printf(\"Sum: %d\\n\", a+b);\n  printf(\"Logical AND: %d\", a>0 && b>0);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Control Structures",
      "description": "If-else conditionals", 
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  int x=10;\n  if(x>0) printf(\"Positive\");\n  else printf(\"Non-positive\");\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Loops",
      "description": "For loop implementation",
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  for(int i=0; i<5; i++) {\n    printf(\"%d \", i);\n  }\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Functions",
      "description": "Function declaration and call",
      "mode": "beginner",
      "program": "#include <stdio.h>\nvoid greet() { printf(\"Hello!\"); }\nint main() {\n  greet();\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Arrays",
      "description": "Single-dimensional arrays",
      "mode": "beginner",
      "program": "#include <stdio.h>\nint main() {\n  int arr[3]={1,2,3};\n  printf(\"%d\", arr[1]);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Pointers",
      "description": "Basic pointer operations",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nint main() {\n  int x=5;\n  int *ptr=&x;\n  printf(\"%d\", *ptr);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Structures",
      "description": "Struct declaration and usage",
      "mode": "intermediate", 
      "program": "#include <stdio.h>\nstruct Point { int x,y; };\nint main() {\n  struct Point p1 = {1,2};\n  printf(\"%d,%d\", p1.x, p1.y);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Unions",
      "description": "Using unions to save memory",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nunion Data { int i; float f; char c; };\nint main() {\n  union Data data;\n  data.i = 10;\n  printf(\"%d\", data.i);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Enumerations",
      "description": "Defining and using enums",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nenum Color {Red, Green, Blue};\nint main() {\n  enum Color c = Green;\n  printf(\"%d\", c);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "File I/O",
      "description": "Reading and writing files",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nint main() {\n  FILE *fptr;\n  fptr = fopen(\"test.txt\", \"w\");\n  fprintf(fptr, \"Hello, File!\");\n  fclose(fptr);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Preprocessor Directives",
      "description": "Using macros and include directives",
      "mode": "intermediate",
      "program": "#include <stdio.h>\n#define PI 3.14\nint main() {\n  printf(\"PI: %f\", PI);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Command Line Arguments",
      "description": "Accessing command line arguments",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nint main(int argc, char *argv[]) {\n  printf(\"First argument: %s\", argv[1]);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Bitwise Operators",
      "description": "Using bitwise operations",
      "mode": "intermediate",
      "program": "#include <stdio.h>\nint main() {\n  int a = 5, b = 3;\n  printf(\"a & b: %d\", a & b);\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Linked Lists",
      "description": "Basic singly linked list implementation",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Node { int data; struct Node* next; };\nint main() {\n  struct Node* head = NULL;\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Doubly Linked Lists",
      "description": "Basic doubly linked list implementation",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Node { int data; struct Node* next; struct Node* prev; };\nint main() {\n  struct Node* head = NULL;\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Stacks",
      "description": "Stack implementation using arrays",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#define MAX 10\nint stack[MAX], top = -1;\nvoid push(int x) { stack[++top] = x; }\nint main() { push(5); printf(\"Top: %d\", stack[top]); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Queues",
      "description": "Queue implementation using arrays",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#define MAX 10\nint queue[MAX], front = -1, rear = -1;\nvoid enqueue(int x) { queue[++rear] = x; }\nint main() { enqueue(5); printf(\"Front: %d\", queue[front + 1]); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Binary Trees",
      "description": "Basic binary tree structure",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Node { int data; struct Node* left; struct Node* right; };\nint main() { struct Node* root = NULL; return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Binary Search Trees",
      "description": "Insertion and traversal in BST",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Node { int data; struct Node* left; struct Node* right; };\nint main() { struct Node* root = NULL; return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Sorting Algorithms",
      "description": "Bubble sort implementation",
      "mode": "advanced",
      "program": "#include <stdio.h>\nvoid bubbleSort(int arr[], int n) { for (int i = 0; i < n-1; i++) for (int j = 0; j < n-i-1; j++) if (arr[j] > arr[j+1]) { int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp; } }\nint main() { int arr[] = {64, 34, 25, 12, 22}; bubbleSort(arr, 5); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Searching Algorithms",
      "description": "Linear search implementation",
      "mode": "advanced",
      "program": "#include <stdio.h>\nint linearSearch(int arr[], int n, int x) { for (int i = 0; i < n; i++) if (arr[i] == x) return i; return -1; }\nint main() { int arr[] = {1, 2, 3, 4, 5}; printf(\"Found at index: %d\", linearSearch(arr, 5, 3)); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Hash Tables",
      "description": "Basic hash table implementation",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#define SIZE 10\nint hashTable[SIZE];\nint hashFunction(int key) { return key % SIZE; }\nint main() { hashTable[hashFunction(5)] = 10; printf(\"Value: %d\", hashTable[hashFunction(5)]); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Function Pointers",
      "description": "Using function pointers",
      "mode": "advanced",
      "program": "#include <stdio.h>\nvoid greet() { printf(\"Hello!\"); }\nint main() { void (*funcPtr)() = greet; funcPtr(); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Precedence and Associativity of Operators",
      "description": "Understanding operator precedence",
      "mode": "advanced",
      "program": "#include <stdio.h>\nint main() { int a = 5, b = 10; printf(\"Result: %d\", a + b * 2); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Static and Global Variables",
      "description": "Understanding variable storage duration",
      "mode": "advanced",
      "program": "#include <stdio.h>\nint globalVar = 10;\nvoid func() { static int staticVar = 0; staticVar++; printf(\"Static: %d, Global: %d\\n\", staticVar, globalVar); }\nint main() { func(); func(); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Variable Scope",
      "description": "Understanding variable scope",
      "mode": "advanced",
      "program": "#include <stdio.h>\nvoid func() { int localVar = 5; printf(\"Local: %d\\n\", localVar); }\nint main() { func(); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Error Handling",
      "description": "Using errno and perror",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#include <errno.h>\nint main() { FILE *fptr = fopen(\"nonexistent.txt\", \"r\"); if (fptr == NULL) { perror(\"Error\"); } return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Macros vs. Functions",
      "description": "Understanding the difference",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#define SQUARE(x) ((x) * (x))\nint main() { printf(\"Square: %d\", SQUARE(5)); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "C Standard Library Functions",
      "description": "Using standard library functions",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#include <stdlib.h>\nint main() { int *arr = (int*)malloc(5 * sizeof(int)); free(arr); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Memory Management",
      "description": "Dynamic memory allocation and freeing",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#include <stdlib.h>\nint main() { int *arr = (int*)malloc(5 * sizeof(int)); free(arr); return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "C Preprocessor",
      "description": "Using conditional compilation",
      "mode": "advanced",
      "program": "#include <stdio.h>\n#define DEBUG\nint main() { #ifdef DEBUG printf(\"Debug mode\\n\"); #endif return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Data Structures (Graphs)",
      "description": "Basic graph structure",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Graph { int vertices; int edges; };\nint main() { struct Graph g; g.vertices = 5; g.edges = 10; return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Complex Data Types",
      "description": "Structs with pointers",
      "mode": "advanced",
      "program": "#include <stdio.h>\nstruct Node { int data; struct Node* next; };\nint main() { struct Node n1; n1.data = 5; n1.next = NULL; return 0; }",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Hello World (C++)", 
      "description": "Basic C++ program with iostream",
      "mode": "beginner",
      "program": "#include <iostream>\nusing namespace std;\nint main() {\n  cout << \"Hello, C++!\";\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Classes and Objects",
      "description": "Basic class and object creation",
      "mode": "beginner",
      "program": "#include <iostream>\nusing namespace std;\nclass MyClass {\npublic:\n  void display() { cout << \"Hello from MyClass!\"; }\n};\nint main() {\n  MyClass obj;\n  obj.display();\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Constructors and Destructors",
      "description": "Using constructors and destructors",
      "mode": "beginner",
      "program": "#include <iostream>\nusing namespace std;\nclass MyClass {\npublic:\n  MyClass() { cout << \"Constructor called\"; }\n  ~MyClass() { cout << \"Destructor called\"; }\n};\nint main() {\n  MyClass obj;\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Inheritance",
      "description": "Single inheritance example",
      "mode": "intermediate",
      "program": "#include <iostream>\nusing namespace std;\nclass Base {\npublic:\n  void display() { cout << \"Base class\"; }\n};\nclass Derived : public Base {};\nint main() {\n  Derived obj;\n  obj.display();\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Polymorphism",
      "description": "Using virtual functions",
      "mode": "intermediate",
      "program": "#include <iostream>\nusing namespace std;\nclass Base {\npublic:\n  virtual void show() { cout << \"Base class\"; }\n};\nclass Derived : public Base {\npublic:\n  void show() { cout << \"Derived class\"; }\n};\nint main() {\n  Base* b = new Derived();\n  b->show();\n  delete b;\n  return 0;\n}",
      "error": 0,
      "unlock": false
    },
    {
  "title": "Operator Overloading",
  "description": "Overloading the + operator",
  "mode": "intermediate",
  "program": "#include <iostream>\nusing namespace std;\nclass Complex {\npublic:\n  int real, imag;\n  Complex(int r, int i) : real(r), imag(i) {}\n  Complex operator + (const Complex& c) {\n    return Complex(real + c.real, imag + c.imag);\n  }\n};\nint main() {\n  Complex c1(3, 2), c2(1, 7);\n  Complex c3 = c1 + c2;\n  cout << \"Result: \" << c3.real << \"+\" << c3.imag << \"i\";\n  return 0;\n}",
  "error": 0,
  "unlock": false
},

  ]
}
} as TopicsByLanguage;

export default LamdaTopics;


