// Solid Region
function main() {
    Self.Hide();

    Events.OnCollide((e) => {
        // Solid to everybody - the whole canvas hitbox.
        return false;
    });
}
