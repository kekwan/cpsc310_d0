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
                rp('url').then(function (JSONbody) {
                    console.log(url);
                    console.log(JSONbody);
                    pArr.push(new Promise(function (fulfill, reject) {
                        fulfill(JSONbody);
                    }))
                }).catch(function (err) {
                    //URL ERROR
                    console.error('Error: URL could not be retrieved' + err);
                })
            }
            fulfill();
            /*
            // Parse array of JSON
            Promise.all(pArr).then(function (result) {
                try {
                    let i = JSON.parse(result);
                    fulfill(i);
                } catch (Error) {
                    reject('Error: JSON could not be parsed')
                }
            }).catch(function (err) {
                Error('Error: URL could not be retrieved');

            }); */
        })

    }

    add(urls: string[]): Promise<number> {
        return new Promise(function (fulfill, reject) {
            // TODO: implement
            // fulfill(0);
        });
    }
}
