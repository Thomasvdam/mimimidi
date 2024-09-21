import midi from "@julusian/midi";

const MIDI_GADGET_PORT_NAME = "f_midi:f_midi 20:0";

const input = new midi.Input();
// Enable timing messages
input.ignoreTypes(false, false, false);

const output = new midi.Output();

input.openPortByName(MIDI_GADGET_PORT_NAME);
output.openPortByName(MIDI_GADGET_PORT_NAME);

// Echo messages to prove it works
input.on("message", (time, msg) => {
	const [status, data1, data2] = msg;
	output.send([status, data1, data2]);
});

process.on('beforeExit', () => {
    input.destroy();
    output.destroy();
});

// Keep the process alive with minimal resources. Might also be interesting for additional features
// in the future.
Bun.serve({
	fetch() {
		return new Response("not-implemented", { status: 400 });
	},
});
