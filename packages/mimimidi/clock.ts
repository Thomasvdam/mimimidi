import type midi from "@julusian/midi";
import {
	BEATS_PER_BAR,
	ClockDivider,
	MIDI_PPQ,
	NOTES_PER_BEAT,
} from "@mimimidi/clock-divider";
import type {
	LaunchControlXL,
	SideButtonInput,
} from "@mimimidi/launchcontrol-xl";
import { SONG_START, TIMING_CLOCK } from "@mimimidi/midi-constants";

export class Clock {
	private quarterNoteDivider: ClockDivider;
	private beatDivider: ClockDivider;

	private quarterNote = 0;
	private beat = 0;

	constructor(
		private input: midi.Input,
		private launchControlXL: LaunchControlXL,
	) {
		this.quarterNoteDivider = new ClockDivider(MIDI_PPQ);
		this.beatDivider = new ClockDivider(NOTES_PER_BEAT);

		this.quarterNoteDivider.on("tick", this.onQuarterNote);
		this.beatDivider.on("tick", this.onBeat);

		this.input.on("message", this.onMidiMessage);
	}

	private onMidiMessage(deltaTime: number, message: midi.MidiMessage) {
		const [status] = message;
		switch (status) {
			case TIMING_CLOCK:
				this.quarterNoteDivider.tick();
				break;
			case SONG_START:
				this.reset();
				break;
		}
	}

	reset() {
		this.quarterNote = 0;
		this.beat = 0;
		this.quarterNoteDivider.reset();
		this.beatDivider.reset();

		this.draw();
	}

	private onBeat() {
		this.beat++;
	}

	private onQuarterNote() {
		this.quarterNote++;
		this.beatDivider.tick();

		this.draw();
	}

	private draw() {
		const activeQuarternote = this.quarterNote % NOTES_PER_BEAT;
		const activeBar = this.beat % BEATS_PER_BAR;

		const buttons: SideButtonInput[] = [
			// Bars light up in pairs
			// 0 UP, 1 UP DOWN, 2 LEFT, 3 LEFT RIGHT
			{ name: "up", on: activeBar < 2 },
			{ name: "down", on: activeBar === 1 },
			{ name: "left", on: activeBar === 2 },
			{ name: "right", on: activeBar > 1 },
			// Quarter note lights up by itself from bottom to top
			{ name: "record", on: activeQuarternote === 0 },
			{ name: "solo", on: activeQuarternote === 1 },
			{ name: "mute", on: activeQuarternote === 2 },
			{ name: "device", on: activeQuarternote === 3 },
		];
		this.launchControlXL.setSideButtons(buttons);
	}
}
