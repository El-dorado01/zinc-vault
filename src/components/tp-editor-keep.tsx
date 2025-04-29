"use client"; // Required for client-side rendering in Next.js

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading"; // Import Heading extension directly
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Custom Heading extension with Tailwind classes
const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        renderHTML: (attributes) => {
          return {
            class:
              attributes.level === 1
                ? "text-4xl font-bold text-blue-600"
                : attributes.level === 2
                  ? "text-2xl font-semibold text-gray-800"
                  : "text-xl font-medium text-gray-700",
          };
        },
      },
    };
  },
});

// Custom Image extension with Tailwind classes
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "border-2 border-gray-200 rounded-lg max-w-full h-auto",
      },
    };
  },
});

const TiptapEditor = () => {
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use custom
      }),
      CustomHeading, // Use custom heading
      CustomImage, // Use custom image
    ],
    content: `
      <h1>Welcome to My Blog</h1>
      <p>This is a <strong>sample</strong> paragraph.</p>
      <h2>Subheading</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <img src="https://example.com/image.jpg" alt="Sample image" />
    `,
    onUpdate: ({ editor }) => {
      console.log("JSON Output:", editor.getJSON());
    },
  });

  if (!editor) return null;

  // Add image handler
  const addImage = () => {
    if (imageUrl) {
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: "User image" })
        .run();
      setImageUrl("");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Toolbar with shadcn/ui */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Heading</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              Paragraph
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </Button>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <Button onClick={addImage}>Add Image</Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="border border-gray-200 rounded-lg p-4 prose prose-blue max-w-none">
        <EditorContent editor={editor} />
      </div>

      {/* Preview JSON Output */}
      <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto">
        {JSON.stringify(editor?.getJSON(), null, 2)}
      </pre>
    </div>
  );
};

export default TiptapEditor;
