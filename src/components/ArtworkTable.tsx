import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Checkbox } from 'primereact/checkbox';
import type { Artwork } from '../types/Artwork';
import { fetchArtworks } from '../services/api';
import SelectionPanel from './SelectionPanel';

const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [showSelector, setShowSelector] = useState(false);
  const [rowsToSelect, setRowsToSelect] = useState<number | ''>('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, total } = await fetchArtworks(page);
        setArtworks(data);
        setTotalRecords(total);
      } catch (err) {
        console.error('Error fetching artworks:', err);
      }
    };
    loadData();
  }, [page]);

  const handleSelectionChange = (id: number, checked: boolean) => {
    setSelectedRows((prev) => ({ ...prev, [id]: checked }));
  };

  const handlePageChange = (event: { page: number }) => {
    setPage(event.page + 1);
  };

  const handleSelectRows = () => {
    if (
      rowsToSelect === '' ||
      isNaN(Number(rowsToSelect)) ||
      Number(rowsToSelect) < 1 ||
      Number(rowsToSelect) > artworks.length
    ) {
      alert(`Please enter a valid number between 1 and ${artworks.length}`);
      return;
    }

    const updated: Record<number, boolean> = {};
    artworks.slice(0, Number(rowsToSelect)).forEach((art) => {
      updated[art.id] = true;
    });
    setSelectedRows((prev) => ({ ...prev, ...updated }));
    setShowSelector(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-5">
      <h2 className="mb-4">Artworks Table</h2>

      <SelectionPanel selectedRows={selectedRows} setSelectedRows={setSelectedRows} />

      <DataTable value={artworks} tableStyle={{ minWidth: '60rem' }} stripedRows paginator={false}>
        <Column
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
              <Checkbox
                onChange={(e) => {
                  const allChecked = e.checked ?? false;
                  const updated: Record<number, boolean> = {};
                  artworks.forEach((art) => {
                    updated[art.id] = allChecked;
                  });
                  setSelectedRows((prev) => ({ ...prev, ...updated }));
                }}
                checked={artworks.every((a) => selectedRows[a.id] ?? false)}
              />

              <i
                className="pi pi-chevron-down"
                style={{ cursor: 'pointer', fontSize: '1rem' }}
                onClick={() => setShowSelector((prev) => !prev)}
              ></i>

              {showSelector && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    left: 0,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    padding: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    width: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <input
                    type="number"
                    placeholder="Enter rows..."
                    min={1}
                    max={artworks.length}
                    value={rowsToSelect}
                    onChange={(e) => setRowsToSelect(e.target.value ? Number(e.target.value) : '')}
                    style={{
                      padding: '5px',
                      fontSize: '0.9rem',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      outline: 'none',
                    }}
                  />
                  <button
                    style={{
                      background: '#007ad9',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 0',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                    onClick={handleSelectRows}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          }
          body={(rowData) => (
            <Checkbox
              checked={!!selectedRows[rowData.id]}
              onChange={(e) => handleSelectionChange(rowData.id, e.checked ?? false)}
            />
          )}
          style={{ width: '4rem' }}
        />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>

      <Paginator
        first={(page - 1) * 12}
        rows={12}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArtworkTable;
