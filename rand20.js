var request = require ("request");
// For information on obtaining an api key, visit https://api.random.org/features
var apiKey = " ";
var d100 = 100;
var d20 = 20;
var d12 = 12;
var d10 = 10;
var d8 = 8;
var d6 = 6;
var d4 = 4;
var d2 = 2;
var d100Table = [];
var d20Table = [];
var d12Table = [];
var d10Table = [];
var d8Table = [];
var d6Table = [];
var d4Table = [];
var d2Table = [];
// Requesting random numbers from Random.org
function randomOrgReq (die,times) {
  // JSON-RPC API request
    request.post(
        'https://api.random.org/json-rpc/1/invoke',
        { json:
            {"jsonrpc":"2.0","method":"generateIntegers","params":
                {"apiKey":apiKey,"n":times,"min":1,"max":die,"replacement":true,"base":10},
            "id":10012}
        },
        // Adding random data values to the tables
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var tableVar = body.result.random.data;
                var requestsLeft = body.result.requestsLeft;
                var bitsLeft = body.result.bitsLeft;
                // Matching requested die to the table the data is to be stored in
                if (die === d100){
                    d100Table = d100Table.concat(tableVar);
                    console.log ("Random.org Call for "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d20){
                    d20Table = d20Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d12) {
                    d12Table = d12Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d10) {
                    d10Table=d10Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d8) {
                    d8Table=d8Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d6) {
                    d6Table=d6Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d4) {
                    d4Table=d4Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d4) {
                    d4Table=d4Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }
                if (die === d2) {
                    d2Table=d2Table.concat(tableVar);
                    console.log ("Random.org Call "+die +". Total remaining requests: "+ requestsLeft+ ". Total bits left: "+bitsLeft);
                }

            }
        }
    );
}
// Manage tables and send a Random.org request if they get too low
function tableManager (){
    if (d100Table.length <= 20) {
        randomOrgReq(d100,200);
    }
    if (d20Table.length <= 20) {
        randomOrgReq(d20,200);
    }
    if (d12Table.length <= 20) {
        randomOrgReq(d12,200);
    }
    if (d10Table.length <= 20) {
        randomOrgReq(d10,200);
    }
    if (d8Table.length <= 20) {
        randomOrgReq(d8,200);
    }
    if (d6Table.length <= 20) {
        randomOrgReq(d6,200);
    }
    if (d4Table.length <= 20) {
        randomOrgReq(d4,200);
    }
    if (d2Table.length <= 20) {
        randomOrgReq(d2,200);
    }
}
// Roll builder, parses message to die rolls and builds table to then deliver
function dieRoller(message) {
    var finishedTable = [];
    var div = 0;
    var num = 0;
    var i = 0;
    var n = 0;
    // splitting the string up by spaces into an array
    var workArray = message.split(" ");
    // removing the "!roll" from the string
     workArray.shift();
     // Setting "workLength" to the ammount of elements in the arrary generated from the input request
     var workLength = workArray.length;
     // Going through the array and performing rolls for any die that is matched
        while (workLength > 0) {
              var workLoad = workArray.shift();
              var workItem = workLoad.toLowerCase();
              // string matching
                if (workItem.match(/d%/)){
                  // find the "d" character in the array and search to the left of it for number of the given die to roll,
                     div = workItem.indexOf("d");
                     num = workItem.substring(0, div);
                     // Setting "i" to the value found
                     i = parseInt(num,10);
                     // Substituting 1 if no value is found
                      if (isNaN(i)){
                          i=1;
                      }
                      // Pushing the denotation of the die onto the Table intended to be sent
                      finishedTable.push(" d%:");
                      while (i > 0){
                        // Pulling a value fro m the first element in the arrary of rolls for given die and pushing it onto the table intended to be sent
                          n = d100Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                }
                if (workItem.match(/d20/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d20:");
                      while (i > 0){
                          n = d20Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                if (workItem.match(/d12/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d12:");
                      while (i > 0){
                          n = d12Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                if (workItem.match(/d10/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d10:");
                      while (i > 0){
                          n = d10Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                if (workItem.match(/d8/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d8:");
                      while (i > 0){
                          n = d8Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                if (workItem.match(/d6/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d6:");
                      while (i > 0){
                          n = d6Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                if (workItem.match(/d4/)){
                      div = workItem.indexOf("d");
                      num = workItem.substring(0, div);
                      i = parseInt(num,10);
                      if (isNaN(i)){
                          i=1;
                      }
                      finishedTable.push(" d4:");
                      while (i > 0){
                          n = d4Table.shift();
                          finishedTable.push(n);
                          i --;
                      }
                  }
                   workLength --;
          }
  var nearFinishedString= finishedTable.toString();
  var finalString = nearFinishedString.replace(/,/g," ");
  console.log (finalString);
  tableManager();
  return finalString;

}
function flipCoin (){
    var finishedTable = [];
    var n = d2Table.shift();
    if (n === 1){
        finishedTable.push("heads");
    }
    if (n === 2){
        finishedTable.push("tails")
    }
    var finalString = finishedTable.toString()
    tableManager()
    return finalString;
 }
// functions to be called in other files
module.exports = {
    roll: function(message) {
      // call this function in your program and pass a string such as this "!roll 3d20 d%" to return the values
        return dieRoller(message);
    },
    flip: function() {
      // call this function to return the result of a coin flip
        return flipCoin();
    },
    setKey: function(key){
      // call this function and pass your Random.org api key as an argument. Should be called before refresh function
        apiKey = key;
    },
    refresh: function(){
      // call this function to fetch the random values from Random.org (should be called after setKey)
        tableManager();
    }
};
/*
Copyright 2017 Jordan Sinn

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
