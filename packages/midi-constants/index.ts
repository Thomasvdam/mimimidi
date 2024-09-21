/**
 * MIDI clock pulse. Usually sent 24 times per quarter note.
 */
export const TIMING_CLOCK = 0xf8;

/**
 * Message sent when the song starts playback form the start. Should reset all clocks.
 */
export const SONG_START = 0xfa;

/**
 * Message sent when the song continues playback.
 */
export const SONG_CONTINUE = 0xfb;

/**
 * Message sent when the song stops playback.
 */
export const SONG_STOP = 0xfc;
