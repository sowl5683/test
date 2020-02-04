function Model(){
  this.name = 'Wu'
}
Model.prototype.getName = function (){
  return this.name;
}
Model.prototype.setName = function (name){
  this.name = name;
}

model = new Model();

Object.defineProperty(model,'value',{
  set: function(value){
    model.setName(value);
    var input = document.getElementById('name');
    var p = document.getElementById('nameText');
    input.value = value;
    p.innerText = value;
  },
  get: function(){
    // return 'My name is ' + name + '.';
    return model.getName();
  }
})
// Object.defineProperty(model,'value',{
//   get: function(){
//     return 'My name is ' + name + '.';
//   },
//   enumerable :true
// })

var input = document.getElementById('name');
input.value = model.name;
input.onchange = function(event){
  model.name = input.value;
  console.info(model.name);
}
