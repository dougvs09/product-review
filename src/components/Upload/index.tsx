import React, { useEffect } from 'react';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  FileRejection,
} from 'react-dropzone';
import { BsArrowDownShort } from 'react-icons/bs';

import Image from 'next/image';

import { Container, Drop, DropMessage, PicturePreview } from './styles';

type FileDataTypes = {
  id: string;
  file: File;
  preview: string;
};

type UploadTypes = {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragAccept: boolean;
  isDragReject: boolean;
  fileRejections: FileRejection[];
  files: FileDataTypes[] | undefined;
};

export const Upload: React.FC<UploadTypes> = ({
  getRootProps,
  getInputProps,
  isDragReject,
  isDragAccept,
  files,
  fileRejections,
}: UploadTypes) => {
  useEffect(() => {
    files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Container>
      <Drop
        {...getRootProps()}
        isDragReject={isDragReject}
        isDragAccept={isDragAccept}
      >
        <input {...getInputProps()} />
        <DropMessage isDragReject={isDragReject} isDragAccept={isDragAccept}>
          {isDragReject && !isDragAccept && 'Arquivo não permitido'}
          {isDragAccept && 'Solte seu arquivo'}
          {!isDragReject &&
            !isDragAccept &&
            'Clique aqui e arraste a imagem desejada'}
        </DropMessage>
      </Drop>
      <span>
        Preview <BsArrowDownShort />
      </span>
      {fileRejections.length < 1 && (
        <PicturePreview>
          {files?.map((file) => (
            <span key={file.id}>
              <Image
                src={file.preview}
                alt="image preview"
                width={400}
                height={400}
                objectFit="cover"
              />
            </span>
          ))}
        </PicturePreview>
      )}
    </Container>
  );
};
