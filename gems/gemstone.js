// Gem stone collectibles/keys.

const color = Self.GetTag("color"),
    shimmerFreq = 1000,
	hasGravity = Self.GetOption("has gravity") === true;

function main() {
	if (hasGravity) {
		Self.SetMobile(true);
		Self.SetGravity(true);
	}

    Self.AddAnimation("shimmer", 100, [0, 1, 2, 3, 0]);
	Events.OnCollide((e) => {
		if (e.Settled) {
			if (e.Actor.HasInventory()) {
				if (Self.IsOnScreen()) {
					Sound.Play("coin-drop.mp3")
				}
				e.Actor.AddItem(Self.Filename, 1);
				Self.Destroy();
			}
		}
	});

    setInterval(() => {
        Self.PlayAnimation("shimmer", null);
    }, shimmerFreq);
}