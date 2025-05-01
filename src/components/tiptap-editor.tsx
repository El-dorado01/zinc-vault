'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { TiptapJson } from '@/types/index';

// Custom Heading extension with Tailwind classes
const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        renderHTML: (attributes) => ({
          class:
            attributes.level === 1
              ? 'text-3xl font-bold text-blue-600'
              : attributes.level === 2
              ? 'text-2xl font-semibold text-gray-800'
              : 'text-xl font-medium text-gray-700',
        }),
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
        default: 'text-blue-500 hover:underline',
      },
    };
  },
});

type TiptapStandardEditorProps = {
  initialContent?: string | TiptapJson;
  onUpdate?: (json: TiptapJson) => void;
};

const TiptapStandardEditor = ({ initialContent, onUpdate }: TiptapStandardEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading
      }),
      CustomHeading,
      CustomLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline',
        },
      }),
    ],
    content: initialContent || '<p>Start editing...</p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON() as TiptapJson;
      onUpdate?.(json);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  // Add/edit link handler
  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  // Handle link toggle click
  const handleLinkToggle = () => {
    if (editor.isActive('link')) {
      setLinkUrl(editor.getAttributes('link').href || '');
      setShowLinkInput(true);
    } else {
      setLinkUrl('');
      setShowLinkInput(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 w-full relative">
        {/* Toolbar with ToggleGroup and Tooltips, shown only when focused */}
        {isFocused && (
          <ToggleGroup
            type="multiple"
            className="flex flex-wrap gap-2 justify-start absolute -top-10 z-10 bg-sidebar"
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
        )}

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

        {/* Editor Content */}
          <EditorContent editor={editor} />
        {/* <div className="border border-gray-200 rounded-lg p-4 prose prose-blue overflow-x-hidden w-full">
        </div> */}
      </div>
    </TooltipProvider>
  );
};

export default TiptapStandardEditor;