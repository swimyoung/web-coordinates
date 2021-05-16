import { useState, useEffect } from 'react';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

interface DocumentElementSize {
  clientWidth: number;
  clientHeight: number;
  offsetWidth: number;
  offsetHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

interface DocumentBodySize {
  clientWidth: number;
  clientHeight: number;
  offsetWidth: number;
  offsetHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

interface DocumentSize {
  documentElementSize: DocumentElementSize;
  documentBodySize: DocumentBodySize;
}

export function useDocumentSize(): DocumentSize {
  const [documentSize, setDocumentSize] = useState<DocumentSize>({
    documentElementSize: {
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      offsetWidth: document.documentElement.offsetWidth,
      offsetHeight: document.documentElement.offsetHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    },
    documentBodySize: {
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
      offsetWidth: document.body.offsetWidth,
      offsetHeight: document.body.offsetHeight,
      scrollWidth: document.body.scrollWidth,
      scrollHeight: document.body.scrollHeight,
    },
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setDocumentSize((state) => ({
        ...state,
        documentElementSize: {
          clientWidth: document.documentElement.clientWidth,
          clientHeight: document.documentElement.clientHeight,
          offsetWidth: document.documentElement.offsetWidth,
          offsetHeight: document.documentElement.offsetHeight,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
        },
        documentBodySize: {
          clientWidth: document.body.clientWidth,
          clientHeight: document.body.clientHeight,
          offsetWidth: document.body.offsetWidth,
          offsetHeight: document.body.offsetHeight,
          scrollWidth: document.body.scrollWidth,
          scrollHeight: document.body.scrollHeight,
        },
      }));
    };

    addWindowEventListener('resize', handleWindowResize);
    return () => {
      removeWindowEventListener('resize', handleWindowResize);
    };
  }, []);

  return documentSize;
}
