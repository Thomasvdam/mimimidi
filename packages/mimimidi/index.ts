import midi from "@julusian/midi";
import { LaunchControlXL } from "@mimimidi/launchcontrol-xl";
import { Clock } from "./clock";

const MIDI_GADGET_PORT_NAME = "f_midi:f_midi 20:0";

const input = new midi.Input();
// Enable timing messages
input.ignoreTypes(true, false, true);
input.openPortByName(MIDI_GADGET_PORT_NAME);

const output = new midi.Output();
output.openPortByName(MIDI_GADGET_PORT_NAME);

process.on("beforeExit", () => {
	input.destroy();
	output.destroy();
});

const launchControlXL = new LaunchControlXL(output);
const clock = new Clock(input, launchControlXL);

launchControlXL.enableFlashing();
launchControlXL.reset();

// TODO: Startup sequence

launchControlXL.reset();
clock.reset();

// TODO: Read config from file

// Keep the process alive with minimal resources. Might also be interesting for additional features
// in the future.
Bun.serve({
	fetch() {
		return new Response("not-implemented", { status: 400 });
	},
});
