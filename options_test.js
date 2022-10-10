// Test doodad script for Options.
function main() {
    console.error("OptionsTest Doodad: %s (%s)", Self.Title, Self.ID());
    const options = Self.Options();
    for (let item of options) {
        let value = Self.GetOption(item);
        console.log("Option %s = %+v", item, value);

        if (value === true) {
            console.log("It is a true boolean!");
        } else if (value === false) {
            console.log("It is a false boolean!");
        }
    }
}