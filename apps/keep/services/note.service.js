
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
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n102",
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://some-img/me",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
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
                    backgroundColor: "#00d"
                }
            }
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

