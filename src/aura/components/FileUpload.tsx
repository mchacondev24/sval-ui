import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle2, X } from 'lucide-react';
import { AuraButton } from './Button';

export interface AuraFileUploadProps {
  label?: string;
  hint?: string;
  accept?: string;
  maxSizeMB?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

export const AuraFileUpload: React.FC<AuraFileUploadProps> = ({
  label = 'Upload documents or assets',
  hint = 'Supports PNG, JPG, PDF up to 10MB',
  accept = '*',
  maxSizeMB = 10,
  onFilesSelected,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; status: 'done' | 'uploading' }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);
    const newItems = filesArray.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      status: 'done' as const
    }));
    setUploadedFiles(prev => [...prev, ...newItems]);
    if (onFilesSelected) onFilesSelected(filesArray);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className={`flex flex-col gap-2 w-full text-left font-sans ${className}`}>
      {label && (
        <span className="text-xs font-semibold tracking-tight text-[var(--aura-text-primary)]">
          {label}
        </span>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-[var(--aura-radius-lg)] p-6 text-center cursor-pointer transition-all
          flex flex-col items-center justify-center gap-2
          ${isDragging 
            ? 'border-[var(--aura-color-primary)] bg-[var(--aura-color-primary)]/5 scale-[0.99]' 
            : 'border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:border-[var(--aura-color-primary)] hover:bg-[var(--aura-surface-2)]/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-10 h-10 rounded-full bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] flex items-center justify-center text-[var(--aura-text-secondary)]">
          <UploadCloud className="w-5 h-5 text-[var(--aura-color-primary)]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--aura-text-primary)]">
            Click to upload or drag & drop files
          </p>
          <p className="text-[11px] text-[var(--aura-text-muted)] mt-0.5">
            {hint}
          </p>
        </div>
      </div>

      {/* Attached Files List */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-2">
          {uploadedFiles.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <File className="w-3.5 h-3.5 text-[var(--aura-color-primary)] shrink-0" />
                <span className="truncate text-[var(--aura-text-primary)] font-medium">{f.name}</span>
                <span className="text-[10px] text-[var(--aura-text-muted)] font-mono shrink-0">({f.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--aura-color-success)]" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-[var(--aura-text-muted)] hover:text-[var(--aura-color-danger)] p-1 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
