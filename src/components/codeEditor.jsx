import React, { Component } from 'react';
import Prism from "prismjs";
import Dropdown from './common/dropdown';

import "../styles/prism.css";
import "../styles/codeEditor.css";

import getLanguages from '../services/languageService';

class CodeEditor extends Component {
    state = {
        languageSelected: "python",
        languages: [],
        code: "",
        tabSize: 2,
        tabCharacter: "  "
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
        var textArea = event.target;

        var code = textArea.value;
        var selectionStart = textArea.selectionStart;
        var selectionEnd = textArea.selectionEnd;

        var { tabCharacter, tabSize } = this.state;

        if (event.key === "Tab") {
            /* Tab key pressed */
            event.preventDefault(); // stop normal

            if (selectionStart !== selectionEnd) {
                //
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
                textArea.value = code;

                event.target.selectionStart =
                    startLineText && /\S/.test(startLineText)
                        ? selectionStart + tabSize
                        : selectionStart;

                event.target.selectionEnd = selectionEnd + tabSize * (endTabLine - startTabLine + 1);
            } else {
                //
                const newSelectionStart = selectionStart + tabSize;

                code = code.substring(0, selectionStart) + tabCharacter + code.substring(selectionEnd);
                textArea.value = code;

                event.target.selectionStart = newSelectionStart;
                event.target.selectionEnd = newSelectionStart;
            }

            this.setState({ code }); // Update text to include indent
        }
    }

    handleLanguageChange = ({ currentTarget: input }) => {
        var language = input.value;
        this.setState({ language });
    }


    render() {
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
        var languages = getLanguages();
        this.setState({ languages });

        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }
}

export default CodeEditor;