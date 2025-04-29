"use client"; // Ensure client-side rendering

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

// Custom Heading extension with Tailwind classes
const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        renderHTML: (attributes) => ({
          class:
            attributes.level === 1
              ? "text-3xl font-bold text-blue-600"
              : attributes.level === 2
                ? "text-2xl font-semibold text-gray-800"
                : "text-xl font-medium text-gray-700",
        }),
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

// Custom Link extension with Tailwind classes
const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "text-blue-500 hover:underline",
      },
    };
  },
});

const TiptapStandardEditor = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading
      }),
      CustomHeading,
      CustomImage,
      CustomLink.configure({
        openOnClick: false, // Prevent auto-opening links in editor
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
      }),
    ],
    content: `
      <h1>Welcome to the Editor</h1>
      <p>This is a <strong>sample</strong> paragraph with a <a href="https://example.com">link</a>.</p>
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

  if (!editor) {
    return <div>Loading editor...</div>;
  }

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

  // Add/edit link handler
  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  // Handle link toggle click
  const handleLinkToggle = () => {
    if (editor.isActive("link")) {
      setLinkUrl(editor.getAttributes("link").href || "");
      setShowLinkInput(true);
    } else {
      setLinkUrl("");
      setShowLinkInput(true);
    }
  };

  return (
    <>
      <TooltipProvider>
        <div className="flex flex-col gap-4 px-4 w-full">
          {/* Toolbar with ToggleGroup and Tooltips */}
          <ToggleGroup
            type="multiple"
            className="flex flex-wrap gap-2 justify-start"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  data-state={editor.isActive("bold") ? "on" : "off"}
                  className="p-2"
                >
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  data-state={editor.isActive("italic") ? "on" : "off"}
                  className="p-2"
                >
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="heading1"
                  aria-label="Toggle heading 1"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  data-state={
                    editor.isActive("heading", { level: 1 }) ? "on" : "off"
                  }
                  className="p-2"
                >
                  <Heading1 className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading 1</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="heading2"
                  aria-label="Toggle heading 2"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  data-state={
                    editor.isActive("heading", { level: 2 }) ? "on" : "off"
                  }
                  className="p-2"
                >
                  <Heading2 className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading 2</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="heading3"
                  aria-label="Toggle heading 3"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  data-state={
                    editor.isActive("heading", { level: 3 }) ? "on" : "off"
                  }
                  className="p-2"
                >
                  <Heading3 className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Heading 3</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="bulletList"
                  aria-label="Toggle bullet list"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  data-state={editor.isActive("bulletList") ? "on" : "off"}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bullet List</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="orderedList"
                  aria-label="Toggle ordered list"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  data-state={editor.isActive("orderedList") ? "on" : "off"}
                  className="p-2"
                >
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ordered List</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="link"
                  aria-label="Toggle link"
                  onClick={handleLinkToggle}
                  data-state={editor.isActive("link") ? "on" : "off"}
                  className="p-2"
                >
                  <LinkIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add/Edit Link</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>

          {/* Link Input */}
          {showLinkInput && (
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Enter link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                
              />
              <Button onClick={setLink}>Apply</Button>
              <Button
                variant="outline"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setShowLinkInput(false);
                  setLinkUrl("");
                }}
              >
                Remove
              </Button>
            </div>
          )}

          {/* Image Input */}
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={addImage}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Image</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Editor Content */}
          <div className="border border-gray-200 rounded-lg p-4 prose prose-blue overflow-x-hidden w-full">
            <EditorContent editor={editor} />
          </div>

          {/* Optional: JSON Output for Debugging */}
          {/* <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto text-sm">
            {JSON.stringify(editor?.getJSON(), null, 2)}
          </pre> */}
        </div>
      </TooltipProvider>
    </>
  );
};

export default TiptapStandardEditor;
