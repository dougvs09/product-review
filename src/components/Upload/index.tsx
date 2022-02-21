import React, { useEffect } from 'react';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  FileRejection,
} from 'react-dropzone';

import Image from 'next/image';

import { Drop, DropMessage } from './styles';

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
  fileData: FileDataTypes[] | undefined;
};

export const Upload: React.FC<UploadTypes> = ({
  getRootProps,
  getInputProps,
  isDragReject,
  isDragAccept,
  fileData,
  fileRejections,
}: UploadTypes) => {
  useEffect(() => {
    fileData?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [fileData]);

  return (
    <section>
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
      {fileRejections.length < 1 && (
        <div>
          {fileData?.map((file) => (
            <span key={file.id}>
              <Image
                src={file.preview}
                alt="image preview"
                width={100}
                height={100}
                objectFit="cover"
              />
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
