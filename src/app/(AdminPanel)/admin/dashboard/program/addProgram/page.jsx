"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
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
  Heart,
  Upload,
  Target,
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
  Video // Added Video icon for YouTube
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AddProgramPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    slug: "",
    image: null,
    whatWeDo: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // TipTap Editor for whatWeDo field
  const whatWeDoEditor = useEditor({
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
    content: formData.whatWeDo,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setFormData(prev => ({ ...prev, whatWeDo: content }));
      if (errors.whatWeDo) {
        setErrors(prev => ({ ...prev, whatWeDo: "" }));
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
      // Auto-generate slug from title
      if (name === "title") {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        setFormData((prevData) => ({ ...prevData, [name]: value, slug }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.image) newErrors.image = "Program image is required";
    if (!formData.whatWeDo.trim() || formData.whatWeDo === '<p></p>') newErrors.whatWeDo = "What We Do content is required";
    
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
    formDataToSubmit.append("subtitle", formData.subtitle);
    formDataToSubmit.append("slug", formData.slug);
    formDataToSubmit.append("whatWeDo", formData.whatWeDo);
    formDataToSubmit.append("description", formData.description);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    try {
      const response = await fetch("/api/admin/dashboard/program/addProgram", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Program added successfully!");
        setFormData({
          title: "",
          subtitle: "",
          slug: "",
          image: null,
          whatWeDo: "",
          description: "",
        });
        whatWeDoEditor?.commands.setContent('');
        setStep(1);
      } else {
        toast.error(data.message || "Failed to add program.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
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
      <div className="border-b border-gray-200 p-3 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex gap-1 pr-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <Bold size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <Italic size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
            title="Strikethrough"
          >
            <span className="text-sm line-through font-bold">S</span>
          </Button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`h-8 px-2 text-xs font-bold ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`h-8 px-2 text-xs font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`h-8 px-2 text-xs font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
            title="Heading 3"
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
          >
            <List size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={14} />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
            title="Align Left"
          >
            <AlignLeft size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
            title="Align Center"
          >
            <AlignCenter size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
            title="Align Right"
          >
            <AlignRight size={14} />
          </Button>
        </div>

        {/* Media & Links */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addLink}
            className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Add Link"
          >
            <LinkIcon size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addImage}
            className="h-8 w-8 p-0"
            title="Add Image"
          >
            <ImageIcon size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addYouTube}
            className="h-8 w-8 p-0"
            title="Add YouTube Video"
          >
            <Video size={14} />
          </Button>
        </div>

        {/* Additional Formatting */}
        <div className="flex gap-1 px-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffff00' }).run()}
            className={`h-8 w-8 p-0 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}
            title="Highlight"
          >
            <Highlighter size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
            title="Inline Code"
          >
            <Code size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            title="Quote"
          >
            <Quote size={14} />
          </Button>
        </div>

        {/* Text Colors */}
        <div className="flex gap-1 px-2">
          <select
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="h-8 text-xs border border-gray-300 rounded px-1"
            title="Text Color"
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
      title: "Program Details", 
      description: "Basic information about your program" 
    },
    { 
      title: "Content & Media", 
      description: "Program content and images" 
    }
  ];

  return (
    <div className="w-full h-[90vh] overflow-y-auto max-h-[95vh] p-6 bg-gray-50 custom-scrollbar">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-green-800">Create New Program</CardTitle>
              <CardDescription className="text-green-600 mt-1">Add a new program to showcase your organization's work</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium
                    ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-8 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
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
        </CardHeader>
        
        <CardContent className="pt-6 pb-20">
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
                    <Label htmlFor="title" className="text-base font-medium text-gray-700 mb-3 block">
                      Program Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter program title"
                      className={`mt-2 h-12 ${errors.title ? "border-red-300 bg-red-50" : ""}`}
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

                  <div className="mb-6">
                    <Label htmlFor="subtitle" className="text-base font-medium text-gray-700 mb-3 block">
                      Program Subtitle
                    </Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      placeholder="Enter program subtitle (optional)"
                      className="mt-2 h-12"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="slug" className="text-base font-medium text-gray-700 mb-3 block">
                      Program Slug *
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="program-slug"
                      className={`mt-2 h-12 ${errors.slug ? "border-red-300 bg-red-50" : ""}`}
                      disabled={loading}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL-friendly version of the title (auto-generated from title)
                    </p>
                    {errors.slug && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.slug}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="description" className="text-base font-medium text-gray-700 mb-3 block">
                      Program Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of the program (optional)"
                      rows="4"
                      className="w-full mt-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                      disabled={loading}
                    />
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
                    <Label htmlFor="image" className="text-base font-medium text-gray-700 mb-3 block">
                      Program Image *
                    </Label>
                    <div className="mt-4 flex items-center">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-green-500 rounded-lg shadow-lg tracking-wide border border-green-200 cursor-pointer hover:bg-green-50 transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="mt-2 text-base">Select program image</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="hidden"
                          onChange={handleChange}
                          accept="image/*"
                          disabled={loading}
                        />
                      </label>
                    </div>
                    {formData.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Program preview"
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-green-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Image uploaded successfully!
                          </p>
                          <p className="text-green-600 text-sm">{formData.image.name}</p>
                        </div>
                      </motion.div>
                    )}
                    {errors.image && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.image}
                      </div>
                    )}
                  </div>

                  <div className="mb-20">
                    <Label htmlFor="whatWeDo" className="text-base font-medium text-gray-700 mb-3 block">
                      What We Do *
                    </Label>
                    <div className={`mt-4 border rounded-md ${errors.whatWeDo ? "border-red-300" : "border-gray-300"}`}>
                      <EditorToolbar editor={whatWeDoEditor} />
                      <EditorContent 
                        editor={whatWeDoEditor}
                        className="min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none"
                      />
                    </div>
                    {errors.whatWeDo && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.whatWeDo}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 border-t bg-gray-50">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrevStep}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < steps.length ? (
            <Button 
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
              disabled={!formData.title || !formData.slug}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !formData.whatWeDo || !formData.image}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Program</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

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

export default AddProgramPage;