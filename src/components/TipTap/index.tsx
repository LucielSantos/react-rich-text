import { EditorProvider } from "@tiptap/react";

import { useCurrentEditor } from "@tiptap/react";
import { Code } from "../Code";
import { EditorToolbar } from "./EditorToolbar";
import { extensions } from "./utils";

const content = "";

export const TipTap = () => {
  return (
    <div className="tiptap">
      <ul className="list-disc ml-6">
        <li>Fácil utilização</li>
        <li>Acesso fácil ao valor</li>
        <li>
          Layout altamente customizável, pois a Toolbar é feita do zero, a lib
          traz somente as funcionalidades de Rich Text
        </li>
        <li>Boa integração com Typescript</li>
        <li>Estilizações com css in-line</li>
        <li>
          Recursos em formato de módulos, precisando instalar as funcionalidades
          separadamente
        </li>
      </ul>

      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<EditorToolbar />}
        slotAfter={<EditorBottom />}
        editorProps={{
          attributes: {
            class:
              "p-2 border-x border-b border-zinc-200 rounded-b-md mb-2 py-4 h-80 overflow-auto",
          },
        }}
      ></EditorProvider>
    </div>
  );
};

const EditorBottom = () => {
  const { editor } = useCurrentEditor();

  const percentage = editor
    ? Math.round((100 / 1000) * editor.storage.characterCount.characters())
    : 0;

  return (
    <div>
      <div className="flex justify-end gap-2 items-center mb-1">
        <svg height="20" width="20" viewBox="0 0 20 20">
          <circle r="10" cx="10" cy="10" fill="#e9ecef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke={
              editor?.storage.characterCount.characters() === 1000
                ? "#ef4444"
                : "#6366f1"
            }
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
        <span>
          {editor?.storage.characterCount.characters()} / {1000} Caracteres
        </span>

        <span>{editor?.storage.characterCount.words()} words</span>
      </div>

      <Code>{editor?.getHTML()}</Code>
    </div>
  );
};
