function main() {
	var playerSpeed = 12;
	var Vx = Vy = 0;

	var animating = false;
	var animStart = animEnd = 0;

	Self.SetMobile(true);
	Self.SetInventory(true);
	Self.SetGravity(true);
	Self.SetHitbox(0, 0, 32, 52);
	Self.AddAnimation("walk-left", 200, ["stand-left", "walk-left-1", "walk-left-2", "walk-left-3", "walk-left-2", "walk-left-1"]);
	Self.AddAnimation("walk-right", 200, ["stand-right", "walk-right-1", "walk-right-2", "walk-right-3", "walk-right-2", "walk-right-1"]);

	// If the player suddenly changes direction, reset the animation state to quickly switch over.
	var lastVelocity = Vector(0, 0);

	Events.OnKeypress(function (ev) {
		Vx = 0;
		Vy = 0;

		var curVelocity = Self.GetVelocity();
		if ((lastVelocity.X < 0 && curVelocity.X > 0) ||
			(lastVelocity.X > 0 && curVelocity.X < 0)) {
			Self.StopAnimation();
		}
		lastVelocity = curVelocity;

		if (ev.Right) {
			if (!Self.IsAnimating()) {
				Self.PlayAnimation("walk-right", null);
			}
			Vx = playerSpeed;
		} else if (ev.Left) {
			if (!Self.IsAnimating()) {
				Self.PlayAnimation("walk-left", null);
			}
			Vx = -playerSpeed;
		} else {
			Self.StopAnimation();
			animating = false;
		}

		// Self.SetVelocity(Point(Vx, Vy));
	})
}
