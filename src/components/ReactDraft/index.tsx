import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Code } from "../Code";

export const ReactDraft = () => {
  const [state, setState] = useState<EditorState>(
    EditorState.createEmpty() || {}
  );

  return (
    <div>
      <ul className="list-disc ml-6 mb-4">
        <li>Estilizações com css in-line</li>
        <li>
          Drop down não funciona com Strict Mode, de acordo com essa issue:{" "}
          <a
            href="https://github.com/jpuri/react-draft-wysiwyg/issues/951"
            className="text-blue-500"
          >
            https://github.com/jpuri/react-draft-wysiwyg/issues/951
          </a>
        </li>
        <li>Difícil acesso ao HTML</li>
        <li>Implementação antiga</li>
        <li>Documentação antiga</li>
      </ul>

      <div className="mb-4">
        <Editor
          editorState={state}
          onEditorStateChange={(props) => setState(props)}
          editorClassName="h-[20em] border border-gray-200"
        />
      </div>

      <Code>{`${draftToHtml(convertToRaw(state.getCurrentContent()))}`}</Code>
    </div>
  );
};
