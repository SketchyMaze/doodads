SHELL = /bin/bash

ALL: build

.PHONY: build
build:
	doodad convert -t "Thief" stand-right.png stand-left.png \
		walk-right-{1,2,3}.png walk-left-{1,2,3}.png \
		thief.doodad
	doodad install-script thief.js thief.doodad

	doodad edit-doodad --tag "category=creatures" thief.doodad
	doodad edit-doodad -q --option "No A.I.=bool" thief.doodad

	cp *.doodad ../../../assets/doodads/
