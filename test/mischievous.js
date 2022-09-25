function main() {
	console.log("%s initialized!", Self.Title);

	console.log(Object.keys(console));

	var colors = [
		RGBA(255, 0, 0, 255),
		RGBA(255, 153, 0, 255),
		RGBA(255, 255, 0, 255),
		RGBA(0, 255, 0, 255),
		RGBA(0, 153, 255, 255),
		RGBA(0, 0, 255, 255),
		RGBA(255, 0, 255, 255)
	];
	var colorIndex = 0;
	setInterval(function() {
		// console.log("sticky tick");
		Self.Canvas.MaskColor = colors[colorIndex];
		colorIndex++;
		if (colorIndex == colors.length) {
			colorIndex = 0;
		}
	}, 100);

	// log.Config.Colors = 0; // panics, can't set a golog.Color

	Events.OnCollide( function() {

	})
}
