import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ErrorHelper from 'helpers/ErrorHelper'
import CustomerHelper from 'helpers/CustomerHelper'
import InterventionHelper from 'helpers/InterventionHelper'
import moment from 'moment'
import { BaseData, Day, Utils, MomentHelper } from 'ap-react-bootstrap'

// utils
import Diploma from 'utils/constants/Diploma'
import InterventionRecurencePeriod from 'utils/constants/InterventionRecurencePeriod'
// utils-lib
import InterventionType from 'utils-lib/constants/InterventionType'
import CustomerUtils from 'utils-lib/entities/CustomerUtils'
import DiplomaUtils from 'utils-lib/entities/DiplomaUtils'
import InterventionFields from 'utils/entities/InterventionFields'
import InterventionRecurencePeriodUtils from 'utils-lib/entities/InterventionRecurencePeriodUtils'
import InterventionUtils from 'utils-lib/entities/InterventionUtils'

class ServiceInterventionEditData extends BaseData {

	constructor() {
		super()

		this.MODES = {
			CREATE: 'CREATE',
			EDIT: 'EDIT'
		}

		let defaultDate = MomentHelper.toLocalDate(moment())
		
		this.FIELDS = {
			CUSTOMER_ID: Object.assign(
				{ form: 'select', name: InterventionUtils.getFieldName(InterventionFields.CUSTOMER_ID) }, 
				InterventionFields.CUSTOMER_ID,
				{ validator: this.checkCustomerId.bind(this) }
			),
			PERIOD: Object.assign(
				{ form: 'select', defaultValue: InterventionRecurencePeriod.HOURS.key, name: InterventionUtils.getFieldName(InterventionFields.PERIOD) },
				InterventionFields.PERIOD, 
				{ validator: this.checkPeriod.bind(this), values: InterventionRecurencePeriod.VALUES.map(this.getRecurence) }
			),
			START_DATE: Object.assign(
				{ form: 'date', defaultValue: defaultDate, name: InterventionUtils.getFieldName(InterventionFields.START_DATE) }, 
				InterventionFields.START_DATE,
				{ validator: this.checkStartDate.bind(this) }
			),
			END_DATE: Object.assign(
				{ form: 'date', defaultValue: defaultDate, name: InterventionUtils.getFieldName(InterventionFields.END_DATE) }, 
				InterventionFields.END_DATE,
				{ validator: this.checkEndDate.bind(this), hidden: this.hideEndDate.bind(this) }
			),
			START_TIME: Object.assign(
				{ form: 'time', defaultValue: [0, 0], name: InterventionUtils.getFieldName(InterventionFields.START_TIME) }, 
				InterventionFields.START_TIME,
				{ validator: this.checkStartTime.bind(this) }
			),
			END_TIME: Object.assign(
				{ form: 'time', defaultValue: [0, 0], name: InterventionUtils.getFieldName(InterventionFields.END_TIME) }, 
				InterventionFields.END_TIME,
				{ validator: this.checkEndTime.bind(this) }
			),
			DAYS: Object.assign(
				{ form: 'days', defaultValue: [], name: InterventionUtils.getFieldName(InterventionFields.DAYS) }, 
				InterventionFields.DAYS,
				{ validator: this.checkDays.bind(this), values: Day.VALUES }
			),
			DIPLOMAS: Object.assign(
				{ form: 'selectmulti', defaultValue: [], name: InterventionUtils.getFieldName(InterventionFields.DIPLOMAS) }, 
				InterventionFields.DIPLOMAS,
				{ validator: this.checkDiplomas.bind(this), values: DiplomaUtils.getDiplomas() }
			)
		}

		this.FIELDS_FORM0 = [
			this.FIELDS.CUSTOMER_ID
		]

		this.FIELDS_FORM1 = [
			this.FIELDS.PERIOD,
			this.FIELDS.START_DATE,
			this.FIELDS.END_DATE,
			this.FIELDS.START_TIME,
			this.FIELDS.END_TIME
		]

		this.FIELDS_FORM2 = [
			this.FIELDS.DAYS
		]

		this.FIELDS_FORM3 = [
			this.FIELDS.DIPLOMAS
		]
	}

	register(obj, interventionId) {
		super.register(obj)

		this.interventionId = interventionId

		this.declareFunction('onCancel')
		this.declareFunction('onSubmit')

		this.obj.state.mode = interventionId !== 'new' ? this.MODES.EDIT : this.MODES.CREATE
		
		if (this.getState('mode') === this.MODES.EDIT) {
			let type = InterventionUtils.getType(InterventionHelper.getData(interventionId))
			if (type === InterventionType.OFFERED || type === InterventionType.PLANNED) {
				AppHelper.navigate('/service/interventions/' + interventionId)
				return
			}
		}
		
		let customers = this.getCustomers()

		this.FIELDS.CUSTOMER_ID.values = customers
		this.FIELDS.CUSTOMER_ID.defaultValue = customers && customers.length && customers[0].key

		this.loadIntervention(InterventionHelper.getData(interventionId) || {})
		this.checkIntervention()

		ErrorHelper.register('GET_INTERVENTION', this, this.handleGetInterventionError.bind(this))
		ErrorHelper.register('POST_INTERVENTION', this, this.handlePostInterventionError.bind(this))
		ErrorHelper.register('PUT_INTERVENTION', this, this.handlePutInterventionError.bind(this))
		ErrorHelper.register('DELETE_INTERVENTION', this, this.handleDeleteInterventionError.bind(this))
	}

	unregister() {
		ErrorHelper.unregister(this)
	}


	// Store notifications //
	// --------------------------------------------------------------------------------

	handleGetInterventionError() {
		let errorData = ErrorHelper.getData('GET_INTERVENTION')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la récupération de l'intervention" ]
			})
		}
	}
	handlePutInterventionError() {
		let errorData = ErrorHelper.getData('PUT_INTERVENTION')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la mise à jour de l'intervention" ]
			})
		}
	}
	handlePostInterventionError() {
		let errorData = ErrorHelper.getData('POST_INTERVENTION')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la création de l'intervention" ]
			})
		}
	}
	handleDeleteInterventionError() {
		let errorData = ErrorHelper.getData('DELETE_INTERVENTION')
		if (errorData) {
			this.setState({
				errorShow: true,
				errorMsg: [ "Une erreur est survenue pendant la supression de l'intervention" ]
			})
		}
	}


	// View callbacks //
	// --------------------------------------------------------------------------------

	onChange(id, event, value) {
		// Pre processing on values
		if (id === InterventionFields.DIPLOMAS.key) {
			let current = this.getState(InterventionFields.DIPLOMAS.key)
			if (value.indexOf(Diploma.DIPLOMA_NONE.key) !== -1) {
				if (current.indexOf(Diploma.DIPLOMA_NONE.key) === -1) {
					value = [Diploma.DIPLOMA_NONE.key]
				} else {
					value.splice(value.indexOf(Diploma.DIPLOMA_NONE.key), 1)
				}
			} else if (value.indexOf(Diploma.DIPLOMA_STUDY.key) !== -1) {
				if (current.indexOf(Diploma.DIPLOMA_STUDY.key) === -1) {
					value = [Diploma.DIPLOMA_STUDY.key]
				} else {
					value.splice(value.indexOf(Diploma.DIPLOMA_STUDY.key), 1)
				}
			}
		}
		// State global update
		this.obj.state.dirty = true
		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []
		this.obj.state[id] = value
		// Check data consistency
		this.checkIntervention(this.obj.state)
		// Update component
		this.forceUpdate()
	}

	onCancel() {
		AppHelper.navigateBack()
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(function() {
			let intervention = this.buildIntervention()
			if (this.getState('mode') === this.MODES.CREATE) {
				return InterventionHelper.postIntervention(intervention)
			} else {
				return InterventionHelper.putIntervention(intervention)
			}
		}.bind(this)).
		then(function () {
			return InterventionHelper.getServiceInterventions(AuthHelper.getEntityId())
		}).
		then(function () {
			AppHelper.navigateBack()
			setTimeout(AppHelper.setBusy, 200)
		}).
		catch(function (error) {
			setTimeout(AppHelper.setBusy, 200)
			console.error('Intervention submit error')
			console.error(error)
		})
	}


	// Internal methods //
	// --------------------------------------------------------------------------------

	buildIntervention() {
		let intervention = (this.getState('mode') === this.MODES.CREATE) ?
			{ serviceId: AuthHelper.getEntityId() } :
			Object.assign({}, InterventionHelper.getData(this.interventionId))
			
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			if (InterventionFields.get(field.key)) {
				intervention[field.key] = this.getState(field.key)
			}
		}
		if (intervention.period === InterventionRecurencePeriod.HOURS.key) {
			delete intervention.days
			delete intervention.endDate
		}
		return intervention
	}

	loadIntervention(intervention) {
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let value = intervention[field.key] || field.defaultValue
			this.obj.state[field.key] = field.formatter ? field.formatter(value) : value
		}
	}

	checkIntervention() {
		this.obj.state.errorShow = false
		this.obj.state.errorMsg = []
		this.obj.state.warningShow = false
		this.obj.state.warningMsg = []
		//
		for (let f in this.FIELDS) {
			let field = this.FIELDS[f]
			let state = field.validator(this.getState(field.key))
			this.obj.state[field.key + 'State'] = state.state
			this.obj.state[field.key + 'Warning'] = state.message
			if (state.message) {
				this.obj.state.warningMsg.push({
					key: field.key,
					value: state.message
				})
				this.obj.state.warningShow = true
			}
		}
	}
	checkCustomerId() {
		return this.getState('customerId') ? { state: 'success' } : { state: 'error', message: 'Vous devez sélectionner un usager' }
	}
	checkPeriod() {
		return this.getState('period') ? { state: 'success' } : { state: 'error', message: 'Vous devez sélectionner une période' }
	}
	checkStartDate() {
		if (!this.getState('startDate')) {
			return { state: 'error', message: 'Vous devez spécifier une date de début' }
		}
		if (this.getState('period') === InterventionRecurencePeriod.HOURS.key) {
			return { state: 'success' }
		}
		let startMoment = MomentHelper.fromLocalDate(this.getState('startDate'))
		let endMoment = this.getState('endDate') ? MomentHelper.fromLocalDate(this.getState('endDate')) : null
		if (endMoment && endMoment.isBefore(startMoment)) {
			return { state: 'error', message: 'La date de début doit être avant la date de fin' }
		}
		return { state: 'success' }
	}
	checkEndDate() {
		if (this.getState('period') === InterventionRecurencePeriod.HOURS.key) {
			return { state: 'success' }
		}
		if (!this.getState('endDate')) {
			return { state: 'error', message: 'Vous devez spécifier une date de fin' }
		}
		let startMoment = MomentHelper.fromLocalDate(this.getState('startDate'))
		let endMoment = MomentHelper.fromLocalDate(this.getState('endDate'))
		if (endMoment.isBefore(startMoment)) {
			return { state: 'error' }
		}
		let currentMoment = moment().startOf('day')
		if (currentMoment.isAfter(endMoment)) {
			return { state: 'error', message: 'La date de fin ne peut pas être dans le passé' }
		}
		return { state: 'success' }
	}
	checkStartTime() {
		if (!this.getState('startTime')) {
			return { state: 'error', message: 'Vous devez spécifier un horaire de démarrage' }
		}
		return { state: 'success' }
	}
	checkEndTime(intervention) {
		if (!this.getState('endTime')) {
			return { state: 'error', message: 'Vous devez spécifier un horaire de fin' }
		}
		return { state: 'success' }
	}
	checkDays() {
		if (this.getState('period') === InterventionRecurencePeriod.HOURS.key) {
			return { state: 'success' }
		}
		if (!this.getState('days') || !this.getState('days').length) {
			return { state: 'error', message: 'Vous devez sélectionner au moins un jour' }
		}
		return { state: 'success' }
	}
	checkDiplomas() {
		return { state: 'success' }
	}

	hideEndDate() {
		return this.getState(InterventionFields.PERIOD.key) === InterventionRecurencePeriod.HOURS.key
	}

	getRecurence(value) {
		return {
			key: value.key,
			value: InterventionRecurencePeriodUtils.getShortName(value.key)
		}
	}
	getCustomer(customer) {
		return {
			key: customer.id,
			value: CustomerUtils.getFullName(customer)
		}
	}
	getCustomers() {
		return Utils.map(CustomerHelper.getData(), this.getCustomer)
	}
}

let ServiceInterventionEditObj = new ServiceInterventionEditData()
export default ServiceInterventionEditObj
