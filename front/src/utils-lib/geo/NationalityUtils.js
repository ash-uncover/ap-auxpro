import { Nationality } from 'ap-react-bootstrap'

class NationalityUtils {

	static getNationalities() {
		return Nationality.VALUES.reduce(function (filtered, value) { 
			let name = NationalityUtils.getNationalityFem(value.key)
			if (name) {
				filtered.push({
					key: value.key,
					value: name
				})
			}
			return filtered
		}, []).sort(function (value1, value2) {
			return (value1.value.localeCompare(value2.value))
		})
	}

	static getNationalityFem(field) {
		switch (field) {
			case Nationality.AD.key: return 'andorrane'
			case Nationality.AE.key: return 'des Émirats arabes unis'
			case Nationality.AF.key: return 'afghane'
			case Nationality.AG.key: return "d'Antigua-et-Barbuda"
			case Nationality.AI.key: return "d'Anguilla"
			case Nationality.AL.key: return 'albanaise'
			case Nationality.AM.key: return 'arménienne'
			case Nationality.AO.key: return 'angolaise'
			case Nationality.AQ.key: return "d'Antartique"
			case Nationality.AR.key: return 'argentine'
			case Nationality.AS.key: return 'des Samoas américaines'
			case Nationality.AT.key: return 'autrichienne'
			case Nationality.AU.key: return 'australienne'
			case Nationality.AW.key: return "d'Aruba"
			case Nationality.AX.key: return "des iles Aland"
			case Nationality.AZ.key: return 'azerbaïdjanaise'
			case Nationality.BA.key: return 'de Bosnie-et-Herzégovine'
			case Nationality.BB.key: return 'barbadienne'
			case Nationality.BD.key: return 'bangladaise'
			case Nationality.BE.key: return 'belge'
			case Nationality.BF.key: return 'burkinabè'
			case Nationality.BG.key: return 'bulgare'
			case Nationality.BH.key: return 'bahreïnienne'
			case Nationality.BI.key: return 'burundaise'
			case Nationality.BJ.key: return 'béninoise'
			case Nationality.BN.key: return 'du Brunei'
			case Nationality.BO.key: return 'bolivienne'
			case Nationality.BQ.key: return 'de Bonaire, Saint-Eustache et Saba'
			case Nationality.BR.key: return 'brésilienne'
			case Nationality.BS.key: return 'bahamienne'
			case Nationality.BT.key: return 'bhoutanaise'
			case Nationality.BW.key: return 'botswanaise'
			case Nationality.BY.key: return 'bélarussienne'
			case Nationality.BZ.key: return 'bélizienne'
			case Nationality.CA.key: return 'canadienne'
			case Nationality.CD.key: return 'congolaise'
			case Nationality.CF.key: return 'centrafricaine'
			case Nationality.CG.key: return 'congolaise'
			case Nationality.CH.key: return 'suisse'
			case Nationality.CI.key: return 'ivoirienne'
			case Nationality.CL.key: return 'chilienne'
			case Nationality.CM.key: return 'camerounaise'
			case Nationality.CN.key: return 'chinoise'
			case Nationality.CO.key: return 'colombienne'
			case Nationality.CR.key: return 'costaricienne'
			case Nationality.CU.key: return 'cubaine'
			case Nationality.CV.key: return 'cap-verdienne'
			case Nationality.CY.key: return 'chypriote'
			case Nationality.CZ.key: return 'tchèque'
			case Nationality.DE.key: return 'allemande'
			case Nationality.DJ.key: return 'djiboutienne'
			case Nationality.DK.key: return 'danoise'
			case Nationality.DM.key: return 'dominiquaise'
			case Nationality.DO.key: return 'dominicaine'
			case Nationality.DZ.key: return 'algérienne'
			case Nationality.EC.key: return 'équatorienne'
			case Nationality.EE.key: return 'estonienne'
			case Nationality.EG.key: return 'égyptienne'
			case Nationality.ER.key: return 'érythréenne'
			case Nationality.ES.key: return 'espagnole'
			case Nationality.ET.key: return 'éthiopienne'
			case Nationality.FI.key: return 'finlandaise'
			case Nationality.FJ.key: return 'des Îles Fidji'
			case Nationality.FR.key: return 'française'
			case Nationality.GA.key: return 'gabonaise'
			case Nationality.GB.key: return 'britannique'
			case Nationality.GD.key: return 'grenadine'
			case Nationality.GE.key: return 'géorgienne'
			case Nationality.GG.key: return 'de Guernesey'
			case Nationality.GH.key: return 'ghanéenne'
			case Nationality.GM.key: return 'gambienne'
			case Nationality.GN.key: return 'guinéenne'
			case Nationality.GQ.key: return 'équato-guinéenne'
			case Nationality.GR.key: return 'grecque'
			case Nationality.GT.key: return 'guatémaltèque'
			case Nationality.GW.key: return 'de Guinée-Bissau'
			case Nationality.GY.key: return 'guyanienne'
			case Nationality.HN.key: return 'hondurienne'
			case Nationality.HR.key: return 'croate'
			case Nationality.HT.key: return 'haïtienne'
			case Nationality.HU.key: return 'hongroise'
			case Nationality.ID.key: return 'indonésienne'
			case Nationality.IE.key: return 'irlandaise'
			case Nationality.IL.key: return 'israélienne'
			case Nationality.IM.key: return "de l'ile de Man"
			case Nationality.IN.key: return 'indienne'
			case Nationality.IQ.key: return 'iraquienne'
			case Nationality.IR.key: return 'iranienne'
			case Nationality.IS.key: return 'islandaise'
			case Nationality.IT.key: return 'italienne'
			case Nationality.JE.key: return 'de Jersey'
			case Nationality.JM.key: return 'jamaïquaine'
			case Nationality.JO.key: return 'jordanienne'
			case Nationality.JP.key: return 'japonaise'
			case Nationality.KE.key: return 'kényane'
			case Nationality.KG.key: return 'kirghize'
			case Nationality.KH.key: return 'cambodgienne'
			case Nationality.KI.key: return 'kiribatienne'
			case Nationality.KM.key: return 'comorienne'
			case Nationality.KN.key: return 'de Saint-Christophe-et-Nevis'
			case Nationality.KP.key: return 'nord-coréenne'
			case Nationality.KR.key: return 'sud-coréenne'
			case Nationality.KW.key: return 'koweïtienne'
			case Nationality.KZ.key: return 'kazakhe'
			case Nationality.LA.key: return 'laotienne'
			case Nationality.LI.key: return 'liechtensteinoise'
			case Nationality.LR.key: return 'libérienne'
			case Nationality.LS.key: return 'du Lesotho'
			case Nationality.LT.key: return 'lituanienne'
			case Nationality.LU.key: return 'luxembourgeoise'
			case Nationality.LY.key: return 'libyenne'
			case Nationality.MA.key: return 'marocaine'
			case Nationality.MC.key: return 'monégasque'
			case Nationality.MD.key: return 'moldove'
			case Nationality.ME.key: return 'du Monténégro'
			case Nationality.MG.key: return 'malgache'
			case Nationality.MH.key: return 'marshallaise'
			case Nationality.MK.key: return "de l'ancienne République yougoslave de Macédoine"
			case Nationality.ML.key: return 'malienne'
			case Nationality.MM.key: return 'du Myanmar'
			case Nationality.MN.key: return 'mongole'
			case Nationality.MO.key: return 'de Macao'
			case Nationality.MP.key: return ''
			case Nationality.MQ.key: return ''
			case Nationality.MR.key: return 'mauritanienne'
			case Nationality.MS.key: return ''
			case Nationality.MT.key: return 'maltaise'
			case Nationality.MU.key: return 'mauricienne'
			case Nationality.MV.key: return 'maldivienne'
			case Nationality.MW.key: return 'malawienne'
			case Nationality.MX.key: return 'mexicaine'
			case Nationality.MY.key: return 'malaisienne'
			case Nationality.MZ.key: return 'mozambicaine'
			case Nationality.NA.key: return 'namibienne'
			case Nationality.NC.key: return ''
			case Nationality.NE.key: return 'nigérienne'
			case Nationality.NF.key: return ''
			case Nationality.NG.key: return 'nigériane'
			case Nationality.NI.key: return 'nicaraguayenne'
			case Nationality.NL.key: return 'néerlandaise'
			case Nationality.NO.key: return 'norvégienne'
			case Nationality.NP.key: return 'népalaise'
			case Nationality.NR.key: return 'nauruane'
			case Nationality.NU.key: return ''
			case Nationality.NZ.key: return 'néo-zélandaise'
			case Nationality.OM.key: return ''
			case Nationality.PA.key: return 'panaméenne'
			case Nationality.PE.key: return 'péruvienne'
			case Nationality.PF.key: return ''
			case Nationality.PG.key: return ''
			case Nationality.PH.key: return 'philippine'
			case Nationality.PK.key: return 'pakistanaise'
			case Nationality.PL.key: return 'polonaise'
			case Nationality.PM.key: return ''
			case Nationality.PN.key: return ''
			case Nationality.PR.key: return ''
			case Nationality.PS.key: return 'palestinienne'
			case Nationality.PT.key: return 'portugaise'
			case Nationality.PW.key: return 'palauane'
			case Nationality.PY.key: return 'paraguayenne'
			case Nationality.QA.key: return 'qatarienne'
			case Nationality.RE.key: return ''
			case Nationality.RO.key: return 'roumaine'
			case Nationality.RS.key: return 'serbe'
			case Nationality.RU.key: return 'russe'
			case Nationality.RW.key: return 'rwandaise'
			case Nationality.SA.key: return 'saoudienne'
			case Nationality.SB.key: return 'salomonaise'
			case Nationality.SC.key: return 'des Seychelles'
			case Nationality.SD.key: return 'soudanaise'
			case Nationality.SE.key: return 'suédoise'
			case Nationality.SG.key: return 'singapourienne'
			case Nationality.SH.key: return ''
			case Nationality.SI.key: return 'slovène'
			case Nationality.SJ.key: return ''
			case Nationality.SK.key: return 'slovaque'
			case Nationality.SL.key: return 'de Sierra Leone'
			case Nationality.SM.key: return 'saint-marinaise'
			case Nationality.SN.key: return 'sénégalaise'
			case Nationality.SO.key: return 'somalienne'
			case Nationality.SR.key: return 'surinamaise'
			case Nationality.SS.key: return ''
			case Nationality.ST.key: return ''
			case Nationality.SV.key: return 'salvadorienne'
			case Nationality.SX.key: return ''
			case Nationality.SY.key: return 'syrienne'
			case Nationality.SZ.key: return 'swazie'
			case Nationality.TC.key: return ''
			case Nationality.TD.key: return 'tchadienne'
			case Nationality.TF.key: return ''
			case Nationality.TG.key: return 'togolaise'
			case Nationality.TH.key: return 'thaïlandaise'
			case Nationality.TJ.key: return 'tadjike'
			case Nationality.TK.key: return ''
			case Nationality.TL.key: return 'est-timorais'
			case Nationality.TM.key: return 'turkmène'
			case Nationality.TN.key: return 'tunisienne'
			case Nationality.TO.key: return 'tongane'
			case Nationality.TR.key: return 'turque'
			case Nationality.TT.key: return 'trinidadienne'
			case Nationality.TV.key: return 'tuvaluane'
			case Nationality.TW.key: return 'de la République de Chine, de Taïwan'
			case Nationality.TZ.key: return 'tanzanienne'
			case Nationality.UA.key: return 'ukrainienne'
			case Nationality.UG.key: return 'ougandaise'
			case Nationality.UM.key: return ''
			case Nationality.US.key: return 'américaine'
			case Nationality.UY.key: return 'uruguayenne'
			case Nationality.UZ.key: return 'ouzbèke'
			case Nationality.VA.key: return ''
			case Nationality.VC.key: return 'de Saint-Vincent-et-les-Grenadines'
			case Nationality.VE.key: return 'vénézuélienne'
			case Nationality.VG.key: return ''
			case Nationality.VI.key: return ''
			case Nationality.VN.key: return 'vietnamienne'
			case Nationality.VU.key: return 'vanuatuane'
			case Nationality.WF.key: return ''
			case Nationality.WS.key: return 'samoane'
			case Nationality.XK.key: return ''
			case Nationality.YE.key: return 'yéménite'
			case Nationality.YT.key: return ''
			case Nationality.ZA.key: return 'sud-africaine'
			case Nationality.ZM.key: return 'zambienne'
			case Nationality.ZW.key: return 'zimbabwéenne'
		}
		return ''
	}
}
export default NationalityUtils