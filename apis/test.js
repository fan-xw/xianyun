const obj = {
    name: 'tom',
    age: 22,
    gender: '小哥哥'
}

// ... 展开运算符/扩展运算符, 把一个已经成型的对象给解开
// ...obj =>   name: 'tom',
//             age: 22,
//             gender: '小哥哥'

const obj2 = {...obj,gender:'小姐姐'}
console.log(obj2);

// 同样一个写法 ... 可以作为剩余参数语法, 把一堆数据组合成一个对象
// 如果我们希望拿到这个对象里面除了 gender 以外的所有数据
const {gender, ...data} = obj
console.log(data);

console.log('------------------------------');

var student = {
    name:'tom',
    age:24
}

var key = 'name'
console.log(key); // name

console.log(student.key); // undefined

console.log(student.name); // tom
console.log(student['name']); // tom
console.log(student[key]); // tom

// 结论：student.name == student['name'] == student[key]