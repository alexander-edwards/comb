import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js';
import './App.css';
import { saveNotes } from './controller';

import { blockMapToNotes } from './utils'

class MyCustomBlock extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div> </div>);
    }
}

const blockRenderMap = Map({
    'unstyled': {
        element: '',
        wrapper: <MyCustomBlock />
    },
});

// keep support for other draft default block types and add our myCustomBlock type
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export class NoteEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Editor
                blockRenderMap={extendedBlockRenderMap}
                defaultEditorState={this.props.editorState}
                onEditorStateChange={this.props.handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />

        );
    }
}


export class SaveNotesButton extends Component {
    constructor(props) {
        super(props);
    }

    handleSave() {
        let notes = blockMapToNotes(this.props.editorState);
        saveNotes(notes)
    }

    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button onClick={() => this.handleSave()}>
                Save Notes
            </button>
        );
    }

}