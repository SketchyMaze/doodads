// Test Doodad Script
function main() {
	console.log("I am actor ID " + Self.ID());

	// Helper function to raise an exception w/ a backoff.
	let busy = false,
		raise = function(message) {
			if (busy) return;
			setTimeout(() => {
				busy = false;
			}, 1000);
			busy = true;
			throw message;
		};

	Events.OnCollide( function(e) {
		console.log("Collided with something!");
		raise(`Collided with ${e.Actor.Drawing.Doodad.Title}!\n`+
			`Settled: ${e.Settled}  Overlap: ${e.Overlap}\n`+
			`Is Player: ${e.Actor.IsPlayer()}\n`+
			`Inventory: ${JSON.stringify(Object.keys(e.Actor.Inventory()))}`);
	});

	Message.Subscribe("power", (powered) => {
		raise(`Received a power (${powered}) signal!`);
	});
}
