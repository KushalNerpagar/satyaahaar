import { describe, expect, it } from "vitest";
import { formatGrade, formatTag, formatTagList, nutrientValue } from "./formatters";

describe("formatTag", () => {
  it("strips the language prefix and dashes", () => {
    expect(formatTag("en:whole-wheat-flour")).toBe("whole wheat flour");
  });

  it("returns an empty string for missing values", () => {
    expect(formatTag(undefined)).toBe("");
    expect(formatTag(null)).toBe("");
  });
});

describe("formatTagList", () => {
  it("joins readable labels with commas", () => {
    expect(formatTagList(["en:rice", "en:brown-rice"])).toBe("rice, brown rice");
  });

  it("drops empty entries", () => {
    expect(formatTagList(["", null, "en:oats"])).toBe("oats");
    expect(formatTagList()).toBe("");
  });
});

describe("formatGrade", () => {
  it("uppercases grades", () => {
    expect(formatGrade("a")).toBe("A");
  });

  it("returns an empty string when the grade is missing", () => {
    expect(formatGrade(undefined)).toBe("");
  });
});

describe("nutrientValue", () => {
  it("returns finite numbers", () => {
    expect(nutrientValue({ fat_100g: 12.5 }, "fat_100g")).toBe(12.5);
  });

  it("returns null for missing or invalid values", () => {
    expect(nutrientValue({}, "fat_100g")).toBeNull();
    expect(nutrientValue({ fat_100g: "12" }, "fat_100g")).toBeNull();
    expect(nutrientValue({ fat_100g: Number.NaN }, "fat_100g")).toBeNull();
  });
});
