db.dropDatabase()

db.apmail.drop()
db.apmail.createIndex({"id": 1}, {"unique": true})

db.apauth.drop()
db.apauth.createIndex({"entityId": 1}, {"unique": true, "partialFilterExpression": { "entityId": { $exists: true } }})
db.apauth.createIndex({"id": 1}, {"unique": true})
db.apauth.createIndex({"email": 1}, {"unique": true})
db.apauth.createIndex({"username": 1}, {"unique": true})

db.auxiliary.drop()
db.auxiliary.createIndex({"id": 1}, {"unique": true})

db.customer.drop()
db.customer.createIndex({"id": 1}, {"unique": true})

db.geozone.drop()
db.geozone.createIndex({"id": 1}, {"unique": true})

db.helptopic.drop()
db.helptopic.createIndex({"id": 1}, {"unique": true})

db.helpfaq.drop()
db.helpfaq.createIndex({"id": 1}, {"unique": true})

db.indisponibility.drop()
db.indisponibility.createIndex({"id": 1}, {"unique": true})

db.intervention.drop()
db.intervention.createIndex({"id": 1}, {"unique": true})

db.mission.drop()
db.mission.createIndex({"id": 1}, {"unique": true})

db.offer.drop()
db.offer.createIndex({"id": 1}, {"unique": true})

db.promotioncode.drop()
db.promotioncode.createIndex({"name": 1}, {"unique": true})
db.promotioncode.createIndex({"id": 1}, {"unique": true})

db.service.drop()
db.service.createIndex({"id": 1}, {"unique": true})

db.apauth.insert({
	"id":"useradmin",
	"username":"admin",
	"email":"admin",
	"password":"admin",
	"roles":["admin"],
	"type":"admin",
	"active":true,
	"registrationDate":new Date("2016-01-01"),
	"registered":true
})

db.apmail.insert({
	"id":"mail_auth_register",
	"subject":"{type} account registration",
	"content":"Hello {user},\n\nTo complete your registration enter the following code when prompted:\n\n {code} \n\n{url}"
})

db.apmail.insert({
	"id":"mail_auth_changemail",
	"subject":"{type} email modification",
	"content":"Hello {user},\n\nTo confirm your email change enter the following code when prompted:\n\n {code} \n\n{url}"
})

db.apmail.insert({
	"id":"mail_auth_confirmmail",
	"subject":"{type} email confirmation",
	"content":"Hello {user},\n\nTo confirm your email change enter the following code when prompted:\n\n {code} \n\n{url}"
})

db.apmail.insert({
	"id":"mail_auth_recover",
	"subject":"{type} recover password",
	"content":"Hello {user},\n\nTo recover your password enter the following code when prompted:\n\n {code} \n\n{url}"
})

