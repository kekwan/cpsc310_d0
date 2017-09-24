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
        return math.getJSON([]).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal([]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });


    it("fulfill valid URL", function () {
        return math.getJSON(['http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal([[ 1, 2, 5, 4 ]]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
        });

    it("fulfill JSON object", function () {
        return math.getJSON(['http://skaha.cs.ubc.ca:11313/h5e8.json']).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal([
                {
                    "num": 3,
                    "str": "hello",
                    "lvl1": [1, 4, 5],
                    "down1": {
                        "num2": 2,
                        "lvl2": [2],
                        "down2": {},
                        "down3": {
                            "lvl3": [-1]
                        }
                    }
                }
            ]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("fulfill JSON object and array", function () {
        return math.getJSON(['http://skaha.cs.ubc.ca:11313/h5e8.json', 'http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: Array<any>) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal([
                {
                    "num": 3,
                    "str": "hello",
                    "lvl1": [1, 4, 5],
                    "down1": {
                        "num2": 2,
                        "lvl2": [2],
                        "down2": {},
                        "down3": {
                            "lvl3": [-1]
                        }
                    }
                }, [1, 2, 5, 4]
            ]);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    //TESTS for Math.add

    it("fulfill 1 URL", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/822d.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal(6);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("fulfill 1 URL with array ", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal(12);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("reject No URL", function () {
        return math.add([]).then(function (value: number) {
            Log.test('Value: ' + value);
            expect.fail();
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect(err).to.deep.equal('Error: No number was provided');
        })
    });

    it("fulfill 2 URL", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/822d.json', 'http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal(18);
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("reject invalid URL", function () {
        return math.add(['invalidURL', 'http://skaha.cs.ubc.ca:11313/4968.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect.fail();
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect(err).to.deep.equal('Error: URL could not be retrieved');

        })
    });

    it("reject array URL that has strings", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/4670.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect.fail();
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect(err).to.deep.equal('Error: No number was provided');

        })
    });

    it("fulfill nested object", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/h5e8.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal(11);

        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("fulfill nested urls", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/h5e8.json', 'http://skaha.cs.ubc.ca:11313/822d.json' ]).then(function (value: number) {
            Log.test('Value: ' + value);
            expect(value).to.deep.equal(17);

        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect.fail();
        })
    });

    it("reject invalid JSON", function () {
        return math.add(['http://skaha.cs.ubc.ca:11313/jdw3.json']).then(function (value: number) {
            Log.test('Value: ' + value);
            expect.fail()
        }).catch(function (err) {
            Log.test('Error: ' + err);
            expect(err).to.deep.equal('Error: JSON could not be parsed');

        })
    });










});
