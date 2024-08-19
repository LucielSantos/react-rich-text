import StarterKit from "@tiptap/starter-kit";
import { CommandProps } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import TextColor from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: number) => ReturnType;
      /**
       * Toggle the font size
       */
      toggleFontSize: (size: number) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace("px", ""),
        renderHTML: (attributes) => {
          if (!attributes["fontSize"]) {
            return {};
          }
          return {
            style: `font-size: ${attributes["fontSize"]}px`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize: number) =>
        ({ commands }: CommandProps) => {
          return commands.setMark(this.name, { fontSize: fontSize });
        },
      unsetFontSize:
        () =>
        ({ chain }: CommandProps) => {
          return chain()
            .setMark(this.name, { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
      toggleFontSize:
        (fontSize: number) =>
        ({ editor, commands }: CommandProps) => {
          const currentFontSize = editor.getAttributes("textStyle")?.fontSize;

          if (fontSize === currentFontSize) {
            return commands.unsetFontSize();
          }

          return commands.setMark(this.name, { fontSize: fontSize });
        },
    };
  },
});

export const extensions = [
  StarterKit,
  Underline,
  TextStyleExtended,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextColor,
  Placeholder.configure({
    placeholder: "Escreva algo...",
  }),
  CharacterCount.configure({
    limit: 1000,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
];
