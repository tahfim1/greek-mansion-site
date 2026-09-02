'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1.5);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const nextPage = () => setCurrentPage((p) => (numPages && p < numPages ? p + 1 : p));
  const prevPage = () => setCurrentPage((p) => (p > 1 ? p - 1 : p));

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1E1C59] bg-white relative">
      {loading && (
        <div className="p-12 text-[#1E1C59] font-semibold animate-pulse text-center absolute inset-0 flex items-center justify-center bg-white z-10">
          Loading original print menu...
        </div>
      )}
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full flex flex-col items-center"
        loading={null}
      >
        <div 
          onClick={() => setIsLightboxOpen(true)}
          title="Click to open full screen"
          className="w-full bg-white cursor-zoom-in block relative"
        >
          {/* Responsive CSS for the react-pdf canvas */}
          <style dangerouslySetInnerHTML={{__html: `
            .react-pdf__Page__canvas {
              max-width: 100% !important;
              height: auto !important;
              margin: 0 auto;
            }
          `}} />
          <div className="relative w-full grid" style={{ gridTemplateColumns: '1fr' }}>
            {Array.from(new Array(numPages || 0), (el, index) => (
              <div 
                key={`main_page_${index + 1}`}
                className={`col-start-1 row-start-1 w-full flex justify-center transition-opacity duration-300 ${currentPage === index + 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
              >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </div>
        </div>
      </Document>
      
      {!loading && numPages && numPages > 1 && (
        <div className="mt-auto flex items-center justify-between w-full p-4 sm:px-8 bg-[#F7F3EA] border-t-2 border-[#1E1C59]">
          <button 
            onClick={prevPage} 
            disabled={currentPage <= 1}
            className="btn-outline !py-2 !px-4 sm:!px-6 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← <span className="hidden sm:inline ml-1">Previous</span>
          </button>
          
          <div className="flex gap-2">
            {Array.from(new Array(numPages), (el, index) => (
              <button
                key={`dot_${index}`}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-3 h-3 rounded-full transition-colors ${currentPage === index + 1 ? 'bg-[#1E1C59]' : 'bg-[#E8DCCB] hover:bg-[#B18C56]'}`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextPage} 
            disabled={currentPage >= numPages}
            className="btn-outline !py-2 !px-4 sm:!px-6 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline mr-1">Next</span> →
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#11102F]/95 backdrop-blur-sm flex flex-col animate-fade-in">
          {/* Header Controls */}
          <div className="flex justify-between items-center p-4 sm:p-6 bg-[#1E1C59] shadow-xl z-10 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setLightboxScale(s => Math.min(3, s + 0.5))} 
                className="bg-white/10 hover:bg-white/20 text-white p-2 sm:px-4 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                <span className="hidden sm:inline">Zoom In</span>
              </button>
              <button 
                onClick={() => setLightboxScale(s => Math.max(1, s - 0.5))} 
                className="bg-white/10 hover:bg-white/20 text-white p-2 sm:px-4 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm sm:text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                <span className="hidden sm:inline">Zoom Out</span>
              </button>
            </div>
            
            <button 
              onClick={() => setIsLightboxOpen(false)} 
              className="bg-[#B18C56] hover:bg-[#C9A872] text-white p-2 sm:px-6 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">Close</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Scrollable Document Canvas */}
          <div className="flex-1 overflow-auto p-4 sm:p-8">
            <div
              className="flex flex-col gap-8 items-center pb-20 mx-auto transition-all duration-300 ease-out origin-top"
              style={{ width: `${lightboxScale * 100}%`, minWidth: '100%' }}
            >
              <Document 
                file={file} 
                className="w-full flex flex-col gap-8 items-center"
              >
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`lb_page_${index + 1}`} 
                  className="shadow-2xl ring-4 ring-[#E8DCCB]/20 w-full"
                >
                  <Page 
                    pageNumber={index + 1} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    scale={3}
                    className="bg-white w-full"
                  />
                </div>
              ))}
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
