import { useState, useEffect } from 'react';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

interface DocumentElementPosition {
  scrollLeft: number;
  scrollTop: number;
}

interface DocumentBodyPosition {
  scrollLeft: number;
  scrollTop: number;
}

interface DocumentPosition {
  documentElementPosition: DocumentElementPosition;
  documentBodyPosition: DocumentBodyPosition;
}

export function useDocumentPosition(): DocumentPosition {
  const [documentPosition, setDocumentPosition] = useState<DocumentPosition>({
    documentElementPosition: {
      scrollLeft: document.documentElement.scrollLeft,
      scrollTop: document.documentElement.scrollTop,
    },
    documentBodyPosition: {
      scrollLeft: document.body.scrollLeft,
      scrollTop: document.body.scrollTop,
    },
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setDocumentPosition((state) => ({
        ...state,
        documentElementPosition: {
          scrollLeft: document.documentElement.scrollLeft,
          scrollTop: document.documentElement.scrollTop,
        },
        documentBodyPosition: {
          scrollLeft: document.body.scrollLeft,
          scrollTop: document.body.scrollTop,
        },
      }));
    };

    addWindowEventListener('scroll', handleWindowResize);
    return () => {
      removeWindowEventListener('scroll', handleWindowResize);
    };
  }, []);

  return documentPosition;
}
