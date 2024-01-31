import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface FileContent {
  id?: any;
  link?: string;
  file?: File;
  isNotBlob?: boolean; // Dinhnkp
}
export const useHandleImage = (
  image?: string,
  images?: FileContent[],
  onChange?: (file: File) => any,
  handleDeleteLogin?: () => void,
  handlePasteLink?: (link: string) => void
) => {
  const [preViewImage, setPreViewImage] = useState<string>(image ?? '');
  const refInput = useRef<HTMLInputElement>(null);
  const [file, setCurrentFile] = useState<File>();
  const [message, setMessage] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [plainFiles, setPlainFiles] = useState<FileContent[]>([]);

  useEffect(() => {
    if (!preViewImage.trim()) {
      setPreViewImage(image ?? '');
    }
    if (images && images.length > 0) {
      setPlainFiles(images);
    }
  }, [image,images]);

  const handleClickInput = useCallback(() => {
    refInput.current?.click();
  }, []);

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement>,
    validate?: boolean
  ) => {
    setMessage('');
    const file = event.target.files![0];
    if (file.type.includes('video')) {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }

    if (validate) {
      const regexFile = /(jpeg|jpg|png)/i;
      const maxSizeFile = 3072000;
      if (!regexFile.test(file.type)) {
        return setMessage('error.image-invalid');
      } else if (file.size > maxSizeFile) {
        return setMessage('error.image-size');
      }
    }
    setCurrentFile(file);
    const link = URL.createObjectURL(file);
    setPreViewImage(link);

    if (onChange) {
      const res = await onChange?.(file);
      setPlainFiles([
        ...plainFiles,
        { id: res?.id ?? 'id', link: link, file: file },
      ]);
    } else {
      setPlainFiles([...plainFiles, { id: 'id', link: link, file: file }]);
    }
    setMessage('');
  };

  const handleDelete = () => {
    handleDeleteLogin?.();
    setPreViewImage('');
    setCurrentFile(undefined);
  };

  const handleRemoveByIndex = (index: number) => {
    setPlainFiles((previousPlainFiles) => [
      ...previousPlainFiles.slice(0, index),
      ...previousPlainFiles.slice(index + 1),
    ]);
  };

  const handleMessageFile = () => {
    setMessage('message.form.required');
  };

  const handlePaste = (link: string) => {
    if (link.includes('https://www.youtube.com/watch?v=')) {
      const splitLink = link.split('?')[1];
      const linkI = new URLSearchParams(splitLink);
      if (linkI.get('v')) {
        setPreViewImage(linkI.get('v') ?? '');
        setIsVideo(true);
        handlePasteLink?.(linkI.get('v') ?? '');
        return;
      }
    }
    setIsVideo(false);
    setPreViewImage(link);
    handlePasteLink?.(link);
  };

  const resetImage = () => {
    setPreViewImage(image || '');
  };

  return {
    preViewImage,
    setPreViewImage,
    handleChange,
    handleDelete,
    file,
    setCurrentFile,
    handleMessageFile,
    message,
    handlePaste,
    isVideo,
    handleClickInput,
    refInput,
    resetImage,
    plainFiles,
    handleRemoveByIndex,
    setPlainFiles, // Dinhnkp
  };
};
