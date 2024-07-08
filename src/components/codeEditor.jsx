// Importing Components.
import React, { Component } from 'react';
import Prism from "prismjs";
import Dropdown from './common/dropdown';

// Importing utility function.
import getLanguages from '../services/languageService';

// Importing CSS.
import "../styles/prism.css";
import "../styles/codeEditor.css";

class CodeEditor extends Component {
    state = {
        languageSelected: "none", // Current language selected - code syntax will be highlighted according to current language selected.
        languages: [], // List of all supported languages.
        code: "", // actual code (text written on the editor).
        tabSize: 2,
        tabCharacter: "  "
    }

    handleChange = (input) => {
        // handleChange - method used to handle event change on textArea element. (update the code in the state, based on the text written in textArea element).

        var code = input.target.value;
        code.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");

        if (code[code.length - 1] == "\n") { // handling new-line characters.
            code += " ";
        }

        this.setState({ code }); // updating the code in the state.
    }

    highlighterComponent = React.createRef();
    handleScroll = (scroll) => {
        // handleScroll - method used to sync the scroll property of textArea and prism highlighter.

        this.highlighterComponent.current.scrollTop = scroll.target.scrollTop;
        this.highlighterComponent.current.scrollLeft = scroll.target.scrollLeft;
    }

    handleTab = (event) => {
        // handleTab - method used to handle event if 'TAB' key pressed on textArea element.

        var textArea = event.target;

        var code = textArea.value;
        var selectionStart = textArea.selectionStart;
        var selectionEnd = textArea.selectionEnd;

        var { tabCharacter, tabSize } = this.state;

        if (event.key === "Tab") {

            event.preventDefault(); // stop default 'TAB' behaviour (default 'TAB' behavior - switch between DOM elements).

            if (selectionStart !== selectionEnd) {
                /* Multiple characters are selected, either accross the multiple lines or on the same line.

                    1.) If multiple characters are selected accross multiple lines: Every selected lines will get effected according to tab size.
                    2.) If multiple characters are selected on the same line: Text(code) selected and post selected will get effected according to tab size.
                */
                const linesBeforeCaret = code.substring(0, selectionStart).split('\n');
                const startTabLine = linesBeforeCaret.length - 1;

                const endTabLine = code.substring(0, selectionEnd).split('\n').length - 1;
                const startLineText = linesBeforeCaret[startTabLine];

                code = code
                    .split('\n')
                    .map((line, i) => {
                        if (i >= startTabLine && i <= endTabLine) {
                            return tabCharacter + line;
                        }

                        return line;
                    })
                    .join('\n');
                textArea.value = code; // updating the textArea element value.

                event.target.selectionStart =
                    startLineText && /\S/.test(startLineText)
                        ? selectionStart + tabSize
                        : selectionStart;

                event.target.selectionEnd = selectionEnd + tabSize * (endTabLine - startTabLine + 1);
            } else {
                /* No character is selected.

                    If no character is selected: Text(code) post caret on the same line will get effected according to tab size.
                */
                const newSelectionStart = selectionStart + tabSize;

                code = code.substring(0, selectionStart) + tabCharacter + code.substring(selectionEnd);
                textArea.value = code; // updating the textArea element value.

                event.target.selectionStart = newSelectionStart;
                event.target.selectionEnd = newSelectionStart;
            }

            this.setState({ code }); // updating the code in the state.
        }
    }

    handleLanguageChange = ({ currentTarget: input }) => {
        // handleLanguageChange - method used to update the languageSelected and highlight syntax accordingly.

        var languageSelected = input.value;
        this.setState({ languageSelected });
    }


    render() {
        // render - life cycle hook used to render the component.
        return (
            <React.Fragment>
                <Dropdown items={this.state.languages}
                    onChange={this.handleLanguageChange} />


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
            </React.Fragment>
        );
    }

    componentDidMount() {
        // componentDidMount - life cycle hook executed as soon as the component is mounted.
        var languages = getLanguages();
        this.setState({ languages });

        Prism.highlightAll();
    }

    componentDidUpdate() {
        // componentDidUpdate - life cycle hook executed every time the component is updated.
        Prism.highlightAll();
    }
}

export default CodeEditor;