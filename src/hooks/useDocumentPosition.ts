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
      scrollLeft: Math.floor(document.documentElement.scrollLeft),
      scrollTop: Math.floor(document.documentElement.scrollTop),
    },
    documentBodyPosition: {
      scrollLeft: Math.floor(document.body.scrollLeft),
      scrollTop: Math.floor(document.body.scrollTop),
    },
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setDocumentPosition((state) => ({
        ...state,
        documentElementPosition: {
          scrollLeft: Math.floor(document.documentElement.scrollLeft),
          scrollTop: Math.floor(document.documentElement.scrollTop),
        },
        documentBodyPosition: {
          scrollLeft: Math.floor(document.body.scrollLeft),
          scrollTop: Math.floor(document.body.scrollTop),
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
