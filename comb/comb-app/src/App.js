import React, { useState } from 'react';
import { EditorState, ContentState, ContentBlock, convertToRaw, genKey, CharacterMetadata } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import { List, Repeat } from 'immutable'

import { getNotes } from './controller'

const App = () => {

  const notes = getNotes('meditations');
  console.log(notes);

  const input = [''];

  const contentBlocks = input.map(word => {
    return new ContentBlock({
      key: genKey(),
      type: 'unordered-list-item',
      characterList: new List(Repeat(CharacterMetadata.create(), word.length)),
      text: word
    });
  });

  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks))
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
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
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
    </div>
  )
}
export default App;
