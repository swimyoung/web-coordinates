import React from 'react';
import { useDocumentPosition } from '~/hooks/useDocumentPosition';
import { useDocumentSize } from '~/hooks/useDocumentSize';

export function ConsoleContentDocument(): React.ReactElement {
  const { documentElementSize, documentBodySize } = useDocumentSize();
  const { documentElementPosition, documentBodyPosition } =
    useDocumentPosition();

  return (
    <>
      <div>documentElement.clientWidth: {documentElementSize.clientWidth}</div>
      <div>
        documentElement.clientHeight: {documentElementSize.clientHeight}
      </div>
      <div>documentElement.offsetWidth: {documentElementSize.offsetWidth}</div>
      <div>
        documentElement.offsetHeight: {documentElementSize.offsetHeight}
      </div>
      <div>documentElement.scrollWidth: {documentElementSize.scrollWidth}</div>
      <div>
        documentElement.scrollHeight: {documentElementSize.scrollHeight}
      </div>
      <div>
        documentElement.scrollLeft: {documentElementPosition.scrollLeft}
      </div>
      <div>documentElement.scrollTop: {documentElementPosition.scrollTop}</div>
      <br />
      <div>body.clientWidth: {documentBodySize.clientWidth}</div>
      <div>body.clientHeight: {documentBodySize.clientHeight}</div>
      <div>body.offsetWidth: {documentBodySize.offsetWidth}</div>
      <div>body.offsetHeight: {documentBodySize.offsetHeight}</div>
      <div>body.scrollWidth: {documentBodySize.scrollWidth}</div>
      <div>body.scrollHeight: {documentBodySize.scrollHeight}</div>
      <div>body.scrollLeft: {documentBodyPosition.scrollLeft}</div>
      <div>body.scrollTop: {documentBodyPosition.scrollTop}</div>
    </>
  );
}
