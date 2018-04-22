import React from 'react'

import ServiceHelper from 'helpers/ServiceHelper'

import AccountRegisterData from 'components-lib/AccountRegister/AccountRegisterData'

class RegisterService extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<AccountRegisterData 
				title="Création compte Société d'aide à la personne"
				action='POST_SERVICE'
				helper={ServiceHelper.postService} />
		)
	}

}
export default RegisterService
