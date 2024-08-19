import { useCurrentEditor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import { ComponentProps } from "react";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { MdHorizontalRule } from "react-icons/md";
import { BiRedo, BiUndo } from "react-icons/bi";

export const EditorToolbar = () => {
  const { editor } = useCurrentEditor();

  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="toolbarContainer">
      <div className="toolbarSection">
        <CommandButton className="p-1">
          <select
            value={editor?.getAttributes("heading")?.level || 0}
            onChange={(e) => {
              const newLevel = Number(e.target.value) as Level;

              if (
                editor?.getAttributes("heading")?.level === newLevel ||
                e.target.value === "0"
              ) {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({
                    level: editor?.getAttributes("heading")?.level,
                  })
                  .run();
              }

              editor?.chain().focus().toggleHeading({ level: newLevel }).run();
            }}
          >
            <option value="0">Texto normal</option>
            <option value="1">Título 1</option>
            <option value="2">Título 2</option>
            <option value="3">Título 3</option>
            <option value="4">Título 4</option>
            <option value="5">Título 5</option>
            <option value="6">Título 6 </option>
          </select>
        </CommandButton>

        <CommandButton className="p-1">
          <select
            value={editor?.getAttributes("textStyle")?.fontSize || 16}
            onChange={(e) => {
              editor
                ?.chain()
                .focus()
                .toggleFontSize(Number(e.target.value))
                .run();
            }}
          >
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="22">22px</option>
          </select>
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          <FaBold size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          <FaItalic size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline")}
        >
          <FaUnderline size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
        >
          <FaStrikethrough size={16} />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() =>
            editor?.isActive({ color: "#a855f7" })
              ? editor?.chain().focus().unsetColor().run()
              : editor?.chain().focus().setColor("#a855f7").run()
          }
          isActive={editor?.isActive({ color: "#a855f7" })}
        >
          <div className="h-4 w-4 bg-purple-500 rounded-sm" />
        </CommandButton>

        <CommandButton
          onClick={() =>
            editor?.isActive({ color: "#06b6d4" })
              ? editor?.chain().focus().unsetColor().run()
              : editor?.chain().focus().setColor("#06b6d4").run()
          }
          isActive={editor?.isActive({ color: "#06b6d4" })}
        >
          <div className="h-4 w-4 bg-cyan-500 rounded-sm" />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() => editor?.chain().focus().toggleCode().run()}
          isActive={editor?.isActive("code")}
        >
          <FaCode size={16} />
        </CommandButton>

        <CommandButton onClick={setLink} isActive={editor?.isActive("link")}>
          <FaLink size={13} />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          isActive={editor?.isActive("orderedList")}
        >
          <FaListOl size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList")}
        >
          <FaListUl size={16} />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          isActive={editor?.isActive({ textAlign: "left" })}
        >
          <FaAlignLeft size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          isActive={editor?.isActive({ textAlign: "right" })}
        >
          <FaAlignRight size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          isActive={editor?.isActive({ textAlign: "center" })}
        >
          <FaAlignCenter size={16} />
        </CommandButton>

        <CommandButton
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          isActive={editor?.isActive({ textAlign: "justify" })}
        >
          <FaAlignJustify size={16} />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <MdHorizontalRule size={16} />
        </CommandButton>
      </div>

      <div className="toolbarSection">
        <CommandButton onClick={() => editor?.chain().focus().undo().run()}>
          <BiUndo size={16} />
        </CommandButton>

        <CommandButton onClick={() => editor?.chain().focus().redo().run()}>
          <BiRedo size={16} />
        </CommandButton>
      </div>
    </div>
  );
};

interface CommandButtonProps extends ComponentProps<"button"> {
  isActive?: boolean;
}

const CommandButton = ({ children, isActive, ...rest }: CommandButtonProps) => {
  return (
    <button
      {...rest}
      className={`p-2 transition-all duration-300 hover:brightness-90 rounded-md ${
        isActive ? "bg-indigo-500 text-white" : "bg-white"
      } ${rest.className}`}
    >
      {children}
    </button>
  );
};
