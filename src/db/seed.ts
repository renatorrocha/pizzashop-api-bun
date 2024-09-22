import { faker } from "@faker-js/faker";
import chalk from "chalk";
import { client, db } from ".";
import { restaurants, users } from "./schema";

async function seed() {
	// Reset Database
	await db.delete(users);
	await db.delete(restaurants);
	console.log(chalk.yellow("✔️ Database reseted!"));

	// Create Customers
	await db.insert(users).values([
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			role: "customer",
		},
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			role: "customer",
		},
	]);

	console.log(chalk.yellow("✔️ Created Customers!"));

	// Create Manager
	const [manager] = await db
		.insert(users)
		.values([
			{
				name: faker.person.fullName(),
				email: "admin@admin.com",
				role: "manager",
			},
		])
		.returning({ id: users.id });

	console.log(chalk.yellow("✔️ Created Manager!"));

	// Create Restaurant
	await db.insert(restaurants).values([
		{
			name: faker.company.name(),
			description: faker.lorem.paragraph(),
			managerId: manager.id,
		},
	]);

	console.log(chalk.yellow("✔️ Created Restaurant!"));

	console.log(chalk.greenBright("Database seeded successfully!"));
}

seed().finally(() => client.end());
