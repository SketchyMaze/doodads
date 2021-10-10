function main() {
	var color = Self.GetTag("color");
	var quantity = color === "small" ? 1 : 0;

	Events.OnCollide(function (e) {
		if (e.Settled) {
			if (e.Actor.HasInventory()) {
				// If we don't have a quantity, and the actor already has
				// one of us, don't pick it up so the player can get it.
				if (quantity === 0 && e.Actor.HasItem(Self.Filename) === 0 && !e.Actor.IsPlayer()) {
					return;
				}

				Sound.Play("item-get.wav")
				e.Actor.AddItem(Self.Filename, quantity);
				Self.Destroy();
			}
		}
	})
}
