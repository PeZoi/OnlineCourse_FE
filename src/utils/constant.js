export const URL_BE = 'http://localhost:8080';
export const URL_FE = 'http://localhost:5173';

export const LANGUAGE_VERSIONS = [
   {
      lable: 'JavaScript 18.15.0',
      name: 'javascript',
      version: '18.15.0',
   },
   {
      lable: 'Python 3.10.0',
      name: 'python',
      version: '3.10.0',
   },
   {
      lable: 'Java 15.0.2',
      name: 'java',
      version: '15.0.2',
   },
   {
      lable: 'C# 6.12.0',
      name: 'csharp',
      version: '6.12.0',
   },
   {
      lable: 'C 10.2.0',
      name: 'c',
      version: '10.2.0',
   },
];

export const CODE_SNIPPETS = {
   javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
   python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
   java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
   csharp:
      'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
   c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}`,
};

export const ROLES = ['ROLE_ADMIN', 'ROLE_ASSISTANT', 'ROLE_CUSTOMER'];

// Màu để dùng cho thống kê
export const COLORS = [
   'rgb(237, 108, 2)',
   'rgb(153, 51, 0)',
   'rgb(25, 135, 84)',
   'rgb(78, 78, 230)',
   'rgb(121, 55, 170)',
   'rgb(50, 166, 219)',
   'rgb(241, 196, 2)',
   'rgb(245, 62, 45)',
];
