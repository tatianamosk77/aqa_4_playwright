import { test as ui } from "./pages.fixture.js";
import { test as api } from "./api.fixture.js";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(ui, api);

export { test, expect };