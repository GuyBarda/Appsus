
import utilService from "../../../services/util-service.js"
import storageService from "../../../services/async-storage.service.js"


const KEEP_KEY = 'keepDB'
_createNotes()

export default {
    query,
    get,
    remove,
    save,
    getEmptyTxtNote,
}

function getEmptyTxtNote(title = '', txt = '', isPinned = false, backgroundColor = 'white') {
    return {
        id: null,
        type: "note-txt",
        isPinned,
        info: {
            title,
            txt,
        },
        style: {
            backgroundColor,
        }
    }
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
                    url: "http://coding-academy.org/books-photos/14.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#6c5ce7"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Get my knifes together",
                    todos: [
                        { id: utilService.makeId(), txt: "kill everyone", doneAt: null },
                        { id: utilService.makeId(), txt: "dont kill cats", doneAt: 187111111 }
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
                    title: 'ok!',
                    txt: "ok a ok..."
                },
                style: {
                    backgroundColor: "#fdcb6e"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { id: utilService.makeId(), txt: "Driving liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fab1a0"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Set my stuff on fire!",
                    todos: [
                        { id: utilService.makeId(), txt: "only liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "just power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fd79a8"
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
                    backgroundColor: "#fdcb6e"
                }
            },

            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'Pulk/Pull Revolving Doors, Radiohead',
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
                        { id: utilService.makeId(), txt: "Milk", doneAt: null },
                        { id: utilService.makeId(), txt: "More milk", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Enough milk", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Add the function addMilk(cowId), it return milk from the local ranch", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: "#fdcb6e"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'no!',
                    txt: "Just a text..??."
                },
                style: {
                    backgroundColor: "#fd79a8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://coding-academy.org/books-photos/2.jpg",
                    title: "Kuki and Me"
                },
                style: {
                    backgroundColor: "#d63031"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: 'Ful Stop, Radiohead',
                    txt: `You really messed up everything
                            You really messed up everything
                            If you could take it all back again
                            Strike up the tinderbox
                            Why should I be good if you're not?
                            This is a foul tasting medicine
                            A foul tasting medicine
                            To be trapped in your full stop
                            Truth will mess you up, truth will mess you up
                            Truth will mess you up, truth will mess you up
                            Truth will mess you up, truth will mess you up
                            Truth will mess you up, truth will mess you up
                            When you take me back
                            Take me back again
                            Will you take me back
                            Take me back again
.`
                },
                style: {
                    backgroundColor: "#ff7675"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Understand VUE!",
                    todos: [
                        { id: utilService.makeId(), txt: "Emit", doneAt: null },
                        { id: utilService.makeId(), txt: "Inbar", doneAt: null },
                        { id: utilService.makeId(), txt: "Work hard!", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Emit again", doneAt: null },
                        { id: utilService.makeId(), txt: "Loops", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#00b894"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    title: 'Pyramid Song, Radiohead',
                    txt: `I jumped in the river and what did I see?
                            Black-eyed angels swam with me
                            A moon full of stars and astral cars
                            All the things I used to see
                            All my lovers were there with me
                            All my past and futures
                            And we all went to heaven in a little row boat
                            There was nothing to fear and nothing to doubt
                            I jumped into the river
                            Black-eyed angels swam with me
                            A moon full of stars and astral cars
                            And all the things I used to see
                            All my lovers were there with me
                            All my past and futures
                            And we all went to heaven in a little row boat
                            There was nothing to fear and nothing to doubt
                            There was nothing to fear and nothing to doubt
                            There was nothing to fear and nothing to doubt
                            `
                },
                style: {
                    backgroundColor: "#81ecec"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
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
                        { id: utilService.makeId(), txt: "Shiping liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "Naming power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fd79a8"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    label: "Set my stuff on water!",
                    todos: [
                        { id: utilService.makeId(), txt: "only liscence", doneAt: null },
                        { id: utilService.makeId(), txt: "water power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#6c5ce7"
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


