import { useEffect, useRef, useState } from 'react';
import Quill, { Delta } from 'quill';
import 'quill/dist/quill.snow.css';
import { QueryClient } from '@tanstack/react-query';
import axiosInstance from '@/services/axios-instance';

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: Delta;
  onTextChange?: (...args: A[]) => void;
  onSelectionChange?: (...args: A[]) => void;
}

const Richtext = (props: EditorProps) => {
  const { readOnly = false, defaultValue, onTextChange, onSelectionChange } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const queryClient = new QueryClient();
  const customToolbar = [
    [{ header: '1' }, { header: '2' }, { header: '3' }],
    // [{ font: [] }],
    // [{ size: ['small', 'medium', 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    // ['clean'],
  ];

  const getTextFromDelta = (delta: Delta): string => {
    const tempQuill = new Quill(document.createElement('div'));
    tempQuill.setContents(delta);
    return tempQuill.getText();
  };

  const handleUploadImage = (quill: Quill) => {
    const fileInput = createFileInput();
    fileInput.click();

    fileInput.onchange = () => {
      const files = fileInput.files;
      if (!files) return;

      handleFiles(files, quill);
      saveToServer(files);
    };
  };

  const createFileInput = (): HTMLInputElement => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.setAttribute('multiple', '');
    return fileInput;
  };

  const handleFiles = (files: FileList, quill: Quill) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        handleFileLoad(reader, quill);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileLoad = (reader: FileReader, quill: A) => {
    const range = quill.getSelection();
    const imageUrl = reader.result as string;
    quill.insertEmbed(range.index, 'image', imageUrl);
  };

  const saveToServer = async (files: FileList) => {
    const fd = new FormData();
    for (const element of files) {
      fd.append('file', element);
    }

    const data = await queryClient.fetchQuery({
      queryKey: ['upload', files],
      queryFn: async () => {
        const response = await axiosInstance.post('upload', fd);
        if (response.status !== 200) throw new Error('Network response was not ok');
        return response.data;
      },
    });
    console.log(data);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: { toolbar: { container: customToolbar, handlers: { image: () => handleUploadImage(quill) } } },
    });
    const quillContainer = container.querySelector('.ql-container');
    if (quillContainer) {
      quillContainer.className = readOnly ? 'ql-container ql-snow !border-none' : 'ql-container ql-snow rounded-b-md';
      if (readOnly) {
        const editor = quillContainer.querySelector('.ql-editor');
        if (editor) editor.className = 'ql-editor !p-0';
      }
    }
    const toolbarContainer = container.querySelector('.ql-toolbar');
    if (toolbarContainer) {
      toolbarContainer.className = readOnly ? 'hidden' : 'ql-toolbar ql-snow rounded-t-md';
      toolbarContainer.querySelectorAll('.ql-formats').forEach((format) => (format.className = 'ql-formats !m-0'));
    }

    quill.enable(!readOnly);

    quill.setContents(defaultValue ?? new Delta());
    const initialText = defaultValue ? getTextFromDelta(defaultValue) : '';
    setCharCount(initialText.length);

    quill.on(Quill.events.TEXT_CHANGE, () => {
      const text = quill.getText().trim();
      const fullDelta = quill.getContents();
      setCharCount(text.length);
      onTextChange?.(fullDelta);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChange?.(...args);
    });

    return () => {
      container.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative rounded-md">
      <div ref={containerRef}></div>
      {!readOnly && <div className="absolute bottom-2 right-2 text-xs">{charCount}</div>}
    </div>
  );
};

export default Richtext;
