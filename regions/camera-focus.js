// Camera Region
//
// When it receives power, it attracts the camera's focus for a while.

// configuration
const ticksToInsist = 24;

let powered = false;

function main() {
    Self.Hide();

    let timer = null;

    Message.Subscribe("power", (v) => {
        if (powered && !v) {
            // Lost power, we can do this again next time.
            powered = false;
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }
            return;
        }

        // Look at me!
        Self.CameraFollowMe();

        // And insist a while.
        if (timer === null) {
            let insistUntil = GetTick() + ticksToInsist;
            timer = setInterval(() => {
                if (GetTick() < insistUntil) {
                    Self.CameraFollowMe();
                } else {
                    clearInterval(timer);
                }
            }, 10);
        }

        powered = v;
    })
}
