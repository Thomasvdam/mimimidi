import type midi from "@julusian/midi";
import type { LaunchControlXL } from "@mimimidi/launchcontrol-xl";

export class Controller {
	constructor(
		private input: midi.Input,
		private output: midi.Output,
		private launchControlXL: LaunchControlXL,
	) {
		// TODO: Initialize all controls
	}
}
