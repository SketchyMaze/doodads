/*
Colored Locked Doors

This script handles the blue, green, red, yellow and small-key doors.

Each door has a corresponding key that will unlock it. Small Key doors consume a
small key when unlocked for the first time.

Options: "unlocked" can make the door unlocked by default when the level begins.
*/

const color = Self.GetTag("color"),
	keyname = color === "small" ? "small-key.doodad" : "key-" + color + ".doodad",
	isUnlocked = Self.GetOption("unlocked");

function main() {
	// Layers in the doodad image.
	let layer = {
		closed: 0,
		unlocked: 1,
		right: 2,
		left: 3,
	};

	// Variables that change in event handler.
	let unlocked = false;  // Key has been used to unlock the door (one time).
	let opened = false;    // If door is currently showing its opened state.
	let enterSide = 0;     // Side of player entering the door, -1 or 1, left or right.

	Self.SetHitbox(34, 0, 13, 76);

	// Options: door is unlocked at level start?
	if (isUnlocked) {
		unlocked = true;
		Self.ShowLayer(layer.unlocked);
	}

	Events.OnCollide((e) => {
		// Record the side that this actor has touched us, in case the door
		// needs to open.
		if (enterSide === 0) {
			enterSide = e.Overlap.X > 0 ? 1 : -1;
		}

		if (opened) {
			return;
		}

		if (e.InHitbox) {
			if (unlocked) {
				Self.ShowLayer(enterSide < 0 ? layer.right : layer.left);
				opened = true;
				if (Self.IsOnScreen()) {
					Sound.Play("door-open.mp3");
				}
				return;
			}

			// Do they have our key?
			let hasKey = e.Actor.HasItem(keyname) >= 0;
			if (!hasKey) {
				// Door is locked.
				return false;
			}

			if (e.Settled) {
				unlocked = true;
				Self.ShowLayer(enterSide < 0 ? layer.right : layer.left);
				if (Self.IsOnScreen()) {
					Sound.Play("unlock.mp3");
				}

				// If a Small Key door, consume a small key.
				if (color === "small") {
					e.Actor.RemoveItem(keyname, 1)
				}
			}
		}
	});
	Events.OnLeave((e) => {
		Self.ShowLayer(unlocked ? layer.unlocked : layer.closed);
		// Sound.Play("door-close.mp3")

		// Reset collision state.
		opened = false;
		enterSide = 0;
	});
}
