import type midi from "@julusian/midi";
import {
	COLOUR_MAPPING,
	type ColumnControl,
	ROW_OUTPUT_MAPPING,
	SIDE_BUTTON_OUTPUT_MAPPING,
	type SideButtonInput,
} from "./types";

// TODO: Maybe make this configurable? For now take the last user template.
const TEMPLATE_INDEX = 7;
const SYSEX_PREFIX = [240, 0, 32, 41, 2, 17, 120, TEMPLATE_INDEX];
const SYSEX_SUFFIX = [247];

export class LaunchControlXL {
	constructor(private output: midi.Output) {}

	/**
	 * Resets all the LEDs on the Launch Control XL.
	 */
	reset() {
		this.output.sendMessage([176 + TEMPLATE_INDEX, 0, 0]);
	}

	/**
	 * Enables flashing mode on the Launch Control XL.
	 */
	enableFlashing() {
		this.output.sendMessage([176 + TEMPLATE_INDEX, 0, 40]);
	}

	setSideButtons(buttons: SideButtonInput[]) {
		const sysex = [...SYSEX_PREFIX];
		for (const button of buttons) {
			sysex.push(SIDE_BUTTON_OUTPUT_MAPPING[button.name], button.on ? 127 : 0);
		}
		sysex.push(...SYSEX_SUFFIX);
		this.output.sendMessage(sysex);
	}

	setColumnLeds(controls: ColumnControl[]) {
		const sysex = [...SYSEX_PREFIX];
		for (const control of controls) {
			const message = ROW_OUTPUT_MAPPING[control.name] * 8 + control.column;
			sysex.push(message, COLOUR_MAPPING[control.colour]);
		}
		sysex.push(...SYSEX_SUFFIX);
		this.output.sendMessage(sysex);
	}
}
