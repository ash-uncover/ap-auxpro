package org.ap.auxpro.constants;

/* This class was auto-generated by the JavaWriter */
public enum EOfferStatusAux {

	_PENDING ("Pending"),
	_ACCEPTED ("Accepted"),
	_DECLINED ("Declined"),
	;

	private String _name;

	private EOfferStatusAux(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static EOfferStatusAux getByName(String name) {
		for (EOfferStatusAux value: EOfferStatusAux.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
