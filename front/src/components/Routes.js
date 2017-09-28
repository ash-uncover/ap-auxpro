import App from 'components/App'
import AppLogo from 'components/AppLogo'
import AppHome from 'components/home/AppHome'
import Auth from 'components/auth/Auth'
import Login from 'components/auth/login/Login'
import RegisterAuxiliary from 'components/auth/register/auxiliary/RegisterAuxiliary'
import RegisterService from 'components/auth/register/service/RegisterService'
import RegisterConfirmEmail from 'components/auth/register/confirm/RegisterConfirmEmail'
import RegisterConfirm from 'components/auth/register/confirm/RegisterConfirm'
import Register from 'components/auth/register/Register'
import RecoverConfirmEmail from 'components/auth/recover/confirm/RecoverConfirmEmail'
import RecoverConfirm from 'components/auth/recover/confirm/RecoverConfirm'
import Recover from 'components/auth/recover/Recover'
import Logout from 'components/logout/Logout'
import CGU from 'components/infos/cgu/CGU'
import CGV from 'components/infos/cgv/CGV'
import Confidential from 'components/infos/confidential/Confidential'
import Contact from 'components/infos/contact/Contact'
import FAQ from 'components/infos/faq/FAQ'
import Help from 'components/infos/help/Help'
import Presentation from 'components/infos/presentation/Presentation'
import Services from 'components/infos/services/Services'
import Service from 'components/service/Service'
import ServiceHome from 'components/service/home/ServiceHome'
import ServiceTuto from 'components/service/tuto/ServiceTuto'
import ServiceInfos from 'components/service/infos/ServiceInfos'
import ServiceInfosEditSociety from 'components/service/infos/edit/society/ServiceInfosEditSociety'
import ServiceInfosEditAccount from 'components/service/infos/edit/account/ServiceInfosEditAccount'
import ServiceInfosEditEmail from 'components/service/infos/edit/email/ServiceInfosEditEmail'
import ServiceInfosEditPassword from 'components/service/infos/edit/password/ServiceInfosEditPassword'
import ServiceZone from 'components/service/zone/ServiceZone'
import ServiceCustomers from 'components/service/customers/ServiceCustomers'
import ServiceCustomerEdit from 'components/service/customers/edit/ServiceCustomerEdit'
import ServiceCustomer from 'components/service/customers/ServiceCustomer'
import ServiceInterventions from 'components/service/interventions/ServiceInterventions'
import ServiceInterventionEdit from 'components/service/interventions/edit/ServiceInterventionEdit'
import ServiceIntervention from 'components/service/interventions/ServiceIntervention'
import ServiceInterventionMatch from 'components/service/interventions/match/ServiceInterventionMatch'
import ServiceInterventionFollow from 'components/service/interventions/follow/ServiceInterventionFollow'
import ServiceAuxiliaries from 'components/service/auxiliaries/ServiceAuxiliaries'
import ServiceAuxiliary from 'components/service/auxiliaries/ServiceAuxiliary'
import Auxiliary from 'components/auxiliary/Auxiliary'
import AuxiliaryHome from 'components/auxiliary/home/AuxiliaryHome'
import AuxiliaryTuto from 'components/auxiliary/tuto/AuxiliaryTuto'
import AuxiliaryInfos from 'components/auxiliary/infos/AuxiliaryInfos'
import AuxiliaryInfosEditInfos from 'components/auxiliary/infos/edit/infos/AuxiliaryInfosEditInfos'
import AuxiliaryInfosEditAccount from 'components/auxiliary/infos/edit/account/AuxiliaryInfosEditAccount'
import AuxiliaryInfosEditEmail from 'components/auxiliary/infos/edit/email/AuxiliaryInfosEditEmail'
import AuxiliaryInfosEditPassword from 'components/auxiliary/infos/edit/password/AuxiliaryInfosEditPassword'
import AuxiliaryInfosQuestionary from 'components/auxiliary/infos/questionary/AuxiliaryInfosQuestionary'
import AuxiliaryInfosEditQuestionary from 'components/auxiliary/infos/edit/questionary/AuxiliaryInfosEditQuestionary'
import AuxiliaryPlaning from 'components/auxiliary/planing/AuxiliaryPlaning'
import AuxiliaryIndisponibilityEdit from 'components/auxiliary/indisponibilities/edit/AuxiliaryIndisponibilityEdit'
import AuxiliaryZone from 'components/auxiliary/zone/AuxiliaryZone'
import AuxiliaryOffers from 'components/auxiliary/offers/AuxiliaryOffers'
import AuxiliaryOffer from 'components/auxiliary/offers/AuxiliaryOffer'
import AuxiliaryService from 'components/auxiliary/services/AuxiliaryService'
import Redirect from 'components/Redirect'

let authRoutes = [
	{ path: '/login', component: Login },
	{ path: '/register/auxiliary', component: RegisterAuxiliary },
	{ path: '/register/service', component: RegisterService },
	{ path: '/register/confirm/:email', component: RegisterConfirmEmail },
	{ path: '/register/confirm', component: RegisterConfirm },
	{ path: '/register', component: Register },
	{ path: '/recover/confirm/:email', component: RecoverConfirmEmail },
	{ path: '/recover/confirm', component: RecoverConfirm },
	{ path: '/recover', component: Recover },
]
let serviceRoutes = [
	{ path: '/home', component: ServiceHome },
	{ path: '/tuto', component: ServiceTuto },
	{ path: '/infos', component: ServiceInfos },
	{ path: '/infos/edit/society', component: ServiceInfosEditSociety },
	{ path: '/infos/edit/account', component: ServiceInfosEditAccount },
	{ path: '/infos/edit/email', component: ServiceInfosEditEmail },
	{ path: '/infos/edit/password', component: ServiceInfosEditPassword },
	{ path: '/zone', component: ServiceZone },
	{ path: '/customers', component: ServiceCustomers },
	{ path: '/customers/:customerId/edit', component: ServiceCustomerEdit },
	{ path: '/customers/:customerId', component: ServiceCustomer },
	{ path: '/interventions', component: ServiceInterventions },
	{ path: '/interventions/:interventionId/edit', component: ServiceInterventionEdit },
	{ path: '/interventions/:interventionId', component: ServiceIntervention },
	{ path: '/interventions/:interventionId/match', component: ServiceInterventionMatch },
	{ path: '/interventions/:interventionId/follow', component: ServiceInterventionFollow },
	{ path: '/auxiliaries', component: ServiceAuxiliaries },
	{ path: '/auxiliaries/:auxiliaryId', component: ServiceAuxiliary },
]
let auxiliaryRoutes = [
	{ path: '/home', component: AuxiliaryHome },
	{ path: '/tuto', component: AuxiliaryTuto },
	{ path: '/infos', component: AuxiliaryInfos },
	{ path: '/infos/edit/infos', component: AuxiliaryInfosEditInfos },
	{ path: '/infos/edit/account', component: AuxiliaryInfosEditAccount },
	{ path: '/infos/edit/email', component: AuxiliaryInfosEditEmail },
	{ path: '/infos/edit/password', component: AuxiliaryInfosEditPassword },
	{ path: '/infos/questionary', component: AuxiliaryInfosQuestionary },
	{ path: '/infos/edit/questionary', component: AuxiliaryInfosEditQuestionary },
	{ path: '/planing', component: AuxiliaryPlaning },
	{ path: '/indisponibilities/:indisponibilityId/edit', component: AuxiliaryIndisponibilityEdit },
	{ path: '/zone', component: AuxiliaryZone },
	{ path: '/offers', component: AuxiliaryOffers },
	{ path: '/offers/:offerId', component: AuxiliaryOffer },
	{ path: '/services/:serviceId', component: AuxiliaryService },
]
let appRoutes = [
	{ component: AppLogo },
	{ path: '/home', component: AppHome },
	{ path: '/auth', component: Auth, routes: authRoutes },
	{ path: '/logout', component: Logout },
	{ path: '/infos/cgu', component: CGU },
	{ path: '/infos/cgv', component: CGV },
	{ path: '/infos/confidential', component: Confidential },
	{ path: '/infos/contact', component: Contact },
	{ path: '/infos/faq', component: FAQ },
	{ path: '/infos/help', component: Help },
	{ path: '/infos/presentation', component: Presentation },
	{ path: '/infos/services', component: Services },
	{ path: '/service', component: Service, routes: serviceRoutes },
	{ path: '/auxiliary', component: Auxiliary, routes: auxiliaryRoutes },
	{ path: '/*', component: Redirect },
]
let routes = [
	{ path: '/', component: App, routes: appRoutes },
]
export default routes
