/**
 * This is the main programmatic entry point for D0.
 */

import Log from "./Util";
import rp = require('request-promise-native');


interface IMath {
    getJSON(urls: string[]): Promise<Array<any>>;
    add(urls: string[]): Promise<number>;
}

export default class Math implements IMath {
    constructor() {
        Log.trace('Math::init()');
    }

    //returns a JSON Array
    getJSON(urls: string[]): Promise<Array<any>> {
        return new Promise(function (fulfill, reject) {
            var pArr : Array<any> = [];
            for (let url of urls) {
                rp(url).then(function (responseText) {
                    //console.log(responseText);
                }).catch(function (err) {
                    reject('Error: URL could not be retrieved')
                });
                pArr.push(rp(url));
            }
            // Parse array of JSONs
            Promise.all(pArr).then(function (results) {
                var parsedArray : Array<any> = [];
                try {
                    for (let result of results) {
                        let i = JSON.parse(result);
                        parsedArray.push(i);
                    }
                } catch (Error) {
                    reject('Error: JSON could not be parsed')
                }
                fulfill(parsedArray);

            }).catch(function (err) {
                reject('Error: URL could not be retrieved');
            });
        })

    }

    add(urls: string[]): Promise<number> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            let JSONarr = that.getJSON(urls);
            var sum = 0;
            var i = 0;

            //if promise is fulfilled by getJSON, then
            //value is the array of JSON objects
            JSONarr.then(function(value) {
                for (let x of value) {
                    console.log(x);
                    // if x is an array already -> start adding
                    if (x instanceof Array) {
                        for (let n of x) {
                            if (typeof n === 'number') {
                                sum = sum + n;
                                i++;
                            }
                        }

                    }

                    else {
                        let n = that.recurseThroughObjectToGetSum(x, 0);
                        console.log('number from object :' + n);
                        sum = sum + n;
                    }
                }
                if (sum != 0)
                    fulfill(sum);
                else
                    reject('Error: No number was provided');
            }).catch(function (err) {
                reject('Error: URL could not be retrieved');
            })

            })
        };

    recurseThroughObjectToGetSum (obj : any, prevSum : number) : number {
        // for each key in object
        var sumOfObject = prevSum;
        var i = 0;

        for (let k in obj) {
            console.log('key is :' + k);
            console.log('see object : ' + obj[k]);
            if (obj[k] instanceof Array) {
                for (let n of obj[k]) {
                    if (typeof n === 'number') {
                        sumOfObject = sumOfObject + n;
                        console.log('sumOfObject :' + sumOfObject);
                        i++;
                    }
                }
            }
            else {
                if (typeof obj[k] == "object" && obj[k] != null && Object.keys(obj[k]).length != 0)
                    return this.recurseThroughObjectToGetSum(obj[k], sumOfObject);
            }
        }
        return sumOfObject;
    }
}
