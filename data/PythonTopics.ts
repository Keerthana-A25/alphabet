import { Topic } from "../redux/programReducer"; // reuse the Topic type
const PythonTopics: { topics: Topic[] } = {
    
  topics: [
    {
      "title": "Hello World",
      "description": "Basic Python program",
      "mode": "beginner",
      "program": "print('Hello, World!')",
      "error": 0,
      "unlock": true
    },
    {
      "title": "Variables and Data Types",
      "description": "Working with variables and data types",
      "mode": "beginner",
      "program": "x = 10\ny = 3.14\nname = 'Alice'\nprint(x, y, name)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Control Structures",
      "description": "If-else conditional statements",
      "mode": "beginner",
      "program": "x = 10\nif x > 5:\n    print('Greater than 5')\nelse:\n    print('5 or less')",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Loops",
      "description": "For and while loops",
      "mode": "beginner",
      "program": "for i in range(5):\n    print(i)\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Functions",
      "description": "Defining and calling functions",
      "mode": "beginner",
      "program": "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Alice'))",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Lists and Tuples",
      "description": "Working with lists and tuples",
      "mode": "beginner",
      "program": "my_list = [1, 2, 3]\nmy_tuple = (4, 5, 6)\nprint(my_list[1], my_tuple[2])",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Dictionaries",
      "description": "Working with key-value pairs",
      "mode": "beginner",
      "program": "person = {'name': 'Alice', 'age': 25}\nprint(person['name'])",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Sets",
      "description": "Working with sets in Python",
      "mode": "beginner",
      "program": "my_set = {1, 2, 3}\nmy_set.add(4)\nprint(my_set)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "String Manipulation",
      "description": "Common string operations",
      "mode": "beginner",
      "program": "text = 'Hello Python'\nprint(text.upper())\nprint(text.split())",
      "error": 0,
      "unlock": false
    },
    {
      "title": "File I/O",
      "description": "Reading and writing files",
      "mode": "intermediate",
      "program": "with open('file.txt', 'w') as f:\n    f.write('Hello')\n\nwith open('file.txt', 'r') as f:\n    print(f.read())",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Exception Handling",
      "description": "Handling errors with try-except",
      "mode": "intermediate",
      "program": "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Classes and Objects",
      "description": "Object-oriented programming basics",
      "mode": "intermediate",
      "program": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print('Woof!')\n\ndog = Dog('Fido')\ndog.bark()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Inheritance",
      "description": "Creating class hierarchies",
      "mode": "intermediate",
      "program": "class Animal:\n    def make_sound(self):\n        pass\n\nclass Cat(Animal):\n    def make_sound(self):\n        print('Meow')",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Polymorphism",
      "description": "Using polymorphism in classes",
      "mode": "intermediate",
      "program": "class Dog:\n    def speak(self):\n        return 'Woof!'\n\nclass Cat:\n    def speak(self):\n        return 'Meow!'\n\nfor animal in [Dog(), Cat()]:\n    print(animal.speak())",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Modules and Packages",
      "description": "Creating and using modules and packages",
      "mode": "intermediate",
      "program": "import math\nprint(math.sqrt(16))",
      "error": 0,
      "unlock": false
    },
    {
      "title": "List Comprehensions",
      "description": "Concise list creation",
      "mode": "intermediate",
      "program": "squares = [x**2 for x in range(10)]\nprint(squares)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Generators",
      "description": "Creating and using generators",
      "mode": "intermediate",
      "program": "def count_up_to(n):\n    count = 1\n    while count <= n:\n        yield count\n        count += 1\n\nfor number in count_up_to(5):\n    print(number)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Decorators",
      "description": "Modifying function behavior",
      "mode": "advanced",
      "program": "def my_decorator(func):\n    def wrapper():\n        print('Before function')\n        func()\n        print('After function')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Hello!')\n\nsay_hello()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Context Managers",
      "description": "Resource management with 'with'",
      "mode": "advanced",
      "program": "class MyContextManager:\n    def __enter__(self):\n        print('Entering context')\n    def __exit__(self, *args):\n        print('Exiting context')\n\nwith MyContextManager():\n    print('Inside context')",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Lambda Functions",
      "description": "Creating anonymous functions",
      "mode": "intermediate",
      "program": "add = lambda x, y: x + y\nprint(add(2, 3))",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Regular Expressions",
      "description": "Using regex for pattern matching",
      "mode": "intermediate",
      "program": "import re\npattern = r'\\d+'\ntext = 'There are 2 apples'\nprint(re.findall(pattern, text))",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Multithreading",
      "description": "Using threads for concurrent execution",
      "mode": "advanced",
      "program": "import threading\n\ndef print_numbers():\n    for i in range(5):\n        print(i)\n\nthread = threading.Thread(target=print_numbers)\nthread.start()\nthread.join()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Multiprocessing",
      "description": "Using processes for parallel execution",
      "mode": "advanced",
      "program": "from multiprocessing import Process\n\ndef print_numbers():\n    for i in range(5):\n        print(i)\n\nprocess = Process(target=print_numbers)\nprocess.start()\nprocess.join()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Working with JSON",
      "description": "Reading and writing JSON data",
      "mode": "intermediate",
      "program": "import json\n\ndata = {'name': 'Alice', 'age': 25}\njson_string = json.dumps(data)\nprint(json_string)\n\nloaded_data = json.loads(json_string)\nprint(loaded_data)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Virtual Environments",
      "description": "Creating isolated Python environments",
      "mode": "intermediate",
      "program": "# Create a virtual environment:\n# python -m venv myenv\n# Activate it:\n# source myenv/bin/activate (Linux/Mac)\n# myenv\\Scripts\\activate (Windows)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Web Scraping",
      "description": "Extracting data from websites",
      "mode": "advanced",
      "program": "import requests\nfrom bs4 import BeautifulSoup\n\nresponse = requests.get('https://example.com')\nsoup = BeautifulSoup(response.text, 'html.parser')\nprint(soup.title.string)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Working with APIs",
      "description": "Interacting with web APIs",
      "mode": "advanced",
      "program": "import requests\n\nresponse = requests.get('https://api.example.com/data')\nprint(response.json())",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Data Analysis (Pandas basics)",
      "description": "Basic data analysis using Pandas",
      "mode": "intermediate",
      "program": "import pandas as pd\ndata = {'Name': ['Alice', 'Bob'], 'Age': [25, 30]}\ndf = pd.DataFrame(data)\nprint(df.describe())",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Data Visualization (Matplotlib basics)",
      "description": "Creating basic plots with Matplotlib",
      "mode": "intermediate",
      "program": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 25, 30]\nplt.plot(x, y)\nplt.show()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Unit Testing",
      "description": "Writing tests for your code",
      "mode": "intermediate",
      "program": "import unittest\n\ndef add(a, b):\n    return a + b\n\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)\n\nif __name__ == '__main__':\n    unittest.main()",
      "error": 0,
      "unlock": false
    },
    {
      "title": "NumPy",
      "description": "Fundamental package for numerical computing in Python, providing support for arrays and matrices.",
      "mode": "intermediate",
      "program": "import numpy as np\narr = np.array([1, 2, 3])\nprint(arr)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "SciPy",
      "description": "Library used for scientific and technical computing, built on NumPy.",
      "mode": "intermediate",
      "program": "from scipy import integrate\nresult = integrate.quad(lambda x: x**2, 0, 1)\nprint(result)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Scikit-learn",
      "description": "Machine learning library for Python, providing simple and efficient tools for data mining and analysis.",
      "mode": "intermediate",
      "program": "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nprint(model)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Pandas",
      "description": "Data manipulation and analysis library, providing data structures like DataFrames.",
      "mode": "intermediate",
      "program": "import pandas as pd\ndata = {'Name': ['Alice', 'Bob'], 'Age': [25, 30]}\ndf = pd.DataFrame(data)\nprint(df)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "CuPy",
      "description": "NumPy-compatible array library for GPU-accelerated computing.",
      "mode": "advanced",
      "program": "import cupy as cp\narr = cp.array([1, 2, 3])\nprint(arr)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Dask",
      "description": "Parallel computing library that integrates with NumPy and Pandas for large datasets.",
      "mode": "advanced",
      "program": "import dask.array as da\nx = da.from_array(np.random.random((10000, 10000)), chunks=(1000, 1000))\nprint(x)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "JAX",
      "description": "Library for high-performance numerical computing, enabling automatic differentiation.",
      "mode": "advanced",
      "program": "import jax.numpy as jnp\nx = jnp.array([1, 2, 3])\nprint(x)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "PyTorch",
      "description": "Deep learning framework that provides a flexible platform for building neural networks.",
      "mode": "advanced",
      "program": "import torch\nx = torch.tensor([1.0, 2.0, 3.0])\nprint(x)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "TensorFlow",
      "description": "Open-source library for numerical computation and machine learning, developed by Google.",
      "mode": "advanced",
      "program": "import tensorflow as tf\nx = tf.constant([1, 2, 3])\nprint(x)",
      "error": 0,
      "unlock": false
    },
    {
      "title": "Keras",
      "description": "High-level neural networks API, running on top of TensorFlow.",
      "mode": "advanced",
      "program": "from keras.models import Sequential\nmodel = Sequential()\nprint(model)",
      "error": 0,
      "unlock": false
    }
  ]
};

export default PythonTopics;
