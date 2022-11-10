
import utilService from "../../../services/util-service.js"
import storageService from "../../../services/async-storage.service.js"


const KEEP_KEY = 'keepDB'
_createNotes()

export default {
    query,
    get,
    remove,
    save,
}

function _createNotes() {
    let notes = utilService.loadFromStorage(KEEP_KEY)
    // let notes
    if (!notes || !notes.length) {
        notes = [

            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://some-img/me",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#6c5ce7"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fab1a0"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'yeah!',
                    txt: "Just a text..."
                },
                style: {
                    backgroundColor: "#636e72"
                }
            },

            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'Pulk/Pull Revolving Doors',
                    txt: `There are barn doors.\n
                            And there are revolving doors.\n
                            Doors on the rudders of big ships.\n
                            We are revolving doors.\n
                            There are doors that open by themselves.\n
                            There are sliding doors.\n
                            And there are secret doors.\n
                            There are doors that lock
                            And doors that don't.\n
                            There are doors that let you in
                            And out
                            But never open.\n
                            But there are trapdoors.\n
                            That you can't come back from.`
                },
                style: {
                    backgroundColor: "#dfe6e9"
                }
            },

            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Milk list!",
                    todos: [
                        { txt: "Milk", doneAt: null },
                        { txt: "More milk", doneAt: 187111111 },
                        { txt: "Enough milk", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fdcb6e"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://some-img/me",
                    title: "Kuki and Me"
                },
                style: {
                    backgroundColor: "#d63031"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Understand VUE!",
                    todos: [
                        { txt: "Emit", doneAt: null },
                        { txt: "Inbar", doneAt: null },
                        { txt: "Work hard!", doneAt: null },
                        { txt: "Emit again", doneAt: null },
                        { txt: "Loops", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#00b894"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'yeah!',
                    txt: "Just a text..."
                },
                style: {
                    backgroundColor: "#00cec9"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Set my stuff now!",
                    todos: [
                        { txt: "Shiping liscence", doneAt: null },
                        { txt: "Naming power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fd79a8"
                }
            },
        ]


        utilService.saveToStorage(KEEP_KEY, notes)
    }

    return notes
}

function query() {
    return storageService.query(KEEP_KEY)
}

function get(noteId) {
    return storageService.get(KEEP_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(KEEP_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(KEEP_KEY, note)
    } else {
        return storageService.post(KEEP_KEY, note)
    }
}

