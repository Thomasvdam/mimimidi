import { EventEmitter } from "node:events";

const LATCH_THRESHOLD = 2;

export class LatchingContinous extends EventEmitter<{
	value: [value: number, latched: boolean];
}> {
	private value = 0;

	private latched = true;
	private momentaryEngaged = false;
	private storedValue = 0;

	updateValue(value: number) {
		this.value = value;
		this.checkLatching();
		this.emitValue();
	}

	private emitValue() {
		this.emit("value", this.value, this.latched);
	}

	toggleMomentary(on: boolean) {
		this.momentaryEngaged = on;

		if (this.momentaryEngaged) {
			this.storedValue = this.value;
			return;
		}

		this.checkLatching();
		this.emitValue();
	}

	private checkLatching() {
		if (this.latched) {
			return;
		}

		if (Math.abs(this.storedValue - this.value) < LATCH_THRESHOLD) {
			this.latched = true;
		}
	}
}
