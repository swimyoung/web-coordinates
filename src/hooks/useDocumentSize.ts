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
      clientWidth: Math.floor(document.documentElement.clientWidth),
      clientHeight: Math.floor(document.documentElement.clientHeight),
      offsetWidth: Math.floor(document.documentElement.offsetWidth),
      offsetHeight: Math.floor(document.documentElement.offsetHeight),
      scrollWidth: Math.floor(document.documentElement.scrollWidth),
      scrollHeight: Math.floor(document.documentElement.scrollHeight),
    },
    documentBodySize: {
      clientWidth: Math.floor(document.body.clientWidth),
      clientHeight: Math.floor(document.body.clientHeight),
      offsetWidth: Math.floor(document.body.offsetWidth),
      offsetHeight: Math.floor(document.body.offsetHeight),
      scrollWidth: Math.floor(document.body.scrollWidth),
      scrollHeight: Math.floor(document.body.scrollHeight),
    },
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setDocumentSize((state) => ({
        ...state,
        documentElementSize: {
          clientWidth: Math.floor(document.documentElement.clientWidth),
          clientHeight: Math.floor(document.documentElement.clientHeight),
          offsetWidth: Math.floor(document.documentElement.offsetWidth),
          offsetHeight: Math.floor(document.documentElement.offsetHeight),
          scrollWidth: Math.floor(document.documentElement.scrollWidth),
          scrollHeight: Math.floor(document.documentElement.scrollHeight),
        },
        documentBodySize: {
          clientWidth: Math.floor(document.body.clientWidth),
          clientHeight: Math.floor(document.body.clientHeight),
          offsetWidth: Math.floor(document.body.offsetWidth),
          offsetHeight: Math.floor(document.body.offsetHeight),
          scrollWidth: Math.floor(document.body.scrollWidth),
          scrollHeight: Math.floor(document.body.scrollHeight),
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
