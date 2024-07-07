import React, { Component } from 'react';
import Prism from "prismjs";
import Dropdown from './common/dropdown';

import "../styles/prism.css";
import "../styles/codeEditor.css";

import { getLanguages } from '../services/languageService';

class CodeEditor extends Component {
    state = {
        languageSelected: "html",
        languages: [],
        code: ""
    }

    handleChange = (input) => {
        var code = input.target.value;
        code.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");

        if (code[code.length - 1] == "\n") {
            code += " ";
        }

        this.setState({ code });
    }

    highlighterComponent = React.createRef();
    handleScroll = (scroll) => {
        this.highlighterComponent.current.scrollTop = scroll.target.scrollTop;
        this.highlighterComponent.current.scrollLeft = scroll.target.scrollLeft;
    }

    handleTab = (event) => {
        // if (event.key === "Tab") {

        //     // Prevent focus change
        //     e.preventDefault();

        //     if (event.ke === "Shift") {

        //         // Unindent selected lines
        //         const linesBeforeCaret = this.getLines(value, selectionStart);
        //         const startLine = linesBeforeCaret.length - 1;
        //         const endLine = this.getLines(value, selectionEnd).length - 1;
        //         const nextValue = value
        //             .split('\n')
        //             .map((line, i) => {
        //                 if (
        //                     i >= startLine &&
        //                     i <= endLine &&
        //                     line.startsWith(tabCharacter)
        //                 ) {
        //                     return line.substring(tabCharacter.length);
        //                 }

        //                 return line;
        //             })
        //             .join('\n');

        //         if (value !== nextValue) {
        //             const startLineText = linesBeforeCaret[startLine];

        //             applyEdits({
        //                 value: nextValue,
        //                 // Move the start cursor if first line in selection was modified
        //                 // It was modified only if it started with a tab
        //                 selectionStart: startLineText?.startsWith(tabCharacter)
        //                     ? selectionStart - tabCharacter.length
        //                     : selectionStart,
        //                 // Move the end cursor by total number of characters removed
        //                 selectionEnd: selectionEnd - (value.length - nextValue.length),
        //             });
        //         }
        //     } else if (selectionStart !== selectionEnd) {
        //         // Indent selected lines
        //         const linesBeforeCaret = this.getLines(value, selectionStart);
        //         const startLine = linesBeforeCaret.length - 1;
        //         const endLine = this.getLines(value, selectionEnd).length - 1;
        //         const startLineText = linesBeforeCaret[startLine];

        //         applyEdits({
        //             value: value
        //                 .split('\n')
        //                 .map((line, i) => {
        //                     if (i >= startLine && i <= endLine) {
        //                         return tabCharacter + line;
        //                     }

        //                     return line;
        //                 })
        //                 .join('\n'),
        //             // Move the start cursor by number of characters added in first line of selection
        //             // Don't move it if it there was no text before cursor
        //             selectionStart:
        //                 startLineText && /\S/.test(startLineText)
        //                     ? selectionStart + tabCharacter.length
        //                     : selectionStart,
        //             // Move the end cursor by total number of characters added
        //             selectionEnd:
        //                 selectionEnd + tabCharacter.length * (endLine - startLine + 1),
        //         });
        //     } else {
        //         const updatedSelection = selectionStart + tabCharacter.length;

        //         applyEdits({
        //             // Insert tab character at caret
        //             value:
        //                 value.substring(0, selectionStart) +
        //                 tabCharacter +
        //                 value.substring(selectionEnd),
        //             // Update caret position
        //             selectionStart: updatedSelection,
        //             selectionEnd: updatedSelection,
        //         });
        //     }
        // }
    }


    render() {
        return (
            <React.Fragment>
                <Dropdown items={this.state.languages} />

                <div className="container">
                    <textarea className="editor"
                        spellCheck="false"
                        placeholder="Start Your Coddeeng Experience..."
                        onScroll={this.handleScroll}
                        onChange={this.handleChange}
                        onKeyDown={this.handleTab} />

                    <pre className="highlighter"
                        aria-hidden="true"
                        ref={this.highlighterComponent}>
                        <code className={`language-${this.state.languageSelected}`}>
                            {this.state.code}
                        </code>
                    </pre>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.setState({ languages: getLanguages() });
        console.log(this.state.languages);
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    // getLines = (text, position) =>
    //     text.substring(0, position).split('\n');
}

export default CodeEditor;