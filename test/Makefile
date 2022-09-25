ALL: build

.PHONY: build
build:
	# Mischievous JS script tests.
	doodad convert -t "Mischievous Script Test" mischievous.png TEST-mischievous.doodad
	doodad install-script mischievous.js TEST-mischievous.doodad

	# Exception raiser.
	doodad convert -t "Exception Raiser Test" exceptions.png TEST-exceptions.doodad
	doodad install-script exceptions.js TEST-exceptions.doodad

	for i in *.doodad; do\
		doodad edit-doodad --tag "category=technical" --hide $${i};\
	done
	cp *.doodad ../../../assets/doodads/
