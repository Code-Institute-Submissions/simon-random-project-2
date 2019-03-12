describe("Generate Random Number", function() {

    describe("Checks button object exists", function() {
            it("should exist", function() {
                expect(button).toBeDefined();
            });
    });
    describe("Validate number range", function() {
        it("should return a number between 0 and 3", function() {
            marker = 0;
            level = 10;
            generateSequence();
            for (var t = 0; t < sequences.length; t++) {
                expect(sequences[t]).toEqual(jasmine.any(Number));
                expect(sequences[t]).toBeGreaterThan(-1);
                expect(sequences[t]).toBeLessThan(4);
            }
        });
    });
});
