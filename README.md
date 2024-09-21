# MimiMidi

A simple tool to help me keep track of where I am in a 'performance'. Displays bars, triplets, etc on a LaunchPad mini so I can hopefully time transitions a bit better.

## Raspberry Setup

Based on experience in a previous project and with the help of https://github.com/brer-rabbit/zoxnoxious I ended up with the following setup.

1. Flash the SD card with Debian Bullseye 64bit Lite. I couldn't get Bookworm to work.
1. In the `/boot/config.txt` (before first boot, otherwise `/boot/firmware/config.txt`) comment `otg_mode=1`, change `dtoverlay=dwc2`, add `disable_splash=1`, and add `boot_delay=0`.
1. Create file: `/boot/create-midi-gadget`. Use the template in this repo for the contents.
1. Make the file executable: `sudo chmod +x /boot/create-midi-gadget`.
1. Create file: `/etc/systemd/system/create-midi-gadget.service`, will need `sudo`. Use the template in this repo for the contents.
1. Install and enable the service (`sudo systemctl enable create-midi-gadget.service`).
1. Install Bun <3 `curl -fsSL https://bun.sh/install | bash`.
