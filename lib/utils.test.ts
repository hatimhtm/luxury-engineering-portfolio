import { expect, test, describe } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
    test("merges tailwind classes correctly", () => {
        expect(cn("px-2 py-1", "p-4")).toBe("p-4");
    });

    test("handles conditional classes correctly", () => {
        expect(cn("base-class", true && "truthy-class", false && "falsy-class")).toBe("base-class truthy-class");
    });

    test("handles array inputs correctly", () => {
        expect(cn(["class-a", "class-b"], "class-c")).toBe("class-a class-b class-c");
    });

    test("handles object inputs correctly", () => {
        expect(cn({ "class-a": true, "class-b": false }, "class-c")).toBe("class-a class-c");
    });

    test("ignores undefined, null, and false values", () => {
        expect(cn("valid-class", undefined, null, false, "", "another-class")).toBe("valid-class another-class");
    });

    test("handles complex combinations correctly", () => {
        expect(cn(
            "text-sm font-medium",
            { "bg-blue-500 text-white": true, "bg-gray-200": false },
            ["hover:bg-blue-600", "focus:ring-2"],
            "text-lg"
        )).toBe("font-medium bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 text-lg");
    });
});
