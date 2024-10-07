const request = require("supertest");
const server = require("../server");

describe("GET /", () => {
	it("should return Hello World!", async () => {
		const res = await request(server).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.text).toBe("Hello World!");
	});
});

describe("POST /upload", () => {
	it("should upload a file successfully", async () => {
		const res = await request(server).post("/upload").attach("file", "tests/test-file.txt");
		expect(res.statusCode).toBe(200);
		expect(res.text).toBe("File uploaded successfully");
	});
});
