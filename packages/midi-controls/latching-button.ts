import { EventEmitter } from "node:events";

export class LatchingButton extends EventEmitter<{
	value: [on: boolean, latched: boolean];
}> {
	private value = false;

	private latched = true;
	private momentaryEngaged = false;
	private storedValue = false;

	updateValue(value: number) {
		this.value = value === 127;

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

		this.latched = this.storedValue === this.value;
	}
}
