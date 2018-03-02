package org.ap.auxpro.constants;

/* This class was auto-generated by the JavaWriter */
public enum EInterventionStatus {

	_PENDING ("Pending"),
	_MATCHING ("Matching"),
	_ON_GOING ("OnGoing"),
	_CANCELED ("Canceled"),
	;

	private String _name;

	private EInterventionStatus(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static EInterventionStatus getByName(String name) {
		for (EInterventionStatus value: EInterventionStatus.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
