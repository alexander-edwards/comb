
const meditationsNotes = {
    "metadata": {
        "name": "meditations",
        "id": "meditations"
    },
    "content": {
        "hash-1": {
            "text": "Spend [[Money]]",
            "metadata": {
                "depth": 0,
                "parent": "hash-1",
                "id": "meditations",
                "noteId": "meditations",
                "referencedNotes": [
                    "money"
                ]
            }
        },
        "hash-2": {
            "text": "Especially for [[Education]]",
            "metadata": {
                "depth": 1,
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
    let parsedNotes = parseRawNotes(rawNotes);
    return getNotesBlocks(parsedNotes)
}

function parseRawNotes(rawNotes) {
    return rawNotes;
}

function getRawNotes(noteName) {
    if (noteName === 'meditations') { return meditationsNotes }
    return {}
}

function getNotesBlocks(notes) {
    return notes;
}

export function saveNotes(notes) {

    console.log(notes);
    let timestamp = Date.now().toLocaleString();
    let fileName = notes.metadata.id + timestamp;

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(JSON.stringify(notes), fileName + ".txt", 'text/plain');

}