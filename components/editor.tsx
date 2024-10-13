"use client";

import { useTheme } from "next-themes";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react"; // Use Mantine's BlockNote hook
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgestore";

// Define the custom Block type
interface Block {
  id: string;
  type: string;
  props: {
    backgroundColor?: string;
    textAlignment?: string;
    url?: string;
    caption?: string;
    width?: number;
    textColor?: string;
  };
  content?: never[]; // Adjust the type here based on the expected structure of the content
  children?: Block[];
}

interface EditorProps {
  onChange: (value: string) => void; // Function to save content
  initialContent?: string; // Initial content (if any)
  editable?: boolean; // Editor mode (editable or not)
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  // Use Mantine's useCreateBlockNote to create the editor instance
  const editor = useCreateBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
    // Track editor content changes with the custom Block type
    onChange: (editorInstance: { topLevelBlocks: Block[] }) => {
      const blocks = editorInstance.topLevelBlocks.map((block: Block) => ({
        id: block.id,
        type: block.type,
        props: block.props,
        content: block.content || [], // Ensure content field is populated
        children: block.children || [], // Ensure children field is populated
      }));

      // Convert the content to JSON string
      const content = JSON.stringify(blocks, null, 2);

      // Send the content back through the onChange function
      onChange(content);
    },
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
