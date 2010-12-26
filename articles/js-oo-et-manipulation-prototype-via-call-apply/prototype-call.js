var Citizen = function Citizen(name){
  this.name = name;		
};

(function(){
    this.getName = function getName(){
        return this.name;
    };
}).call(Citizen.prototype);