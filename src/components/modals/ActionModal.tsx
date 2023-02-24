import {
  Button,
  ButtonGroup,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@chakra-ui/react';
import { FormikState, FormikValues, useFormik } from 'formik';

export interface ActionModalProps {
  title: string;
  message?: string | JSX.Element;
  loading?: boolean;
  initialValues: any;
  submitText?: string;
  submitVariant?: string;
  children?: (formik: FormikState<any>) => React.ReactNode;
  onSubmit: (values: any) => void;
  close: () => void;
  showActions?: boolean;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  title,
  message,
  loading,
  submitText = 'Submit',
  submitVariant = 'blue',
  initialValues,
  onSubmit,
  children,
  close,
  showActions = true,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit,
  });

  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <VStack align={'center'}>
          {typeof message === 'string' ? (
            <div className="mb-4">{message}</div>
          ) : (
            message
          )}
          {children instanceof Function && children(formik)}
        </VStack>
      </ModalBody>
      {showActions && (
        <ModalFooter>
          <ButtonGroup>
            <Button
              variant={'solid'}
              isLoading={loading}
              colorScheme={'gray'}
              onClick={() => close()}
            >
              Cancel
            </Button>
            <Button
              variant={'solid'}
              isLoading={loading}
              colorScheme={submitVariant}
              onClick={() => formik.handleSubmit()}
            >
              {submitText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      )}
    </ModalContent>
  );
};
