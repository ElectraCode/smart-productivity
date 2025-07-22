"use client";

// @ts-ignore
import { BlockNoteView } from "@blocknote/mantine";
// @ts-ignore
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

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
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
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload,
  });

  // Handler for editor content changes
  const handleEditorChange = (editorInstance: { topLevelBlocks: Block[] }) => {
    const blocks = editorInstance.topLevelBlocks.map((block: Block) => ({
      id: block.id,
      type: block.type,
      props: block.props,
      content: block.content || [],
      children: block.children || [],
    }));

    const content = JSON.stringify(blocks, null, 2);
    onChange(content);
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable ?? true}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};
function useTheme(): { resolvedTheme: any } {
  throw new Error("Function not implemented.");
}

export default Editor;
