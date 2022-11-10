import utilService from "../../../services/util-service.js";
import storageService from "../../../services/async-storage.service.js";

const loggedinUser = {
    email: "OG@appsus.com",
    fullname: "Mahatma Appsus",
};

const EMAILS_KEY = "emails";
_createEmails();

export default {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
};

function query(criteria = null) {
    if (!criteria) return storageService.query(EMAILS_KEY);
    const { email: logEmail } = loggedinUser;
    return storageService.query(EMAILS_KEY).then((emails) => {
        emails = emails.filter(
            (email) =>
                email.subject.includes(criteria.txt) ||
                email.body.includes(criteria.txt)
        );
        switch (criteria.status) {
            case "inbox":
                emails = emails.filter(
                    (email) => email.to === logEmail && !email.isTrash
                );
                break;
            case "sent":
                emails = emails.filter(
                    (email) => email.from === logEmail && !email.isTrash
                );
                break;
            case "trash":
                emails = emails.filter((email) => email.isTrash);
                break;
            case "draft":
                emails = emails.filter((email) => email.isDraft);
                break;
        }

        return criteria.isRead
            ? emails.filter((email) => email.isRead)
            : emails;
    });
}

function get(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    return email.id
        ? storageService.put(EMAILS_KEY, email)
        : storageService.post(EMAILS_KEY, email);
}

function getEmptyEmail() {
    return {
        id: "",
        subject: "",
        body: "",
        isRead: false,
        sentAt: 0,
        from: loggedinUser.email,
        to: "",
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                subject: "Miss you!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551142930594,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "Hello Guy!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133920594,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "Hello Omer!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1531133930594,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "Yossi Have a birthday!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1555133930594,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "You have an amazing project",
                body: "so cool project. would love to see it more",
                isRead: false,
                sentAt: 1551133930574,
                from: "OG@appsus.com",
                to: "momo@momo.com",
                isDraft: true,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "ACV is now on sale!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133960594,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
            {
                id: utilService.makeId(),
                subject: "Miss you!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133930598,
                from: "momo@momo.com",
                to: "OG@appsus.com",
                isDraft: false,
                isTrash: false,
            },
        ];
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}
