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

    getJSON(urls: string[]): Promise<Array<any>> {
        return new Promise(function (fulfill, reject) {
            var pArr : Array<any> = [];
            for (let url of urls) {
                rp(url).then(function (responseText) {
                    console.log(responseText);
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
        return new Promise(function (fulfill, reject) {
            // TODO: implement
            // fulfill(0);
        });
    }
}
