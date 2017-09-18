/**
 * Created by rtholmes on 2016-10-31.
 */

import {expect} from 'chai';

import Math from "../src/Math";
import Log from "../src/Util";

describe("MathSpec", function () {

    var math: Math = null;
    beforeEach(function () {
        math = new Math();
    });

    afterEach(function () {
        math = null;
    });

    it("getJSON should fulfill empty array when given empty array", function () {
        return math.getJSON(['http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            //expect(value).to.deep.equal([]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            //expect.fail();
        })
    });

    /*
    it("fulfill valid URL", function () {
        return math.getJSON(['http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            //expect(value).to.deep.equal([[ 1, 2, 5, 4 ]]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            //expect.fail();
        })


        }); */

});
