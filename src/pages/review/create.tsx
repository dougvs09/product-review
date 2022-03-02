import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler } from 'react-hook-form';
import { MdCheck } from 'react-icons/md';

import { NextPage } from 'next';

import { Modal } from '@components/Modal';
import { ReviewForm, FormTypes } from '@components/ReviewForm';
import { Upload } from '@components/Upload';
import { useAuth } from '@hooks/useAuth';
import { AxiosResponse } from 'axios';
import { api } from 'utils/api';
import { v4 as uuidv4 } from 'uuid';

import { styled } from '../../../stitches.config';

type FileDataTypes = {
  id: string;
  file: File;
  preview: string;
};

interface ReviewResponse extends FormTypes {
  id: string;
}

const Container = styled('section', {
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
  const { user } = useAuth();
  const [files, setFiles] = useState<FileDataTypes[]>();
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
      setFiles(
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
    if (files) {
      try {
        const form = new FormData();
        form.append('picture', files[0].file);

        const reviewCreated: AxiosResponse<ReviewResponse, null> =
          await api.post('review', {
            name: data.title,
            categoryId: 'd76967e2-c556-4a32-89c5-8c9404d89622',
            description: data.description,
            authorId: user?.id,
            rate: data.rate,
            price: data.price,
            dayOfPurchase: data.dayOfPurchase,
          });

        const pictureUploaded = await api.put('review/picture/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            id: reviewCreated.data.id,
          },
        });

        if (reviewCreated.status === 201 && pictureUploaded.status === 200) {
          setLoading(false);
          setModalOpened(true);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
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
          files={files}
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
