import React from 'react'

import AuxiliaryHelper from 'helpers/AuxiliaryHelper'

import AccountRegisterData from 'components-lib/AccountRegister/AccountRegisterData'

class RegisterAuxiliary extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<AccountRegisterData 
				title="Création compte intervenant"
				action='POST_AUXILIARY'
				helper={AuxiliaryHelper.postAuxiliary} />
		)
	}
}
export default RegisterAuxiliary
