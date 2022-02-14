
export function blockMapToNotes(editorState) {
    let notes = {
        "metadata": getMetadata(),
        "content": {}
    }
    let blockMap = editorState.getCurrentContent().blockMap;
    for (const [blockKey, block] of blockMap.entries()) {
        notes.content[blockKey] = {
            "text": block.text,
            "metadata": {
                "depth": block.depth
            }
        }
    }
    return notes
}

function getMetadata() {
    return {
        "name": "meditations",
        "id": "meditations"
    }
}