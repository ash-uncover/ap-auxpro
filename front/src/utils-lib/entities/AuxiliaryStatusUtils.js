import AuxiliaryStatus from 'utils/constants/AuxiliaryStatus'

class AuxiliaryStatusUtils {

    static getName(status) {
        switch (status) {
            case AuxiliaryStatus.AUTO:
            case AuxiliaryStatus.AUTO.key: return 'Je souhaite travailler pour un particulier (mandataire)' 
            case AuxiliaryStatus.SALARY: 
            case AuxiliaryStatus.SALARY.key: return 'Je souhaite travailler pour une entreprise (prestataire)' 
            case AuxiliaryStatus.BOTH: 
            case AuxiliaryStatus.BOTH.key: return 'Les deux' 
        }
        return ''
    }

    static getValues() {
        return AuxiliaryStatus.VALUES.map(function (value) {
            return {
                key: value.key,
                value: AuxiliaryStatusUtils.getName(value)
            }
        })
    }

    static getNameIntervention(status) {
        switch (status) {
            case AuxiliaryStatus.AUTO:
            case AuxiliaryStatus.AUTO.key: return "Cette mission s'effectue en mandataire" 
            case AuxiliaryStatus.SALARY: 
            case AuxiliaryStatus.SALARY.key: return "Cette mission s'effectue en prestataire" 
            case AuxiliaryStatus.BOTH: 
            case AuxiliaryStatus.BOTH.key: return "Cette mission peut s'effectuer en mandataire ou prestataire"
        }
        return ''
    }

    static getValuesIntervention() {
        return AuxiliaryStatus.VALUES.map(function (value) {
            return {
                key: value.key,
                value: AuxiliaryStatusUtils.getNameIntervention(value)
            }
        })
    }

}
export default AuxiliaryStatusUtils