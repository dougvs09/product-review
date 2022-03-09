import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { SubmitHandler } from 'react-hook-form';
import { MdCheck, MdCancel } from 'react-icons/md';

import { NextPage } from 'next';
import Link from 'next/link';

import { Header } from '@components/Header';
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
  width: '100%',
  height: '100vh',
  position: 'relative',

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
  background: 'transparent',

  '& svg': {
    width: '120px',
    height: '120px',
  },
});

const SendMessage = styled('span', {
  display: 'block',
  maxWidth: '400px',
  margin: '0 auto',
  paddingBottom: '20px',

  textAlign: 'center',
  fontWeight: '$medium',
  fontSize: '$2',
});

const LinkMessage = styled('a', {
  display: 'block',
  maxWidth: '400px',
  margin: '0 auto',
  paddingBottom: '20px',

  textAlign: 'center',
  fontWeight: '$medium',
  fontSize: '$1',
  color: '$black300',
  textDecoration: 'underline',
  cursor: 'pointer',
});

const Create: NextPage = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileDataTypes[]>();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ opened: false, type: 'success' });

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
            categoryId: data.category,
            description: data.description,
            authorId: user?.id,
            brand: data.brand,
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
          setModal({ opened: true, type: 'success' });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setModal({ opened: true, type: 'failed' });
      }
    }
  };

  const handleModal = () => {
    setModal({ opened: false, type: '' });
  };

  return (
    <Container>
      <Header />
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
      {modal.opened && modal.type === 'success' ? (
        <Modal onClick={handleModal} size="md">
          <CheckContainer>
            <MdCheck />
          </CheckContainer>
          <SendMessage>
            Seu review foi salvo com sucesso e já pode ser visto pelos usuários!
          </SendMessage>
          <Link href="/" passHref>
            <LinkMessage>Voltar para a página inicial</LinkMessage>
          </Link>
        </Modal>
      ) : (
        modal.type === 'failed' && (
          <Modal onClick={handleModal} size="md">
            <CheckContainer>
              <MdCancel />
            </CheckContainer>
            <SendMessage>
              Tivemos um erro inesperado. Entre em contato com o suporte para
              resolver seu problema.
            </SendMessage>
            <Link href="/" passHref>
              <LinkMessage>Voltar para a página inicial</LinkMessage>
            </Link>
          </Modal>
        )
      )}
    </Container>
  );
};

export default Create;
