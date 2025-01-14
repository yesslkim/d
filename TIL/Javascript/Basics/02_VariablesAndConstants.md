# Variables and Constants

- Updates
  - [2020.08.16] - 변수와 상수 기본 개념 정리

---
## Variables (변수)

>A "data container" / "data storage"

- Variables contain values. They aren't the values themselves.
- Basic syntax to declare a variable  
  example:
  ```Javascript
  let userName = 'max'; // initializing a variable
  let myName; //an empty container
  ```
- you can reassign it and store a new value like this ex. `userName='kim';`

>What is difference between `var` and `let`?

1. Hoisiting  
     because variable declarations are processed before any code is executed, declaring a varaible anywhere in the code is equivalent to declaring it at the top. - this behavior is called "hoisiting"

     ```javascript
     myAge = 20;
     var myAge;

     // same as

     var myAge;
     myAge = 20;
     ```
    However, hoisting no longer works with `let` declaring a variable after you initialize it results in error.

2. Redeclare Variables  
  you can redeclare as many times as possible with `var` but with `let` you can't

     ```javascript
     var myName = "Kim";
     var myName = "Park"; // it only works with var

     let yourName = "kim";
     yourName = "Park"; // you can update a value like this
     ```

## Variable Naming

- Allowed
  - camelCase ex. `let userName;`
  - letters and digits ex. `let userGroup5;`
  - starting with \$ or underscore\_
    ```javascript
    let $kindOfSpecial;
    let _internalValue;
    ```
- Not allowed
  - allowed but bad ex. `let user_name;`
  - starting with digits not allowed
  - no special characters instead of underscore or dollar sign
  - not allowed to use keywords `let let;`

## Constants (상수)

A "data container" / "data storage"  
example: `const userName = 'max';`  
what is different from variables? the value can't change.
