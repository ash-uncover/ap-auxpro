package org.ap.auxpro.constants;

/* This class was auto-generated by the JavaWriter */
public enum EAuxiliaryDiploma {

	_NO_DIPLOMA ("no_diploma"),
	_DIPLOMA_AAPAPD ("diploma_aapapd"),
	_DIPLOMA_ADVF ("diploma_advf"),
	_DIPLOMA_ASSITANT_MATERNEL ("diploma_assitant_maternel"),
	_DIPLOMA_AUXILIAIRE_PUERI ("diploma_auxiliaire_pueri"),
	_DIPLOMA_BAC_ASSP ("diploma_bac_assp"),
	_DIPLOMA_BEP_ACCOMPAGNEMENT ("diploma_bep_accompagnement"),
	_DIPLOMA_BEPA ("diploma_bepa"),
	_DIPLOMA_CAP_ASSITANT ("diploma_cap_assitant"),
	_DIPLOMA_CAP_ENFANCE ("diploma_cap_enfance"),
	_DIPLOMA_CAPA ("diploma_capa"),
	_DIPLOMA_DEAES ("diploma_deaes"),
	_DIPLOMA_DEAF ("diploma_deaf"),
	_DIPLOMA_DEAMP ("diploma_deamp"),
	_DIPLOMA_DEAS ("diploma_deas"),
	_DIPLOMA_DEAVS ("diploma_deavs"),
	_DIPLOMA_DEEJE ("diploma_deeje"),
	_DIPLOMA_FAMILY ("diploma_family"),
	_DIPLOMA_MENTION ("diploma_mention"),
	_DIPLOMA_TITRE_PRO ("diploma_titre_pro"),
	;

	private String _name;

	private EAuxiliaryDiploma(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static EAuxiliaryDiploma getByName(String name) {
		for (EAuxiliaryDiploma value: EAuxiliaryDiploma.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
