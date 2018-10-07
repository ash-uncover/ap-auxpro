/* ****************************************************************************************
 * DB-APAUTH
 */
db.apauth.insert({
	"id":"userauxa",
	"entityId":"auxa",
	"username":"a",
	"email":"sylvie.charpentier@kiko.mail",
	"password":"a",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-02"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxb",
	"entityId":"auxb",
	"username":"b",
	"email":"jean.edouard@kikomail.lol",
	"password":"b",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-04"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxc",
	"entityId":"auxc",
	"username":"c",
	"email":"rachel.caudran@kikomail.lol",
	"password":"c",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-06"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxd",
	"entityId":"auxd",
	"username":"d",
	"email":"catherine.bijard@kikomail.lol",
	"password":"d",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-08"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxe",
	"entityId":"auxe",
	"username":"e",
	"email":"julie.roustaud@kikomail.lol",
	"password":"e",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-10"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxf",
	"entityId":"auxf",
	"username":"f",
	"email":"mathilde.lepont@kikomail.lol",
	"password":"f",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-12"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxg",
	"entityId":"auxg",
	"username":"g",
	"email":"sabrina.ternic@kikomail.lol",
	"password":"g",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-14"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxh",
	"entityId":"auxh",
	"username":"h",
	"email":"herve.paoli@kikomail.lol",
	"password":"h",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-15"),
	"registered":true
})
db.apauth.insert({
	"id":"userauxi",
	"entityId":"auxi",
	"username":"i",
	"email":"kikolol@yopmail.com",
	"password":"i",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate": new Date("2016-05-15"),
	"registered":true
})
db.apauth.insert({
	"id":"usersadz",
	"entityId":"sadz",
	"username":"z",
	"email":"auxiliare.pro@kiko.mail",
	"password":"z",
	"roles":["service","apauth"],
	"type":"service",
	"active":true,
	"registrationDate": new Date("2016-05-18"),
	"registered":true
})
db.apauth.insert({
	"id":"usersady",
	"entityId":"sady",
	"username":"y",
	"email":"lessap@kiko.mail",
	"password":"z",
	"roles":["service","apauth"],
	"type":"service",
	"active":true,
	"registrationDate": new Date("2016-05-21"),
	"registered":true
})
db.apauth.insert({
	"id":"usersadx",
	"entityId":"sadx",
	"username":"x",
	"email":"kikotest@yopmail.com",
	"password":"x",
	"roles":["service","apauth"],
	"type":"service",
	"active":true,
	"registrationDate": new Date("2016-05-21"),
	"registered":true
})

db.apauth.insert({ 
	"id":"userauxantoine",
	"entityId":"auxantoine",
	"username":"maillard.antoine@gmail.com",
	"email":"maillard.antoine@gmail.com",
	"password":"a",
	"roles":["auxiliary","apauth"],
	"type":"auxiliary",
	"active":true,
	"registrationDate":new Date("2016-05-21"),
	"registered":true
})


db.apauth.insert({ 
	"id":"usersadantoine",
	"entityId":"sadantoine",
	"username":"angantyr_teardrop@hotmail.com",
	"email":"angantyr_teardrop@hotmail.com",
	"password":"a",
	"roles":["service","apauth"],
	"type":"service",
	"active":true,
	"registrationDate":new Date("2016-05-21"),
	"registered":true
})


/* ****************************************************************************************
 * DB-AUXILIARY
 */
db.auxiliary.insert({
	"id":"auxa",
	"authId":"userauxa",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":true,
	"notifyOffersSms":true,
	"avatar":"0000000000A",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Charpentier",
	"firstName":"Sylvie",
	"phone":"0101020301",
	"address":"35 rue d'Alsace",
	"postalCode":"92300",
	"city":"Levallois-Peret",
	"country":"France",
	"lattitude":48.892556,
	"longitude":2.297584,
	"description":"Je suis une super auxiliaire de vie !!!",
	"socialNumber":"2720192",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1972-01-03"),
	"nationality":"BE",
	"isEntrepreneur":"Auto",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(2), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(4),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(4),
	"skillShopping":NumberInt(1),
	"diploma":["diploma_advf"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxb",
	"authId":"userauxb",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":false,
	"notifyOffersSms":false,
	"avatar":"0000000000B",
	"isTutoSkipped":true,
	"civility":"Mr",
	"lastName":"De Lorme",
	"firstName":"Jean-Edouard",
	"phone":"0102030405",
	"address":"15B rue Victor Meric",
	"postalCode":"92110",
	"city":"Clichy",
	"country":"France",
	"lattitude":48.901569,
	"longitude":2.306130,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"1800192",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1980-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Salary",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(2),
	"skillChildhood":NumberInt(5),
	"skillCompagny":NumberInt(3),
	"skillDoityourself":NumberInt(4),
	"skillHousework":NumberInt(3),
	"skillNursing":NumberInt(2),
	"skillShopping":NumberInt(0),
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxc",
	"authId":"userauxc",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":true,
	"notifyOffersSms":false,
	"avatar":"0000000000C",
	"isTutoSkipped":false,
	"civility":"Mme",
	"lastName":"Caudran",
	"firstName":"Rachel",
	"phone":"0101010101",
	"address":"20 rue Mederic",
	"postalCode":"75017",
	"city":"Paris",
	"country":"France",
	"lattitude":48.880903,
	"longitude":2.304171,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"2840575",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1984-05-09"),
	"nationality":"FR",
	"isEntrepreneur":"Both",
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxd",
	"authId":"userauxd",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":false,
	"notifyOffersSms":true,
	"avatar":"0000000000D",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Bijard",
	"firstName":"Catherine",
	"phone":"0101010101",
	"address":"2 place Vendome",
	"postalCode":"75001",
	"city":"Paris",
	"country":"France",
	"lattitude":48.866601,
	"longitude":2.328614,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"2720185",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1972-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Auto",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(4),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(4),
	"skillShopping":NumberInt(1),
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxe",
	"authId":"userauxe",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":false,
	"notifyOffersSms":false,
	"avatar":"0000000000E",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Roustaud",
	"firstName":"Julie",
	"phone":"0101010101",
	"address":"47 boulevard de Clichy",
	"postalCode":"75014",
	"city":"Paris",
	"country":"France",
	"lattitude":48.883266,
	"longitude":2.334079,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"2800175",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1980-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Auto",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(4),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(4),
	"skillShopping":NumberInt(1),
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxf",
	"authId":"userauxf",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"notifyOffersMail":false,
	"notifyOffersSms":false,
	"avatar":"0000000000F",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Lepont",
	"firstName":"Mathilde",
	"phone":"0101010101",
	"address":"154 rue Ordener",
	"postalCode":"75018",
	"city":"Paris",
	"country":"France",
	"lattitude":48.893647,
	"longitude":2.336426,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"2800175",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1980-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Salary",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(4),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(4),
	"skillShopping":NumberInt(1),
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxg",
	"authId":"userauxg",
	"profilCompleted":true,
	"profilProgression":NumberInt(80),
	"notifyOffersMail":false,
	"notifyOffersSms":false,
	"avatar":"0000000000G",
	"isTutoSkipped":true,
	"civility":"Mme",
	"lastName":"Ternic",
	"firstName":"Sabrina",
	"phone":"0101010101",
	"address":"21 rue Pierre Curie",
	"postalCode":"92110",
	"city":"Clichy",
	"country":"France",
	"lattitude":48.902706,
	"longitude":2.315156,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"2800192",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1980-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Both",
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})
db.auxiliary.insert({
	"id":"auxh",
	"authId":"userauxh",
	"profilCompleted":false,
	"profilProgression":NumberInt(80),
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"notifyOffersMail":false,
	"notifyOffersSms":false,
	"avatar":"0000000000H",
	"isTutoSkipped":true,
	"civility":"Mr",
	"lastName":"Paoli",
	"firstName":"Hervé",
	"phone":"0101010101",
	"address":"9 rue Roquepine",
	"postalCode":"75008",
	"city":"Paris",
	"country":"France",
	"lattitude":48.873169,
	"longitude":2.319081,
	"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"socialNumber":"1800175",
	"birthCity":"Paris",
	"birthCountry":"France",
	"birthDate":new Date("1980-01-03"),
	"nationality":"FR",
	"isEntrepreneur":"Salary",
	"areSkillSet":true,
	"skillAnswers":[NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0), NumberInt(0)],
	"skillAdministrative":NumberInt(5),
	"skillChildhood":NumberInt(5),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(5),
	"skillHousework":NumberInt(5),
	"skillNursing":NumberInt(5),
	"skillShopping":NumberInt(5),
	"diploma":["diploma_1"],
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"idCardNumber":"123456789012"
})

db.auxiliary.insert({
	"id":"auxi",
	"authId":"userauxi",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"isTutoSkipped":true
})


/* ****************************************************************************************
 * DB-SERVICE
 */
db.service.insert({
	"id":"sadz",
	"authId":"usersadz",
	"profilCompleted":true,
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"avatar":"0000000000Z",
	"isTutoSkipped":true,
	"function":"Mand",
	"socialReason":"L'Escargot",
	"siret":"65657897896548",
	"phone":"0123456789",
	"address":"73 rue Legendre",
	"postalCode":"75017",
	"city":"Paris",
	"country":"France",
	"lattitude":48.887099,
	"longitude":2.319155,
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02")
})
db.service.insert({
	"id":"sady",
	"authId":"usersady",
	"profilCompleted":true,
	"accountType": "Premium",
	"accountExpiryDate":new Date("2018-12-31"),
	"avatar":"0000000000Y",
	"isTutoSkipped":true,
	"function":"Mand",
	"socialReason":"Les SAP",
	"siret":"65657897896548",
	"phone":"0123456789",
	"address":"127 rue du Faubourg Saint-Martin",
	"postalCode":"75017",
	"city":"Paris",
	"country":"France",
	"lattitude":48.87532864080316,
	"longitude":2.3589706420898438,
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02")
})


db.service.insert({
	"id":"sadx",
	"authId":"usersadx",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"isTutoSkipped":true
})

db.service.insert({
	"id":"sadantoine",
	"authId":"usersadantoine",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"isTutoSkipped":true
})



/* ****************************************************************************************
 * DB-CUSTOMER
 */
db.customer.insert({
	"id":"szc1",
	"serviceId":"sadz",
	"civility":"Mme",
	"firstName":"Monique",
	"lastName":"Martin",
	"birthDate":new Date("1957-04-25"),
	"nationality":"FR",
	"email":"monique.martin@outlook.fr",
	"phone":"0101010101",
	"address":"65 rue Guy Moquet",
	"postalCode":"75017",
	"city":"Paris",
	"country":"France",
	"lattitude":48.892779,
	"longitude":2.326340,
	"skillAdministrative":NumberInt(0),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(0),
	"skillHousework":NumberInt(1),
	"skillNursing":NumberInt(3),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(4)
})

db.customer.insert({
	"id":"szc2",
	"serviceId":"sadz",
	"civility":"Mr",
	"firstName":"André",
	"lastName":"Remy",
	"birthDate":new Date("1945-04-25"),
	"nationality":"BE",
	"email":"andre.remy@outlook.fr",
	"phone":"0101010101",
	"address":"7 rue des Dames",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.885367,
	"longitude":2.325658,
	"skillAdministrative":NumberInt(1),
	"skillChildhood":NumberInt(0),
	"skillCompagny":NumberInt(3),
	"skillDoityourself":NumberInt(4),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(5),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(1)
})

db.customer.insert({
	"id":"szc3",
	"serviceId":"sadz",
	"civility":"Mr",
	"firstName":"Maurice",
	"lastName":"Durant",
	"birthDate":new Date("1962-11-03"),
	"nationality":"DE",
	"email":"maurice.durant@outlook.fr",
	"phone":"0101010101",
	"address":"5 rue de Logelbach",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.881188,
	"longitude":2.307961,
	"skillAdministrative":NumberInt(0),
	"skillChildhood":NumberInt(0),
	"skillCompagny":NumberInt(5),
	"skillDoityourself":NumberInt(0),
	"skillHousework":NumberInt(0),
	"skillNursing":NumberInt(0),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(2)
})


db.customer.insert({
	"id":"szc4",
	"serviceId":"sadz",
	"civility":"Mme",
	"firstName":"Georgette",
	"lastName":"Boulard",
	"birthDate":new Date("1922-12-28"),
	"nationality":"FR",
	"email":"georgette.boulard@outlook.fr",
	"phone":"0101010101",
	"address":"67 rue Ampere",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.885310,
	"longitude":2.300468,
	"skillAdministrative":NumberInt(3),
	"skillChildhood":NumberInt(0),
	"skillCompagny":NumberInt(2),
	"skillDoityourself":NumberInt(2),
	"skillHousework":NumberInt(4),
	"skillNursing":NumberInt(5),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(4)
})

db.customer.insert({
	"id":"szc5",
	"serviceId":"sadz",
	"civility":"Mme",
	"firstName":"Simone",
	"lastName":"Carfe",
	"birthDate":new Date("1933-01-07"),
	"nationality":"FR",
	"email":"simone.carfe@outlook.fr",
	"phone":"0101010101",
	"address":"21 rue des Tapisseries",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.888980,
	"longitude":2.307791,
	"skillAdministrative":NumberInt(5),
	"skillChildhood":NumberInt(0),
	"skillCompagny":NumberInt(3),
	"skillDoityourself":NumberInt(1),
	"skillHousework":NumberInt(0),
	"skillNursing":NumberInt(3),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(2)
})

db.customer.insert({
	"id":"szc6",
	"serviceId":"sadz",
	"civility":"Mme",
	"firstName":"Ginette",
	"lastName":"De Trimes",
	"birthDate":new Date("1941-06-14"),
	"nationality":"FR",
	"email":"ginette.carfe@outlook.fr",
	"phone":"0101010101",
	"address":"87 rue de Levis",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.884824,
	"longitude":2.311516,
	"skillAdministrative":NumberInt(0),
	"skillChildhood":NumberInt(5),
	"skillCompagny":NumberInt(1),
	"skillDoityourself":NumberInt(2),
	"skillHousework":NumberInt(4),
	"skillNursing":NumberInt(0),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(1)
})

db.customer.insert({
	"id":"szc7",
	"serviceId":"sadz",
	"civility":"Mr",
	"firstName":"Alfred",
	"lastName":"Rambert",
	"birthDate":new Date("1941-01-01"),
	"nationality":"FR",
	"email":"alfred.rambert@outlook.fr",
	"phone":"0101010101",
	"address":"18 rue de Saint-Senoch",
	"postalCode":"75017",
	"city": "Paris",
	"country": "France",
	"lattitude":48.882348,
	"longitude":2.294248,
	"skillAdministrative":NumberInt(2),
	"skillChildhood":NumberInt(2),
	"skillCompagny":NumberInt(3),
	"skillDoityourself":NumberInt(2),
	"skillHousework":NumberInt(2),
	"skillNursing":NumberInt(3),
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"skillShopping":NumberInt(2)
})



/* ****************************************************************************************
 * DB-INTERVENTION
 */
db.intervention.insert({
	"id":"szc11",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"sadStatus":"Matching",
	"period":"Hours",
	"startDate":new Date("2018-04-28"),
	"startTime":[NumberInt(14),NumberInt(0)],
	"endTime":[NumberInt(16),NumberInt(0)]
})

db.intervention.insert({
	"id":"szc12",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"period":"Week1",
	"sadStatus":"Pending",
	"startDate":new Date("2018-04-29"),
	"endDate":new Date("2018-12-29"),
	"startTime":[NumberInt(8),NumberInt(30)],
	"endTime":[NumberInt(12),NumberInt(0)],
	"days":["MONDAY","FRIDAY"]
})

db.intervention.insert({
	"id":"szc1aa1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"period":"Hours",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-12-16"),
	"startTime":[NumberInt(14),NumberInt(0)],
	"endTime":[NumberInt(16),NumberInt(0)]
})

db.intervention.insert({
	"id":"szc1aa2",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"period":"Week1",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-14"),
	"endDate":new Date("2018-04-30"),
	"startTime":[NumberInt(14),NumberInt(15)],
	"endTime":[NumberInt(18),NumberInt(45)],
	"days":["SATURDAY"]
})

db.intervention.insert({
	"id":"szc4aa3",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc4",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"period":"Hours",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-01"),
	"startTime":[NumberInt(11),NumberInt(15)],
	"endTime":[NumberInt(14),NumberInt(15)]
})

db.intervention.insert({
	"id":"szc5aa4",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc5",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"period":"Week2",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-02"),
	"endDate":new Date("2018-06-02"),
	"startTime":[NumberInt(8),NumberInt(0)],
	"endTime":[NumberInt(12),NumberInt(0)],
	"days":["WEDNESDAY"]
})

db.intervention.insert({
	"id":"szc3aa5",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc3",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"period":"Week2",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-15"),
	"endDate":new Date("2018-06-15"),
	"startTime":[NumberInt(10),NumberInt(0)],
	"endTime":[NumberInt(16),NumberInt(0)],
	"days":["THURSDAY","TUESDAY"]
})

db.intervention.insert({
	"id":"szc6ah1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc6",
	"serviceId":"sadz",
	"auxiliaryId": "auxh",
	"period":"Hours",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-01"),
	"startTime":[NumberInt(11),NumberInt(15)],
	"endTime":[NumberInt(14),NumberInt(15)]
})

db.intervention.insert({
	"id":"szc2ah2",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc2",
	"serviceId":"sadz",
	"auxiliaryId": "auxh",
	"period":"Week4",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-02"),
	"endDate":new Date("2018-06-02"),
	"startTime":[NumberInt(8),NumberInt(0)],
	"endTime":[NumberInt(12),NumberInt(0)],
	"days":["WEDNESDAY"]
})

db.intervention.insert({
	"id":"szc7ah3",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc7",
	"serviceId":"sadz",
	"auxiliaryId": "auxh",
	"period":"Week4",
	"sadStatus":"OnGoing",
	"startDate":new Date("2018-04-15"),
	"endDate":new Date("2018-06-15"),
	"startTime":[NumberInt(10),NumberInt(0)],
	"endTime":[NumberInt(16),NumberInt(0)],
	"days":["THURSDAY"]
})

db.intervention.insert({
	"id":"szc41",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc4",
	"serviceId":"sadz",
	"period":"Hours",
	"sadStatus":"Matching",
	"startDate":new Date("2018-05-01"),
	"startTime":[NumberInt(11),NumberInt(15)],
	"endTime":[NumberInt(14),NumberInt(15)]
})



/* ****************************************************************************************
 * DB-OFFERS
 */
db.offer.insert({
	"id":"szc41aa",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxa",
	"serviceId":"sadz",
	"customerId":"szc4",
	"interventionId":"szc41",
	"sadStatus":"PENDING",
	"sadStatusChanged":new Date("2018-03-19"),
	"auxStatus":"ACCEPTED",
	"auxStatusChanged":new Date("2018-03-25"),
	"hideToAux":false,
	"hideToSad":false
})
db.offer.insert({
	"id":"szc41ah",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxh",
	"serviceId":"sadz",
	"customerId":"szc4",
	"interventionId":"szc41",
	"sadStatus":"PENDING",
	"sadStatusChanged":new Date("2018-03-19"),
	"auxStatus":"DECLINED",
	"auxStatusChanged":new Date("2018-03-25"),
	"hideToAux":false,
	"hideToSad":false
})
db.offer.insert({
	"id":"szc11aa",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxa",
	"serviceId":"sadz",
	"customerId":"szc1",
	"interventionId":"szc11",
	"sadStatus":"PENDING",
	"sadStatusChanged":new Date("2018-01-19"),
	"auxStatus":"PENDING",
	"hideToAux":false,
	"hideToSad":false
})
db.offer.insert({
	"id":"szc11ab",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxb",
	"serviceId":"sadz",
	"customerId":"szc1",
	"interventionId":"szc11",
	"sadStatus":"PENDING",
	"sadStatusChanged":new Date("2018-01-20"),
	"auxStatus":"PENDING",
	"hideToAux":false,
	"hideToSad":false
})

/* ****************************************************************************************
 * DB-HELPTOPIC
 */


db.geozone.insert({
	"id":"auxa-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"Area",
	"auxiliaryId":"auxa",
	"lattitude":48.903151,
	"longitude":2.312931,
	"address":"Place de la république",
	"postalCode":"92110",
	"city":"Clichy",
	"radius":NumberInt(800)
})

db.geozone.insert({
	"id":"auxa-2",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxa",
	"lattitude":48.8945948,
	"longitude":2.2786922,
	"address":"",
	"postalCode":"92100",
	"city":"Levallois-Peret"
})

db.geozone.insert({
	"id":"auxb-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"Area",
	"auxiliaryId":"auxb",
	"lattitude":48.8929028,
	"longitude":2.3248703,
	"address":"7 rue Lacaille",
	"postalCode":"75017",
	"city":"Paris 17eme",
	"radius":NumberInt(800)
})

db.geozone.insert({
	"id":"auxc-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxc",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})

db.geozone.insert({
	"id":"auxd-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxd",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})

db.geozone.insert({
	"id":"auxe-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxe",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})

db.geozone.insert({
	"id":"auxf-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxf",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})

db.geozone.insert({
	"id":"auxg-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxg",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})

db.geozone.insert({
	"id":"auxh-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"type":"City",
	"auxiliaryId":"auxh",
	"lattitude":48.887540,
	"longitude":2.306440,
	"address":"",
	"postalCode":"75017",
	"city":"Paris 17eme"
})



/* ****************************************************************************************
 * DB-MISSION
 */
db.mission.insert({
	"id":"szc1aa1-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"interventionId":"szc1aa1",
	"sadStatus":"PENDING",
	"date":new Date("2018-03-16")
})

db.mission.insert({
	"id":"szc1aa2-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"interventionId":"szc1aa2",
	"sadStatus":"PENDING",
	"date":new Date("2018-04-15")
})

db.mission.insert({
	"id":"szc1aa2-2",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"customerId":"szc1",
	"serviceId":"sadz",
	"auxiliaryId":"auxa",
	"interventionId":"szc1aa2",
	"sadStatus":"PENDING",
	"date":new Date("2018-04-22")
})

db.mission.insert({
    "date": new Date("2018-04-01"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc4",
    "id": "9b8f1105-9df6-45a5-958b-c15a87e64382",
    "serviceId": "sadz",
    "interventionId": "szc4aa3",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-05"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "13a28f87-ac93-48e5-9fb9-cf2f6894ce4b",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-12"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "1175e66f-6f91-47cf-adc2-cc5a23ba33e5",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-19"),
    "auxiliaryId": "auxa",
   "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "6bfbe348-9482-4425-8cab-3376f7f7ddf5",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-26"),
    "auxiliaryId": "auxa",
   	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "b344cc21-8324-4a5f-878c-3b35debcdd3e",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-03"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "1248a7bb-b18a-4392-a1cd-2890cb00c558",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-10"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "4a9363eb-e165-4d4f-bb1c-5c83da6a220b",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-17"),
    "auxiliaryId": "auxa",
   	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "a3dfa339-a617-490d-b069-c7c8e6c32786",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-24"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "99c011a3-ae90-45f3-9b97-1026f263c9e4",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-31"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc5",
    "id": "aebf364d-60ee-48ec-8ba2-508c8eded6ff",
    "serviceId": "sadz",
    "interventionId": "szc5aa4",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-18"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "907cdcda-bd83-4eb8-a419-824ae1112585",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-20"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "1769ed17-494e-4231-a694-539b27c8daee",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-25"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "310553e9-1e20-4115-9df9-e25fcd5a530e",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-04-27"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "47b5cb38-a314-4572-8410-ff3e355b5722",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-02"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "47ff03a9-9a96-40d3-bdf6-a9b91c3f1d20",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-04"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "7e8f39b1-098e-48b1-abce-5f3610b0088b",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-09"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "d3563e7d-61fa-42cf-a554-44193f8a0ae6",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-11"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "e955e0ab-98ac-4438-8d81-dd2d0c25bf7a",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-16"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "a49d07b9-8ad1-4def-a939-9e05cd991000",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-18"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "124f2c96-854b-43ad-9ce9-c8117367f995",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-23"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "d9202143-2530-43ad-80d7-54d69fb3d8e5",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-25"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "94d378cd-6c00-4fcb-be78-ff98b96d548a",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-05-30"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "9646d057-f64d-457e-b7fa-dd40b56c54a9",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-06-01"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "1fcfd7d2-172d-41e5-a2a9-c17e3574c466",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-06-06"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "c59b7ec0-f7b6-4fa1-9bea-b49cb0da1009",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-06-08"),
    "auxiliaryId": "auxa",
   	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "045849ec-09eb-41ee-b68a-28b91a83e838",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-06-13"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "bdcb62e3-3a16-4da6-b798-d6e50354854c",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})
 
db.mission.insert({
    "date": new Date("2018-06-15"),
    "auxiliaryId": "auxa",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc3",
    "id": "c9eb95a6-181c-4275-81b5-293e53045065",
    "serviceId": "sadz",
    "interventionId": "szc3aa5",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-01"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc6",
    "id": "606b5a54-7786-4f3c-980b-eeb918ebd4f8",
    "serviceId": "sadz",
    "interventionId": "szc6ah1",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-05"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "e577fa40-73f2-490b-a403-ece1ac2806f5",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-12"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "de52b2dc-eca6-4b5d-8ca0-66f4df2816aa",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-19"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "faf5cb8b-6d19-4361-8ad8-0049a61ffd4c",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-26"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "a2086806-9603-4888-93d9-98cacd4a1b38",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-03"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "b8461993-a70b-4ade-a267-457cf377c0f1",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-10"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "d86ec1a7-c8e9-494e-b205-3c7b296451e4",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-17"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "8c810267-1631-449f-8cff-5311c09f3d38",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-24"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "aaed58f5-197d-46da-9b61-36bc2dfb7b36",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-31"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc2",
    "id": "26866f2e-4642-4b8c-a14d-6c9e6f43862c",
    "serviceId": "sadz",
    "interventionId": "szc2ah2",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-20"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "83c2641e-4dbb-43c6-b058-c80a114662c8",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-04-27"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "4d478b8d-00d3-487c-bba2-876b15539891",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-04"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "c55707df-ebf9-49a9-9524-2f933aad2c3f",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-11"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "1eb6804d-383d-470f-a867-9a0651e450e3",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-18"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "d0f91e95-cd88-41c4-b54d-32f0131cd215",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-05-25"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "80622a92-eec5-4d25-bc94-f46a6ba48c4f",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-06-01"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "b16dfe9a-3b74-40e0-ab3a-c456ffb2d529",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-06-08"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "f5858db3-137b-4267-acf5-e85b130ad44a",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})

db.mission.insert({
    "date": new Date("2018-06-15"),
    "auxiliaryId": "auxh",
    "creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
    "customerId": "szc7",
    "id": "57591ee5-bbe2-47ef-8564-5af089c49082",
    "serviceId": "sadz",
    "interventionId": "szc7ah3",
    "sadStatus": "PENDING"
})



/* ****************************************************************************************
 * DB-INDISPONIBILITY
 */
db.indisponibility.insert({
	"id":"auxa-1",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxa",
	"period":"Hours",
	"startDate":new Date("2018-10-29"),
	"startTime":[NumberInt(14),NumberInt(0)],
	"endTime":[NumberInt(19),NumberInt(30)]
})
db.indisponibility.insert({
	"id":"auxa-2",
	"creationDate":new Date("2018-02-02"),
	"lastUpdateDate":new Date("2018-02-02"),
	"auxiliaryId":"auxa",
	"period":"Week2",
	"startDate":new Date("2018-10-15"),
	"endDate":new Date("2018-05-15"),
	"startTime":[NumberInt(12),NumberInt(0)],
	"endTime":[NumberInt(14),NumberInt(00)],
	"days":["TUESDAY","FRIDAY"]
})
