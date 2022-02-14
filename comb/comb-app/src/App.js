import React, { useState } from 'react';
import { EditorState, ContentState, ContentBlock, genKey, CharacterMetadata } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { List, Repeat } from 'immutable'

import './App.css';
import { NoteEditor, SaveNotesButton } from './Editor';
import { getNotes, saveNotes } from './controller'
import { blockMapToNotes } from './utils';

const App = () => {

  const notes = getNotes('meditations');
  let contentBlocks = [];
  for (let noteHash in notes.content) {
    let note = notes.content[noteHash];
    contentBlocks.push(
      new ContentBlock({
        key: noteHash,
        type: 'unordered-list-item',
        characterList: new List(Repeat(CharacterMetadata.create(), note.text.length)),
        text: note.text,
        depth: note.metadata.depth
      })
    )
  }

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks))
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    let notes = blockMapToNotes(editorState);
  }


  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        Comb
      </header>
      <SaveNotesButton
        editorState={editorState}
      />
      <NoteEditor
        editorState={editorState}
        handleEditorChange={handleEditorChange}
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </div>
  )
}
export default App;
