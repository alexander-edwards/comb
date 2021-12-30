
const meditationsNotes = {
    "metadata": {
        "name": "meditations",
        "id": "meditations"
    },
    "content": {
        "hash-1": {
            "content": "Spend [[Money]]",
            "metadata": {
                "indent": 1,
                "parent": "hash-1",
                "id": "meditations",
                "noteId": "meditations",
                "referencedNotes": [
                    "money"
                ]
            }
        },
        "hash-2": {
            "content": "Especially for [[Education]]",
            "metadata": {
                "indent": 2,
                "parent": "hash-1",
                "note-id": "meditations",
                "referencedNotes": [
                    "education"
                ]
            }
        }
    }
}

export function getNotes(noteName) {
    let rawNotes = getRawNotes(noteName);
    return parseRawNotes(rawNotes);
}

function parseRawNotes(rawNotes) {
    return rawNotes;
}

function getRawNotes(noteName) {
    if (noteName === 'meditations') {
        return meditationsNotes;
    }
    return {}
}

