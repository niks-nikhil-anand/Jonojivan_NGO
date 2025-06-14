"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Plus,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
  Highlighter,
  Code,
  Quote,
  Video,
  User,
  Tag,
  Type
} from "lucide-react";

const ModernBlogForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    featuredImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // TipTap Editor for content field
  const contentEditor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md',
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
        HTMLAttributes: {
          class: 'rounded-lg shadow-md',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setFormData(prev => ({ ...prev, content }));
      if (errors.content) {
        setErrors(prev => ({ ...prev, content: "" }));
      }
    },
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim() || formData.content === '<p></p>') newErrors.content = "Blog content is required";
    if (!formData.featuredImage) newErrors.featuredImage = "Featured image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill in all required fields");
    return;
  }

  setLoading(true);

  const formDataToSubmit = new FormData();
  formDataToSubmit.append("title", formData.title);
  formDataToSubmit.append("content", formData.content);

  if (formData.featuredImage) {
    formDataToSubmit.append("featuredImage", formData.featuredImage);
  }

  try {
    const res = await fetch("/api/admin/dashboard/blog", {
      method: "POST",
      body: formDataToSubmit,
    });

    if (!res.ok) {
      throw new Error("Failed to submit blog");
    }

    toast.success("Blog added successfully!");
    setFormData({
      title: "",
      content: "",
      featuredImage: null,
    });
    contentEditor?.commands.setContent("");
    setStep(1);
  } catch (error) {
    toast.error("Something went wrong.");
    console.error("Submit error:", error);
  } finally {
    setLoading(false);
  }
};


  // Editor toolbar component
  const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    const addImage = () => {
      const url = window.prompt('Enter image URL:');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };

    const addLink = () => {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('Enter URL:', previousUrl);
      
      if (url === null) {
        return;
      }
      
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addYouTube = () => {
      const url = window.prompt('Enter YouTube URL:');
      if (url) {
        editor.commands.setYoutubeVideo({
          src: url,
        });
      }
    };

    return (
      <div className="border-b border-gray-200 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex gap-1 pr-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
            title="Strikethrough"
          >
            <span className="text-sm line-through font-bold">S</span>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`h-8 px-2 text-xs font-bold rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`h-8 px-2 text-xs font-bold rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`h-8 px-2 text-xs font-bold rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={14} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="Align Left"
          >
            <AlignLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="Align Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="Align Right"
          >
            <AlignRight size={14} />
          </button>
        </div>

        {/* Media & Links */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={addLink}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Add Link"
          >
            <LinkIcon size={14} />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center"
            title="Add Image"
          >
            <ImageIcon size={14} />
          </button>
          <button
            type="button"
            onClick={addYouTube}
            className="h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center"
            title="Add YouTube Video"
          >
            <Video size={14} />
          </button>
        </div>

        {/* Additional Formatting */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffff00' }).run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}
            title="Highlight"
          >
            <Highlighter size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
            title="Inline Code"
          >
            <Code size={14} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`h-8 w-8 p-0 rounded hover:bg-gray-200 flex items-center justify-center ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            title="Quote"
          >
            <Quote size={14} />
          </button>
        </div>

        {/* Text Colors */}
        <div className="flex gap-1 px-2">
          <select
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="h-8 text-xs border border-gray-300 rounded px-1 bg-white"
            title="Text Color"
            value=""
          >
            <option value="">Default</option>
            <option value="#000000">Black</option>
            <option value="#ef4444">Red</option>
            <option value="#22c55e">Green</option>
            <option value="#3b82f6">Blue</option>
            <option value="#f59e0b">Orange</option>
            <option value="#8b5cf6">Purple</option>
            <option value="#06b6d4">Cyan</option>
          </select>
        </div>
      </div>
    );
  };

  // Define step titles and descriptions
  const steps = [
    { 
      title: "Blog Details", 
      description: "Basic information about your blog post" 
    },
    { 
      title: "Featured Image & Publishing", 
      description: "Blog content, media, and publishing details" 
    }
  ];

  return (
    <div className="w-full h-screen overflow-y-auto p-6 bg-gray-50">
      <div className="w-full shadow-md bg-white rounded-lg">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">Create New Blog Post</h1>
                <p className="text-blue-600 mt-1">Share your thoughts and stories with the world</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium
                    ${step > i + 1 ? 'bg-blue-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-8 ${step > i + 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-600">
              Step {step}: {steps[step-1].title}
            </p>
            <p className="text-xs text-gray-500">{steps[step-1].description}</p>
          </div>
        </div>
        
        <div className="pt-6 pb-20 px-6">
          <div>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="mb-6">
                    <label htmlFor="title" className="text-base font-medium text-gray-700 mb-3 block flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Blog Title *
                    </label>
                    <input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter an engaging blog title"
                      className={`mt-2 h-12 w-full px-3 border rounded-md ${errors.title ? "border-red-300 bg-red-50" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      disabled={loading}
                      required
                    />
                    {errors.title && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.title}
                      </div>
                    )}
                  </div>

                

                  <div className="mb-20">
                    <label htmlFor="content" className="text-base font-medium text-gray-700 mb-3 block flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Blog Content *
                    </label>
                    <div className={`mt-4 border rounded-md ${errors.content ? "border-red-300" : "border-gray-300"}`}>
                      <EditorToolbar editor={contentEditor} />
                      <EditorContent 
                        editor={contentEditor}
                        className="min-h-[400px] p-4 prose prose-sm max-w-none focus:outline-none"
                      />
                    </div>
                    {errors.content && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.content}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="mb-6">
                    <label htmlFor="featuredImage" className="text-base font-medium text-gray-700 mb-3 block flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Featured Image *
                    </label>
                    <div className="mt-4 flex items-center">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="mt-2 text-base">Select featured image</span>
                        <input
                          id="featuredImage"
                          name="featuredImage"
                          type="file"
                          className="hidden"
                          onChange={handleChange}
                          accept="image/*"
                          disabled={loading}
                        />
                      </label>
                    </div>
                    {formData.featuredImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <img
                          src={URL.createObjectURL(formData.featuredImage)}
                          alt="Featured image preview"
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-blue-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Image uploaded successfully!
                          </p>
                          <p className="text-blue-600 text-sm">{formData.featuredImage.name}</p>
                        </div>
                      </motion.div>
                    )}
                    {errors.featuredImage && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.featuredImage}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between p-6 border-t bg-gray-50 rounded-b-lg">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={handlePrevStep}
              className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={16} />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < steps.length ? (
            <button 
              type="button"
              onClick={handleNextStep}
              disabled={!formData.title || !formData.content}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !formData.content || !formData.featuredImage }
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Publish Blog</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror p {
          margin: 0.5rem 0;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
        }
        .ProseMirror li {
          margin: 0.25rem 0;
        }
        .ProseMirror h1, .ProseMirror h2, .ProseMirror h3 {
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        .ProseMirror h1 {
          font-size: 1.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
        }
        .ProseMirror h3 {
          font-size: 1.125rem;
        }
        .ProseMirror strong {
          font-weight: bold;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror [data-text-align="center"] {
          text-align: center;
        }
        .ProseMirror [data-text-align="right"] {
          text-align: right;
        }
        .ProseMirror [data-text-align="left"] {
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default ModernBlogForm;