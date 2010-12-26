var global = (function(){
  return this;
})()

var Citizen = function Citizen(firstname, lastname){

  if (this === global) {
    return new Citizen(firstname, lastname);
  }

  this.firstname = firstname;
  this.lastname = lastname;
};

var george = Citizen('George', 'Abitbol'); // OK