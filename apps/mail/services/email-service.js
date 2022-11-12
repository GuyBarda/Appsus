import utilService from "../../../services/util-service.js";
import storageService from "../../../services/async-storage.service.js";

const loggedinUser = {
    email: "OG@appsus.com",
    fullname: "Mahatma Appsus",
};

const EMAILS_KEY = "emailsDB";
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
        //filter by text
        emails = emails.filter(
            (email) =>
                email.subject.includes(criteria.txt) ||
                email.body.includes(criteria.txt)
        );

        //by trash
        if (criteria.isTrash) return emails.filter((email) => email.isTrash);

        //by star
        if (criteria.isStarred)
            return emails.filter((email) => email.isStarred);

        //by read
        emails = criteria.isRead
            ? emails.filter((email) => email.isRead)
            : emails;

        //by draft
        emails = criteria.isDraft
            ? emails.filter((email) => email.isDraft)
            : emails;

        //by status
        switch (criteria.status) {
            case "inbox":
                emails = emails.filter(
                    (email) => email.to === logEmail && !email.isTrash
                );
                break;
            case "sent":
                emails = emails.filter(
                    (email) =>
                        email.from === logEmail &&
                        !email.isTrash &&
                        !email.isDraft
                );
                break;
            case "trash":
                emails = emails.filter((email) => email.isTrash);
                break;
            case "draft":
                emails = emails.filter((email) => email.isDraft);
                break;
        }
        return emails;
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
        isDraft: null,
        isStarred: null,
        isTrash: null,
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
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Hello Guy!",
                body: "wanted: frontend developer for yadayada on betlehem",
                isRead: true,
                sentAt: 1551133920594,
                from: "momo@momo.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Hello Omer!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1531133930594,
                from: "momo@momo.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Yossi Have a birthday!",
                body: "Wish him happy birthday here! ",
                isRead: true,
                sentAt: 1555133930594,
                from: "yossifacebook@facebook.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "You have an amazing project",
                body: "so cool project. would love to see it more",
                isRead: false,
                sentAt: 1551133930574,
                from: loggedinUser.email,
                to: "momo@momo.com",
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "ACV is now on sale!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133960594,
                from: "momo@momo.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Miss you!",
                body: "Would love to catch up sometimes",
                isRead: false,
                sentAt: 1551133930598,
                from: "momo@momo.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Miss you!",
                body: "bla bla",
                isRead: false,
                sentAt: 1553123930598,
                from: loggedinUser.email,
                to: "",
                isDraft: true,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "oops",
                body: "bsfkjqwhov",
                isRead: false,
                sentAt: 1553123930598,
                from: loggedinUser.email,
                to: "",
                isDraft: true,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Lots of money for you",
                body: "I have alot of money I am dont want this anymore and want to send to you please sent email and password ",
                isRead: true,
                sentAt: 1553123950598,
                from: "nigeriaprince@nigeria.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Gabe sent you a gift",
                body: "gabe has sent you a gift. Open it in the 48 hours or it'll be gone forever",
                isRead: true,
                sentAt: 1553123950598,
                from: "nigeriaprince@nigeria.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: true,
            },
        ];
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}
