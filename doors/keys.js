/*
Colored Keys and Small Key

Options: "has gravity" will make the key subject to gravity.
*/

const color = Self.GetTag("color"),
	quantity = color === "small" ? 1 : 0,
	hasGravity = Self.GetOption("has gravity") === true;

function main() {
	if (hasGravity) {
		Self.SetGravity(hasGravity);
		Self.SetMobile(true);
	}

	Events.OnCollide((e) => {
		if (e.Settled) {
			if (e.Actor.HasInventory()) {
				// If we don't have a quantity, and the actor already has
				// one of us, don't pick it up so the player can get it.
				if (quantity === 0 && e.Actor.HasItem(Self.Filename) === 0 && !e.Actor.IsPlayer()) {
					return;
				}

				if (Self.IsOnScreen()) {
					Sound.Play("item-get.mp3")
				}
				e.Actor.AddItem(Self.Filename, quantity);
				Self.Destroy();
			}
		}
	})
}
