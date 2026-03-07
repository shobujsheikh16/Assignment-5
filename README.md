1. The Breakdown: var, let, and const..?
Answer:

In the past, we only had var, but modern JS gives us better tools to manage data.

var: This is "function-scoped." It can be messy because you can declare the same variable twice, and it often leaks out of blocks (like if statements), causing bugs.

let: This is "block-scoped." It only lives inside the curly braces {} where you define it. You can change its value later (re-assign), but you can’t re-declare it in the same spot.

const: Short for "constant." Like let, it’s block-scoped, but once you give it a value, it stays that way. It’s the safest choice for data that shouldn’t change, like a configuration or a fixed ID.




2. What is the Spread Operator (...)?
Answer:

Think of the spread operator as a way to "unpack" an array or an object.

Why use it? If you have an array and you want to copy its elements into a new one without affecting the original, or if you want to merge two objects together, ... makes it incredibly simple.






3. map() vs. filter() vs. forEach()...?
Answer:

All three are used to loop through arrays, but they serve very different purposes:

forEach(): It’s a basic loop. It goes through every item and does something (like a console.log), but it returns nothing.

map(): It’s a transformer. It goes through the array, performs an action on every item, and gives you back a brand-new array of the same length.

filter(): It’s a scout. You give it a condition (like "find items > 10"), and it returns a new array containing only the items that passed that test.




4. Arrow Functions...?
Answer:

Arrow functions are a shorter, cleaner way to write functions in JavaScript.

Old way: function add(a, b) { return a + b; }

New way: const add = (a, b) => a + b;

The Benefit: Aside from being easier to read, they handle the this keyword differently, which is very helpful when working with classes or event listeners.




5. Template Literals...?
Answer:

Template literals allow you to work with strings much more flexibly using backticks (`) instead of quotes.

Interpolation: You can drop variables directly into a sentence using ${variableName} without using a bunch of + signs.

Multi-line: You can hit "Enter" and start a new line within the string, and JS will respect that formatting perfectly.