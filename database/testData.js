/* DB-APAUTH
 */
db.apauth.insert({
	"id":"userauxa",
	"entityId":"auxa",
	"username":"a",
	"email":"sylvie.charpentier@kiko.mail",
	"password":"a",
	"roles":["aux"],
	"type":"auxiliary",
	"active":true,
	"registrationDate":[2016, 2, 15, 0, 0],
	"registered":true
})
db.apauth.insert({
	"id":"usersadz",
	"entityId":"sadz",
	"username":"z",
	"email":"auxiliare.pro@kiko.mail",
	"password":"z",
	"roles":["sad"],
	"type":"service",
	"active":true,
	"registrationDate":[2016, 2, 23, 0, 0],
	"registered":true
})

/* DB-AUXILIARY
 */
db.auxiliary.insert({
	"id":"auxa",
	"userId":"userauxa",
	"accountType": "Premium",
	"accountExpiryDate":[NumberInt(2017),NumberInt(12),NumberInt(31)],
	"notifyOffersMail":true,
	"notifyOffersSms":true,
	"avatar":"0000000000A",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Charpentier",
	"firstName":"Sylvie",
	"email":"sylvie.charpentier@kiko.mail",
	"emailChecked":true,
	"phone":"0101020301",
	"phoneChecked":true,
	"address":"35 rue d'Alsace",
	"postalCode":NumberInt(92300),
	"city":"Levallois-Peret",
	"country":"France",
	"lattitude":48.892556,
	"longitude":2.297584,
	"addressChecked":true,
	"description":"Je suis une super auxiliaire de vie !!!",
	"socialNumber":"2720192",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":[NumberInt(1972),NumberInt(1),NumberInt(3)],
	"nationality":"Française",
	"isEntrepreneur":true,
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(4),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(4),
	"skillShopping":NumberInt(1),
	"diploma":"Diplome d'etat d'auxiliarie de vie",
	"diplomaImage":"000000000DA",
	"idCardNumber":NumberLong(123456789012)
})

/* DB-SERVICE
 */
db.service.insert({
	"id":"sadz",
	"userId":"usersadz",
	"accountType": "Premium",
	"accountExpiryDate":[NumberInt(2017),NumberInt(12),NumberInt(31)],
	"avatar":"0000000000Z",
	"isTutoSkipped":true,
	"function":"Mand",
	"socialReason":"L'Escargot",
	"siret":"65657897896548",
	"phone":"0123456789",
	"phoneChecked":true,
	"email":"auxiliare.pro@kiko.mail",
	"emailChecked":true,
	"address":"73 rue Legendre",
	"postalCode":NumberInt(75017),
	"city":"Paris",
	"country":"France",
	"lattitude":48.887099,
	"longitude":2.319155,
	"addressChecked":true
})
