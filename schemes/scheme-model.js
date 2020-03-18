const db = require("../data/db-config.js");

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
};

function find() {
	return db("schemes");
}

function findById(id) {
	return db("schemes")
		.where({ id })
		.first();
}

function findSteps(id) {
	return db("steps")
		.join("schemes", "steps.scheme_id", "schemes.id")
		.select(
			"steps.id",
			"schemes.scheme_name",
			"steps.step_number",
			"steps.instructions"
		)
		.where("schemes.id", `${id}`)
		.orderBy("steps.step_number");
}

function add(scheme) {
	return db("schemes")
		.insert(scheme)
		.then(id => {
			return findById(id[0]);
		})
		.catch(err => {
			console.log( err);
		});
}

function update(changes, id) {
	return db("schemes")
		.where({ id })
		.update(changes)
		.then(scheme => {
			return findById(id);
		})
		.catch(err => {
			console.log( err);
		});
}

function remove(id) {
	return findById(id)
		.then(scheme => {
			return db("schemes")
				.where({ id })
				.del()
				.then(() => {
					return scheme;
				})
				.catch(err => {
					console.log("from delete", err);
				});
		})
		.catch(err => {
			console.log("from findById", err);
		});
}
