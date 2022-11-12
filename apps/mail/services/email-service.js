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
                body: "wanted: fullstack developer for yadayada on betlehem",
                isRead: true,
                sentAt: 1551133920594,
                from: "Sigal@Drushim.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: true,
            },
            {
                id: utilService.makeId(),
                subject: "Hello Omer!",
                body: "Your keep app is amazing, great job!",
                isRead: false,
                sentAt: 1531133930594,
                from: "Guy@barda.com",
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
                isStarred: true,
            },
            {
                id: utilService.makeId(),
                subject: "Amazing!!",
                body: "You have an amazing project, so cool project. would love to see it more",
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
                body: "Now includes all three premium DLC packs (Unto the Evil, Hell Followed, and Bloodfall), maps, modes, and weapons, as well as all feature updates including Arcade Mode, Photo Mode, and the latest Update 6.66, which brings further multiplayer improvements as well as revamps multiplayer progression",
                isRead: false,
                sentAt: 1551133960594,
                from: "steam@steam.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "SQUARE ENIX",
                body: " VALKYRIE ELYSIUM is an action RPG with an epic story, beautiful environments, and new, fast-paced combat that incorporates the VALKYRIE series' classic special attack and combo system",
                isRead: false,
                sentAt: 1551133930598,
                from: "noreply@xmail.square-enix.com",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "Finance ninja",
                body: "Hi ninjas",
                isRead: false,
                sentAt: 1553123930598,
                from: "financeninja123@ninja.com",
                to: loggedinUser.email,
                isDraft: false,
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
            {
                id: utilService.makeId(),
                subject: "Today's home pick:",
                body: "Baseus Magnetic Kitchen Timer Digital Timer Manual Popular categories",
                isRead: true,
                sentAt: 1553123950598,
                from: "AliExpress ",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: false,
                isStarred: true,
            },
            {
                id: utilService.makeId(),
                subject: "Complete your board game",
                body: "collection with these 7 essentials,Small World, Ticket to Ride, A Game of Thrones, Carcassonne, more! Complete your digital board game collection with thes ,ssentials from Twin Sails, plus a shelf full of expansi",
                isRead: true,
                sentAt: 1553123950558,
                from: "AliExpress",
                to: loggedinUser.email,
                isDraft: false,
                isTrash: true,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "jxcd",
                body: "dpw",
                isRead: false,
                sentAt: 1521142930594,
                from: loggedinUser.email,
                to: "",
                isDraft: true,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "",
                body: "uywmiosd",
                isRead: false,
                sentAt: 1551166930594,
                from: loggedinUser.email,
                to: "",
                isDraft: true,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "welcome",
                body: "we sent you some files to work with, please see them below",
                isRead: false,
                sentAt: 1551143930594,
                from: loggedinUser.email,
                to: "CodingAcademy@ca.com",
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
            {
                id: utilService.makeId(),
                subject: "please print",
                body: "i sent you something to print please print please please",
                isRead: false,
                sentAt: 1551142980594,
                from: loggedinUser.email,
                to: "mom@momanddad.com",
                isDraft: false,
                isTrash: false,
                isStarred: false,
            },
        ];
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}
