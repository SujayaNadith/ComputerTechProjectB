const router = require('express').Router();

const { submitContact, getAllContacts, deleteContact, updateContactMeta } = require("../controllers/contactController");

router.post("/", submitContact);

router.get("/", getAllContacts);

router.delete("/:id", deleteContact);

router.patch("/:id", updateContactMeta);

module.exports = router;
