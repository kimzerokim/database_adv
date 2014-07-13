//load modules
var fs = require('fs'),
    hashmap = require('hashmap').HashMap,
    map = new hashmap();

//env setting
var dataStorePATH = './jsonStore.json',
    rawJsonData = undefined;

//example json data
//[
//    {
//        "personalNum": 001122,
//        "name": "young",
//        "phoneNum": 010010010
//    },
//    {
//        "personalNum": 002233,
//        "name": "kim",
//        "phoneNum": 010010011
//    }
//]

//load file
var loadStorage = function () {
    //check hashmap size (init once at first execute)
    if (map.count() <= 0) {
        console.log('\n//////////////\nstart load');
        //read file and convert data to hashmap
        var data = fs.readFileSync(dataStorePATH, 'utf8');

        rawJsonData = JSON.parse(data);
        rawJsonData.forEach(function (obj) {
            convertData(obj, null);
        });
        console.log('finish load\n//////////////\n');
    }
};

//convert data to hashmap structure
var convertData = function (obj, callback) {
    //resolve obj
    var key = obj.personalNum,
        value = {
            'name': obj.name,
            'phoneNum': obj.phoneNum
        };

    //set value to hashmap
    map.set(key, value);

    if (callback) callback();
};

//select specific value
var select = function (key) {
    return map.get(key);
};

//insert value to storage
var insert = function (obj) {
    //check duplication
    if (map.has(obj.personalNum)) {
        console.log('duplicated key. insert another personalNum');
        return;
    }
    convertData(obj, function () {
        rawJsonData.push(obj);
        console.log('insert finished');
    });
};

//////////////////////////////////////////

//load json data file
loadStorage();