const languages = [
    { id: 1, code: "html", name: "HTML" },
    { id: 2, code: "css", name: "CSS" },
    { id: 5, code: "javascript", name: "JavaScript" }
];

export default function getLanguages() {
    /* getLanguages - method return the details of all supported language.
    
        Languages Supported by editor -
            1.) HTML (HyperText Markup Language - used to give structure to webpage).
            2.) CSS (Cascading StyleSheet - used to give style to webpage).
            3.) Javascript (Programming Language - used to give functionality to webpage).
    */
    return languages;
}