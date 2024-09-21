// Makes it easier to iterate over the columns with type safety.
export const COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7] as const;

// Row controls
export const ROW_MAPPING = [
	"knob_1",
	"knob_2",
	"knob_3",
	"fader",
	"button_1",
	"button_2",
] as const;

export const ROW_OUTPUT_MAPPING = {
	knob_1: 0,
	knob_2: 1,
	knob_3: 2,
	button_1: 3,
	button_2: 4,
} as const;

export const COLOUR_MAPPING = {
	off: 12,
	red: 15,
	amber: 63,
	green: 60,
	redFlashing: 11,
	amberFlashing: 59,
	greenFlashing: 56,
} as const;

export type ColumnControl = {
	column: (typeof COLUMNS)[number];
	name: keyof typeof ROW_OUTPUT_MAPPING;
	colour: keyof typeof COLOUR_MAPPING;
};

// Side buttons
export const SIDE_BUTTON_MAPPING = [
	"up",
	"down",
	"left",
	"right",
	"device",
	"mute",
	"solo",
	"record",
] as const;

export const SIDE_BUTTON_OUTPUT_MAPPING: Record<
	(typeof SIDE_BUTTON_MAPPING)[number],
	number
> = {
	device: 40,
	mute: 41,
	solo: 42,
	record: 43,
	up: 44,
	down: 45,
	left: 46,
	right: 47,
};

export type SideButtonInput = {
	name: (typeof SIDE_BUTTON_MAPPING)[number];
	on: boolean;
};
