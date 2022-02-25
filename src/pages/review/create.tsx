import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler } from 'react-hook-form';
import { MdCheck } from 'react-icons/md';

import { NextPage } from 'next';

import { Modal } from '@components/Modal';
import { ReviewForm, FormTypes } from '@components/ReviewForm';
import { Upload } from '@components/Upload';
import { api } from 'utils/api';
import { getFileUploaded } from 'utils/getFileUploaded';
import { v4 as uuidv4 } from 'uuid';

import { styled } from '../../../stitches.config';

type FileDataTypes = {
  id: string;
  file: File;
  preview: string;
};

const Container = styled('div', {
  display: 'grid',

  h1: {
    justifySelf: 'center',
    fontWeight: '$bold',
    fontSize: '$5',
    color: '$purple200',
  },
});

const FormContainer = styled('section', {
  maxWidth: '1200px',
  margin: '50px auto',

  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '100px',
});

const CheckContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '40px auto',
  width: '125px',
  height: '125px',
  borderRadius: '50%',
  background: '$white100',

  '& svg': {
    width: '60px',
    height: '60px',
  },
});

const SendMessage = styled('span', {
  display: 'block',
  maxWidth: '400px',
  margin: '0 auto',

  textAlign: 'center',
  fontWeight: '$medium',
  fontSize: '$2',
});

const Create: NextPage = () => {
  const [fileData, setFileData] = useState<FileDataTypes[]>();
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
    fileRejections,
  } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFileData(
        acceptedFiles.map((file) => ({
          file,
          id: uuidv4(),
          preview: URL.createObjectURL(file),
        }))
      ),
    accept: 'image/png, image/jpeg, image/webp',
    maxSize: 4194304,
  });

  const handleCreateReview: SubmitHandler<FormTypes> = async (data) => {
    setLoading(true);
    if (fileData) {
      fileData[0].file.arrayBuffer().then(async (arrayBuffer) => {
        const blob = new Blob([new Uint8Array(arrayBuffer)], {
          type: fileData[0].file.type,
        });

        try {
          const picture = await getFileUploaded(
            blob,
            `images/${fileData[0].file.name}`,
            fileData[0].file.type
          );
          const response = await api.post('products', {
            name: data.title,
            price: data.price,
            category: data.category,
            description: data.description,
            rating: data.rate,
            brand: data.brand,
            picture,
            dayOfPurchase: data.dayOfPurchase,
          });

          if (response.status === 200) {
            setLoading(false);
            setModalOpened(true);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      });
    }
  };

  const handleModal = () => {
    setModalOpened(false);
  };

  return (
    <Container>
      <h1>Crie sua review!</h1>
      <FormContainer>
        <Upload
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
          getInputProps={getInputProps}
          getRootProps={getRootProps}
          fileData={fileData}
          fileRejections={fileRejections}
        />
        <ReviewForm handleCreateReview={handleCreateReview} loading={loading} />
      </FormContainer>
      {modalOpened && (
        <Modal onClick={handleModal}>
          <CheckContainer>
            <MdCheck />
          </CheckContainer>
          <SendMessage>
            Seu review foi salvo com sucesso e já pode ser visto pelos usuários!
          </SendMessage>
        </Modal>
      )}
    </Container>
  );
};

export default Create;
