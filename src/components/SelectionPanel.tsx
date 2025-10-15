import React from 'react';
import { Button } from 'primereact/button';

interface Props {
  selectedRows: Record<number, boolean>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

const SelectionPanel: React.FC<Props> = ({ selectedRows, setSelectedRows }) => {
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  return (
    <div
      className="p-3 mb-3 border-round surface-100 flex justify-content-between align-items-center"
      style={{
        border: '1px solid #d3d8de',
        borderRadius: '6px',
        background: '#eef3f7',
      }}
    >
      <p className="m-0 text-lg font-semibold">✅ Selected Rows: {selectedCount}</p>
      <Button
        label="Clear Selection"
        icon="pi pi-times"
        className="p-button-danger p-button-sm"
        onClick={() => setSelectedRows({})}
      />
    </div>
  );
};

export default SelectionPanel;
