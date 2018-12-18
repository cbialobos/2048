const expect = require("expect");
const slideArray = require("../src/slideArray");

describe("slideArray", () => {
    it("Should work on uninitialized array", () => {
        expect(slideArray([null, null, null, null])).toEqual([null, null, null, null]);
    });

    it("Should work on full array of different values", () => {
        expect(slideArray([2, 4, 8, 16])).toEqual([2, 4, 8, 16]);
    });

    it("Should work on full array of different values and spaces", () => {
        expect(slideArray([2, null, 4, null])).toEqual([2, 4, null, null]);
    });

    it("Should work on full array of different values and spaces starting from space", () => {
        expect(slideArray([null, 2, 4, null])).toEqual([2, 4, null, null]);
    });

    it("Should work on full array of different values and spaces with duplicate values", () => {
        expect(slideArray([2, 2, 4, null])).toEqual([4, 4, null, null]);
    });

    it("Should work on full array of different values and spaces with two sets of duplicate values", () => {
        expect(slideArray([2, 2, 4, 4])).toEqual([4, 8, null, null]);
    });

    it("2_x_2_x --> 4_x_x_x", () => {
        expect(slideArray([2, null, 2, null])).toEqual([4, null, null, null]);
    });

    it("x_2_x_2 --> 4_x_x_x", () => {
        expect(slideArray([null, 2, null, 2])).toEqual([4, null, null, null]);
    });
});