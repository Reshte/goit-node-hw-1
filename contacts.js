import { promises as fs } from "fs";
import { normalize } from "path";

const contactsPath = normalize("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      return contacts.map((contact) => {
        return {
          Id: contact.id,
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone,
        };
      });
    })
    .then((result) => console.table(result))
    .catch((err) => {
      console.log(err);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = contacts.find((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = contacts.find((contact) => contact.id === contactId);
      contacts.splice(contacts.indexOf(contact), 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      console.log(`Contact removed`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const contact = {
        id: contacts.length + 1,
        name,
        email,
        phone,
      };
      contacts.push(contact);
      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      console.log(`Contact added`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
