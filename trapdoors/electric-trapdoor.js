// Electric Trapdoor

var animationSpeed = 100,
    spriteWidth = 114,
    thickness = 7,
    isOpen = Self.GetOption("opened") === true,
    animating = false,
    powerState = false;

function main() {
    Self.SetHitbox(0, 2, spriteWidth, thickness);

    Self.AddAnimation("open", animationSpeed, [0, 1, 2, 3]);
    Self.AddAnimation("close", animationSpeed, [3, 2, 1, 0]);

    // Options: if the player marked it "opened" make it open by default.
    if (isOpen) {
        Self.ShowLayer(3);
        powerState = true;
    }

    // Subscribe to Switches and other power sources. Note: if a
    // switch toggles us, we ignore the immediately following
    // power signal which will be coming from the same switch.
    // The electric trapdoor always toggles when hit by a switch.
    var ignoreNextPower = false;
    Message.Subscribe("switch:toggle", function (powered) {
        ignoreNextPower = true
        setPoweredState(!powerState);
    });
    Message.Subscribe("power", function (powered) {
        if (ignoreNextPower) {
            ignoreNextPower = false;
            return;
        }
        setPoweredState(powered);
    });

    Events.OnCollide(function (e) {
        if (e.InHitbox && !isOpen) {
            return false;
        }
    })
}

function setPoweredState(powered) {
    powerState = powered;

    if (powered) {
        if (animating || isOpen) {
            return;
        }

        animating = true;
        Sound.Play("gears.mp3");
        Self.PlayAnimation("open", function () {
            isOpen = true;
            animating = false;

            // Had we lost power quickly?
            if (!powerState) {
                setPoweredState(false);
            }
        });
    } else {
        animating = true;
        Sound.Play("gears.mp3");
        Self.PlayAnimation("close", function () {
            isOpen = false;
            animating = false;
        });
    }
}
