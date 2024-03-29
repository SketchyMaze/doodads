// Anvil
var falling = false;

function main() {
    // Note: doodad is not "solid" but hurts if it falls on you.
    Self.SetHitbox(0, 0, 48, 25);
    Self.SetMobile(true);
    Self.SetGravity(true);
    Self.SetInvulnerable(true);

    // Monitor our Y position to tell if we've been falling.
    let lastPoint = Self.Position();
    setInterval(() => {
        let nowAt = Self.Position();
        if (nowAt.Y > lastPoint.Y) {
            falling = true;
            Self.CameraFollowMe();
        } else {
            falling = false;
        }
        lastPoint = nowAt;
    }, 100);

    Events.OnCollide((e) => {
        if (!e.Settled) {
            return;
        }

        // Were we falling?
        if (falling) {
            if (e.InHitbox) {
                if (e.Actor.IsPlayer()) {
                    // Fatal to the player.
                    Sound.Play("cling.mp3");
                    FailLevel("Watch out for anvils!");
                    return;
                }
                else if (e.Actor.IsMobile() && !e.Actor.Invulnerable()) {
                    // Destroy mobile doodads.
                    Sound.Play("cling.mp3");
                    e.Actor.Destroy();
                }
            }
        }
    });

    // When we receive power, we reset to our original position.
    let origPoint = Self.Position();
    Message.Subscribe("power", (powered) => {
        Self.MoveTo(origPoint);
        Self.SetVelocity(Vector(0, 0));
    });
}
