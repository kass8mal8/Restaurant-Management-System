const request = require("supertest");
const app = require("./app"); // Replace with your Express app
const User = require("./models/authentication"); // Replace with your User model

describe("Signin process", () => {
	let user;

	beforeEach(async () => {
		user = await User.create({
			firstName: "John",
			lastName: "Doe",
			email: "johndoe@example.com",
			password: "password123",
			employeeNumber: "EMP001",
		});
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	test("should signin a user with valid credentials", async () => {
		const response = await request(app)
			.post("/signin")
			.send({ email: user.email, password: user.password });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty(
			"message",
			"User logged in successfully"
		);
		expect(response.headers).toHaveProperty("set-cookie");
	});

	test("should not signin a user with invalid credentials", async () => {
		const response = await request(app)
			.post("/signin")
			.send({ email: user.email, password: "invalid" });

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty("message", "Incorrect credentials");
	});

	test("should not signin a user with an unregistered email", async () => {
		const response = await request(app)
			.post("/signin")
			.send({ email: "unregistered@example.com", password: "password123" });

		expect(response.status).toBe(500);
		expect(response.body).toHaveProperty("message", "Incorrect credentials");
	});
});
