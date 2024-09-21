import { EventEmitter } from "node:events";

export const MIDI_PPQ = 24;
export const NOTES_PER_BEAT = 4;
export const BEATS_PER_BAR = 4;

export class ClockDivider extends EventEmitter<{
	reset: [];
	tick: [number];
}> {
	private tickCount = 0;

	constructor(private divisor: number) {
		super();
	}

	public reset() {
		this.tickCount = 0;
		this.emit("reset");
	}

	public tick() {
		this.tickCount++;

		const isDivisor = this.tickCount % this.divisor === 0;
		if (isDivisor) {
			this.emit("tick", this.tickCount / this.divisor);
		}
	}
}
