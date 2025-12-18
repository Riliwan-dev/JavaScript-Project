const editor = CodeMirror.fromTextArea(document.getElementById('codeArea'), {
    lineNumbers: true,
    mode: "htmlmixed",
    theme: "dracula",
    tabSize: 2,
    autoCloseTags: true
});
document.getElementById('runCode').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.srcdoc = editor.getValue();
});
const body = document.body;
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
    if(body.style.background.includes('74ebd5')) {
        body.style.background = 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
        editor.setOption("theme", "default");
    } else {
        body.style.background = 'linear-gradient(135deg, #74ebd5, #acb6e5)';
        editor.setOption("theme", "dracula");
    }
});