package org.ap.auxpro.constants;

/* This class was auto-generated by the JavaWriter */
public enum EDiploma {

	_DIPLOMA_NONE ("diploma_none"),
	_DIPLOMA_STUDY ("diploma_study"),
	_DIPLOMA_1 ("diploma_1"),
	_DIPLOMA_2 ("diploma_2"),
	_DIPLOMA_3 ("diploma_3"),
	_DIPLOMA_4 ("diploma_4"),
	_DIPLOMA_5 ("diploma_5"),
	_DIPLOMA_6 ("diploma_6"),
	_DIPLOMA_7 ("diploma_7"),
	_DIPLOMA_8 ("diploma_8"),
	_DIPLOMA_9 ("diploma_9"),
	_DIPLOMA_10 ("diploma_10"),
	_DIPLOMA_11 ("diploma_11"),
	_DIPLOMA_12 ("diploma_12"),
	_DIPLOMA_13 ("diploma_13"),
	_DIPLOMA_14 ("diploma_14"),
	_DIPLOMA_15 ("diploma_15"),
	_DIPLOMA_16 ("diploma_16"),
	_DIPLOMA_17 ("diploma_17"),
	_DIPLOMA_18 ("diploma_18"),
	_DIPLOMA_19 ("diploma_19"),
	_DIPLOMA_20 ("diploma_20"),
	_DIPLOMA_21 ("diploma_21"),
	_DIPLOMA_22 ("diploma_22"),
	_DIPLOMA_23 ("diploma_23"),
	_DIPLOMA_24 ("diploma_24"),
	_DIPLOMA_25 ("diploma_25"),
	_DIPLOMA_26 ("diploma_26"),
	_DIPLOMA_27 ("diploma_27"),
	_DIPLOMA_28 ("diploma_28"),
	_DIPLOMA_29 ("diploma_29"),
	_DIPLOMA_30 ("diploma_30"),
	_DIPLOMA_31 ("diploma_31"),
	_DIPLOMA_32 ("diploma_32"),
	_DIPLOMA_33 ("diploma_33"),
	_DIPLOMA_34 ("diploma_34"),
	_DIPLOMA_35 ("diploma_35"),
	_DIPLOMA_36 ("diploma_36"),
	;

	private String _name;

	private EDiploma(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static EDiploma getByName(String name) {
		for (EDiploma value: EDiploma.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
